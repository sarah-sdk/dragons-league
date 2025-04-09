import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import add from "/add.svg";
import AddSpecieModal from "../../../components/Dashboard/Species/AddSpecieModal";
import DeleteSpecieModal from "../../../components/Dashboard/Species/DeleteSpecieModal";
import EditSpecieModal from "../../../components/Dashboard/Species/EditSpecieModal";
import SpeciesTable from "../../../components/Dashboard/Species/SpeciesTable";
import type { Specie } from "../../../types/types";

export default function SpeciesPage() {
  const { species } = useLoaderData() as { species: Specie[] };
  const revalidator = useRevalidator();

  const [editingSpecie, setEditingSpecie] = useState<Specie | null>(null);
  const [isEditSpecieModalOpen, setIsEditSpecieModalOpen] =
    useState<boolean>(false);

  const [deletingSpecie, setDeletingSpecie] = useState<Specie | null>(null);
  const [isDeleteSpecieModalOpen, setIsDeleteSpecieModalOpen] =
    useState<boolean>(false);

  const [isAddSpecieModalOpen, setIsAddSpecieModalOpen] =
    useState<boolean>(false);

  const [babyFile, setBabyFile] = useState<File | null>(null);
  const [adultFile, setAdultFile] = useState<File | null>(null);

  const handleEdit = (specieId: number) => {
    const specie = species.find((s) => +s.id === specieId);
    if (specie) {
      setEditingSpecie(specie);
      setBabyFile(null);
      setAdultFile(null);
      setIsEditSpecieModalOpen(true);
    }
  };

  const handleCloseEditSpecieModal = () => {
    setIsEditSpecieModalOpen(false);
    setEditingSpecie(null);
  };

  const handleFileChange = (file: File | null, type: "baby" | "adult") => {
    if (type === "baby") {
      setBabyFile(file);
    } else {
      setAdultFile(file);
    }
  };

  const handleSubmitEdit = async (updatedSpecie: Specie) => {
    if (updatedSpecie) {
      const formData = new FormData();
      formData.append("specie", updatedSpecie.specie);
      formData.append("baseStrength", updatedSpecie.baseStrength.toString());
      formData.append("baseSpeed", updatedSpecie.baseSpeed.toString());
      formData.append("baseStamina", updatedSpecie.baseStamina.toString());
      if (babyFile) {
        formData.append("babyImage", babyFile);
      } else {
        formData.append("babyImage", updatedSpecie.urlBaby || "");
      }

      if (adultFile) {
        formData.append("adultImage", adultFile);
      } else {
        formData.append("adultImage", updatedSpecie.urlAdult || "");
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/species/${updatedSpecie.id}`,
          {
            method: "PUT",
            body: formData,
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data) {
          handleCloseEditSpecieModal();
          revalidator.revalidate();
        } else {
          throw new Error("No data returned from API");
        }
      } catch (error) {
        console.error("Failed to update species:", error);
        throw new Error((error as Error).message);
      }
    }
  };

  const handleDelete = (specieId: number) => {
    const specie = species.find((s) => +s.id === specieId);
    if (specie) {
      setDeletingSpecie(specie);
      setIsDeleteSpecieModalOpen(true);
    }
  };

  const handleCloseDeleteSpecieModal = () => {
    setIsDeleteSpecieModalOpen(false);
    setDeletingSpecie(null);
  };

  const handleSubmitDelete = async (deletedSpecieId: number) => {
    if (deletedSpecieId) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/species/${deletedSpecieId}`,
          {
            method: "DELETE",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error(
            `Erreur: ${response.status} - ${response.statusText}`,
          );
        }

        handleCloseDeleteSpecieModal();
        revalidator.revalidate();
      } catch (error) {
        console.error("Échec de la suppression :", error);
      }
    }
  };

  const handleAdd = () => {
    setIsAddSpecieModalOpen(true);
    setBabyFile(null);
    setAdultFile(null);
  };

  const handleCloseAddSpecieModal = () => {
    setIsAddSpecieModalOpen(false);
  };

  const handleSubmitAdd = async (createdSpecie: Omit<Specie, "id">) => {
    if (createdSpecie) {
      try {
        const formData = new FormData();
        formData.append("specie", createdSpecie.specie);
        formData.append("baseStrength", createdSpecie.baseStrength.toString());
        formData.append("baseSpeed", createdSpecie.baseSpeed.toString());
        formData.append("baseStamina", createdSpecie.baseStamina.toString());
        if (babyFile) formData.append("babyImage", babyFile);
        if (adultFile) formData.append("adultImage", adultFile);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/species`,
          { method: "POST", credentials: "include", body: formData },
        );

        if (!response.ok) {
          throw new Error(
            `Erreur: ${response.status} - ${response.statusText}`,
          );
        }

        const data = await response.json();

        if (data) {
          handleCloseAddSpecieModal();
          revalidator.revalidate();
        } else {
          throw new Error("No data returned from API");
        }
      } catch (error) {
        console.error("Failed to update species:", error);
        throw new Error((error as Error).message);
      }
    }
  };

  return (
    <>
      <h2>Espèces :</h2>
      <button type="button" onClick={handleAdd}>
        <img src={add} alt="Créer une espèce" />
      </button>
      <SpeciesTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        species={species}
      />

      {isEditSpecieModalOpen && editingSpecie && (
        <EditSpecieModal
          isOpen={isEditSpecieModalOpen}
          onClose={handleCloseEditSpecieModal}
          specie={editingSpecie}
          onSave={handleSubmitEdit}
          onFileChange={handleFileChange}
        />
      )}

      {isDeleteSpecieModalOpen && deletingSpecie && (
        <DeleteSpecieModal
          specie={deletingSpecie}
          isOpen={isDeleteSpecieModalOpen}
          onClose={handleCloseDeleteSpecieModal}
          onDelete={handleSubmitDelete}
        />
      )}

      {isAddSpecieModalOpen && (
        <AddSpecieModal
          isOpen={isAddSpecieModalOpen}
          onClose={handleCloseAddSpecieModal}
          onSave={handleSubmitAdd}
          onFileChange={handleFileChange}
        />
      )}
    </>
  );
}
