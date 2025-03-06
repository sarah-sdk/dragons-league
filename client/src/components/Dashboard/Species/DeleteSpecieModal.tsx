import { type MouseEvent, useEffect, useRef, useState } from "react";
import SpecieDisplay from "../../../services/SpecieDisplay";
import type { Specie } from "../../../types/types";
import StatDetails from "../../DragonDetails/StatDetails";
import "./DeleteSpecieModal.css";

type DeleteSpecieModalType = {
  isOpen: boolean;
  specie: Specie;
  onClose: () => void;
  onDelete: (specieId: number) => void;
};

export default function DeleteSpecieModal({
  specie,
  isOpen,
  onClose,
  onDelete,
}: DeleteSpecieModalType) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [formData, setFormData] = useState<Specie>({
    id: "0",
    specie: "",
    base_strength: 0,
    base_speed: 0,
    base_stamina: 0,
    url_baby: "",
    url_adult: "",
  });

  useEffect(() => {
    if (specie) {
      setFormData(specie);
    }
  }, [specie]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dialogRef.current) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const deletedSpecie = +formData.id;

    onDelete(deletedSpecie);
  };

  return (
    <dialog ref={dialogRef} className="delete-specie-modal-dialog">
      <h3>Êtes-vous sûr.e de vouloir supprimer :</h3>
      <figure>
        <img
          src={`${import.meta.env.VITE_API_URL}/${formData.url_adult}`}
          alt={formData.specie}
        />
        <h4>
          <SpecieDisplay specie={formData.specie} />
        </h4>
        <StatDetails
          strength={formData.base_strength}
          speed={formData.base_speed}
          stamina={formData.base_stamina}
          size="10"
        />
      </figure>
      <button type="submit" onClick={handleSubmit}>
        Supprimer l'espèce
      </button>
      <button type="button" onClick={onClose}>
        ❌
      </button>
    </dialog>
  );
}
