import { type FormEvent, useEffect, useRef, useState } from "react";
import type { AddSpecieModalType, Specie } from "../../../types/types";
import "./AddSpecieModal.css";
import FileInputField from "../../Form/FileInputField";
import InputField from "../../Form/InputField";

export default function AddSpecieModal({
  isOpen,
  onClose,
  onSave,
  onFileChange,
}: AddSpecieModalType) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formData, setFormData] = useState<Omit<Specie, "id">>({
    specie: "",
    base_strength: 0,
    base_speed: 0,
    base_stamina: 0,
    url_baby: "",
    url_adult: "",
  });

  const [babyFile, setBabyFile] = useState<File | null>(null);
  const [adultFile, setAdultFile] = useState<File | null>(null);
  const [babyPreview, setBabyPreview] = useState<string | null>(null);
  const [adultPreview, setAdultPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState("");

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

    if (
      !formData.specie ||
      !formData.base_strength ||
      !formData.base_speed ||
      !formData.base_stamina ||
      !babyFile ||
      !adultFile
    ) {
      setErrors("Veuillez remplir les champs requis.");
      return;
    }
    const createdSpecie = {
      ...formData,
      babyImage: babyFile,
      adultImage: adultFile,
    };
    onSave(createdSpecie);
  };

  return (
    <dialog ref={dialogRef} className="add-specie-modal-dialog">
      <h3>Ajouter une espèce</h3>

      {errors && <p>{errors}</p>}
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
          name="base-strength"
          value={formData.base_strength}
          min={0}
          max={10}
          onChange={(e) => {
            let newValue = Number(e.target.value);
            if (newValue > 10) newValue = 10;
            if (newValue < 0) newValue = 0;
            setFormData((prev) => ({ ...prev, base_strength: newValue }));
          }}
        />

        <InputField
          label="Vitesse de base"
          type="number"
          name="base-speed"
          value={formData.base_speed}
          min={0}
          max={10}
          onChange={(e) => {
            let newValue = Number(e.target.value);
            if (newValue > 10) newValue = 10;
            if (newValue < 0) newValue = 0;
            setFormData((prev) => ({ ...prev, base_speed: newValue }));
          }}
        />

        <InputField
          label="Endurance de base"
          type="number"
          name="base-stamina"
          value={formData.base_stamina}
          min={0}
          max={10}
          onChange={(e) => {
            let newValue = Number(e.target.value);
            if (newValue > 10) newValue = 10;
            if (newValue < 0) newValue = 0;
            setFormData((prev) => ({ ...prev, base_stamina: newValue }));
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
          required
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
          required
        />

        <button type="submit">Ajouter l'espèce</button>
        <button type="button" onClick={onClose}>
          ❌
        </button>
      </form>
    </dialog>
  );
}
