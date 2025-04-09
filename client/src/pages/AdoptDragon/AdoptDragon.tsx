import { useLoaderData, useNavigate } from "react-router-dom";
import AdoptionCard from "../../components/AdoptDragon/AdoptionCard";
import type { Specie } from "../../types/types";
import "./AdoptDragon.css";
import { useEffect, useState } from "react";
import Modal from "../../components/AdoptDragon/AdoptModal";
import authServices from "../../services/authServices";

export default function AdoptDragon() {
  const { species } = useLoaderData() as { species: Specie[] };
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpecie, setSelectedSpecie] = useState<Specie | null>(null);
  const [dragonName, setDragonName] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);

  const profileId = localStorage.getItem("profileId");

  useEffect(() => {
    const getUserId = async () => {
      try {
        const userData = await authServices.fetchUserData();
        setUserId(userData?.userId);
      } catch (error) {
        console.error("Erreur d'authentification", error);
      }
    };

    getUserId();
  }, []);

  const handleOpenModal = (specie: Specie) => {
    setSelectedSpecie(specie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSpecie(null);
    setDragonName("");
  };

  const handleNameChange = (name: string) => {
    setDragonName(name);
  };

  const handleAdopt = async (name: string, specieId: string) => {
    if (name && specieId) {
      const newDragon = {
        name: name,
        specieId: specieId,
      };

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}/profiles/${profileId}/dragons`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newDragon),
            credentials: "include",
          },
        );

        if (response.ok) {
          handleCloseModal();
          navigate("/mes-dragons");
        } else {
          alert("Erreur lors de l'adoption du dragon");
        }
      } catch (error) {
        console.error("Erreur de connexion", error);
        alert("Erreur de connexion");
      }
    } else {
      alert("Veuillez entrer un nom pour votre dragon");
    }
  };

  return (
    <section className="adoptionList">
      <h1>Adopte un dragon</h1>
      {species.map((specie) => (
        <AdoptionCard
          key={specie.specie}
          specie={specie}
          onClick={() => handleOpenModal(specie)}
        />
      ))}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        specieImage={selectedSpecie?.urlAdult || ""}
        specieName={selectedSpecie?.specie || ""}
        specieId={selectedSpecie?.id || "0"}
        onNameChange={handleNameChange}
        dragonName={dragonName}
        onAdopt={handleAdopt}
      />

      <button type="button" className="adoptionCard nextCard">
        <p>Plus de dragons à venir prochainement...</p>
      </button>
    </section>
  );
}
