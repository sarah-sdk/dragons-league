import { useLoaderData, useNavigate } from "react-router-dom";
import "./SelectProfile.css";
import { useState } from "react";
import ProfileCard from "../../components/SelectProfile/ProfileCard";
import ProfileModal from "../../components/SelectProfile/ProfileModal";
import type { Profile } from "../../types/types";

export default function SelectProfile() {
  const { profiles } = useLoaderData() as { profiles: Profile[] };
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfileSelect = (profileId: number) => {
    localStorage.setItem("profileId", profileId.toString());

    navigate("/");
  };

  if (!profiles) {
    return <div>Chargement des utilisateurs...</div>;
  }

  const handleCreateProfile = async (username: string, avatar: string) => {
    const userId = 1;
    if (username && avatar) {
      const newProfile = {
        username: username,
        url_avatar: avatar,
      };

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}/profiles`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProfile),
            credentials: "include",
          },
        );

        if (response.ok) {
          const { insertId } = await response.json();
          localStorage.setItem("profileId", insertId.toString());

          setIsModalOpen(false);
          navigate("/mes-dragons");
        } else {
          alert("Erreur lors de la création du profil");
        }
      } catch (error) {
        console.error("Erreur de connexion", error);
        alert("Erreur de connexion");
      }
    } else {
      alert("Veuillez entre un nom pour le profil");
    }
  };

  return (
    <section className="profile-selection">
      <h1>Choissisez un utilisateur</h1>
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.username}
          profile={profile}
          onClick={() => handleProfileSelect(+profile.id)}
        />
      ))}
      <button
        type="button"
        className="profile-card"
        onClick={() => setIsModalOpen(true)}
      >
        <p>+</p>
      </button>

      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProfile}
      />
    </section>
  );
}
