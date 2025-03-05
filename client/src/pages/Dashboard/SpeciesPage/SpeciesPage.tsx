import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import AddSpeciesForm from "../../../components/Dashboard/Species/AddSpeciesForm";
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
      formData.append("base_strength", updatedSpecie.base_strength.toString());
      formData.append("base_speed", updatedSpecie.base_speed.toString());
      formData.append("base_stamina", updatedSpecie.base_stamina.toString());
      if (babyFile) {
        formData.append("babyImage", babyFile);
      } else {
        formData.append("babyImage", updatedSpecie.url_baby || "");
      }

      if (adultFile) {
        formData.append("adultImage", adultFile);
      } else {
        formData.append("adultImage", updatedSpecie.url_adult || "");
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

  return (
    <>
      <h2>Espèces :</h2>
      <SpeciesTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        species={species}
      />
      <AddSpeciesForm />

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
    </>
  );
}
