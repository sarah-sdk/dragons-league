import { type FormEvent, useEffect, useRef, useState } from "react";
import type { EditSpecieModalType, Specie } from "../../../types/types";
import "./EditSpecieModal.css";
import FileInputField from "../../Form/FileInputField";
import InputField from "../../Form/InputField";

export default function EditSpecieModal({
  isOpen,
  specie,
  onClose,
  onSave,
  onFileChange,
}: EditSpecieModalType) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formData, setFormData] = useState<Specie>({
    id: "0",
    specie: "",
    baseStrength: 0,
    baseSpeed: 0,
    baseStamina: 0,
    urlBaby: "",
    urlAdult: "",
  });

  const [babyFile, setBabyFile] = useState<File | null>(null);
  const [adultFile, setAdultFile] = useState<File | null>(null);
  const [babyPreview, setBabyPreview] = useState<string | null>(null);
  const [adultPreview, setAdultPreview] = useState<string | null>(null);

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedSpecie = {
      ...formData,
      babyImage: babyFile || specie.urlBaby,
      adultImage: adultFile || specie.urlAdult,
    };
    onSave(updatedSpecie);
  };

  return (
    <dialog ref={dialogRef} className="edit-specie-modal-dialog">
      <h3>Modifier l'espèce</h3>

      <form method="dialog" onSubmit={handleSubmit}>
        <InputField
          label="Espèce"
          type="text"
          name="specie"
          value={formData.specie}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, specie: e.target.value }))
          }
        />

        <InputField
          label="Force de base"
          type="number"
          name="baseStrength"
          value={formData.baseStrength}
          min={0}
          max={10}
          onChange={(e) => {
            let newValue = Number(e.target.value);
            if (newValue > 10) newValue = 10;
            if (newValue < 0) newValue = 0;
            setFormData((prev) => ({ ...prev, baseStrength: newValue }));
          }}
        />

        <InputField
          label="Vitesse de base"
          type="number"
          name="baseSpeed"
          value={formData.baseSpeed}
          min={0}
          max={10}
          onChange={(e) => {
            let newValue = Number(e.target.value);
            if (newValue > 10) newValue = 10;
            if (newValue < 0) newValue = 0;
            setFormData((prev) => ({ ...prev, baseSpeed: newValue }));
          }}
        />

        <InputField
          label="Endurance de base"
          type="number"
          name="baseStamina"
          value={formData.baseStamina}
          min={0}
          max={10}
          onChange={(e) => {
            let newValue = Number(e.target.value);
            if (newValue > 10) newValue = 10;
            if (newValue < 0) newValue = 0;
            setFormData((prev) => ({ ...prev, baseStamina: newValue }));
          }}
        />

        <FileInputField
          label="Image version bébé"
          name="baby-image"
          file={babyFile}
          setFile={setBabyFile}
          preview={babyPreview}
          setPreview={setBabyPreview}
          onFileChange={onFileChange}
          type="baby"
        />

        <FileInputField
          label="Image version adulte"
          name="adult-image"
          file={adultFile}
          setFile={setAdultFile}
          preview={adultPreview}
          setPreview={setAdultPreview}
          onFileChange={onFileChange}
          type="adult"
        />

        <button type="submit">Modifier l'espèce</button>
        <button type="button" onClick={onClose}>
          ❌
        </button>
      </form>
    </dialog>
  );
}
