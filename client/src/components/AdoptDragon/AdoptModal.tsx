import { useEffect, useRef } from "react";
import SpecieDisplay from "../../services/SpecieDisplay";
import type { ModalType } from "../../types/types";
import "./AdoptModal.css";
import InputField from "../Form/InputField";

export default function Modal({
  isOpen,
  onClose,
  specieImage,
  specieName,
  specieId,
  onNameChange,
  dragonName,
  onAdopt,
}: ModalType) {
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

  const handleAdoptSubmit = () => {
    onAdopt(dragonName, specieId);
  };

  return (
    <dialog ref={dialogRef} className="adoptModal">
      <img
        src={`${import.meta.env.VITE_API_URL}/${specieImage}`}
        alt={specieName}
      />
      <h2>
        <SpecieDisplay specie={specieName} />
      </h2>

      <form method="dialog" onSubmit={handleAdoptSubmit}>
        <InputField
          label="Nom du dragon"
          name="dragon-name"
          type="text"
          value={dragonName}
          onChange={(e) => onNameChange(e.target.value)}
        />

        <button type="submit">Adopter votre dragon</button>
        <button type="button" onClick={onClose}>
          ❌
        </button>
      </form>
    </dialog>
  );
}
