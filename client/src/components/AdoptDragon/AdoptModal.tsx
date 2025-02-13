import { useEffect, useRef } from "react";
import SpecieDisplay from "../../services/SpecieDisplay";
import type { ModalProps } from "../../types/types";
import "./AdoptModal.css";

export default function Modal({
  isOpen,
  onClose,
  specieImage,
  specieName,
  specieId,
  onNameChange,
  dragonName,
  onAdopt,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  const handleAdoptClick = () => {
    onAdopt(dragonName, specieId);
  };

  return (
    <dialog ref={dialogRef} className="modal-dialog">
      <img
        src={`${import.meta.env.VITE_API_URL}/${specieImage}`}
        alt={specieName}
      />
      <h2>
        <SpecieDisplay specie={specieName} />
      </h2>
      <input
        type="text"
        placeholder="Nom du dragon"
        value={dragonName}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <button type="submit" onClick={handleAdoptClick}>
        Adopter votre dragon
      </button>
      <button type="button" onClick={onClose}>
        ❌
      </button>
    </dialog>
  );
}
