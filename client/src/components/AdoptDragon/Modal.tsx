import { useEffect, useRef } from "react";
import SpecieDisplay from "../../services/SpecieDisplay";
import type { ModalProps } from "../../types/types";

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
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const handleAdoptClick = () => {
    onAdopt(dragonName, specieId);
    console.info(dragonName, specieId);
  };

  return (
    <dialog ref={dialogRef} className="modal-dialog">
      <h2>
        <SpecieDisplay specie={specieName} />
      </h2>
      <img
        src={`${import.meta.env.VITE_API_URL}/${specieImage}`}
        alt={specieName}
      />
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
        X
      </button>
    </dialog>
  );
}
