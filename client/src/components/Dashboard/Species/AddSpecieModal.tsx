import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import type { AddSpecieModalType, Specie } from "../../../types/types";
import "./AddSpecieModal.css";

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

  useEffect(() => {
    if (babyFile) {
      setBabyPreview(URL.createObjectURL(babyFile));
    }
    if (adultFile) {
      setAdultPreview(URL.createObjectURL(adultFile));
    }
  }, [babyFile, adultFile]);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "baby" | "adult",
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (type === "baby") {
        setBabyFile(selectedFile);
        onFileChange(selectedFile, "baby");
      } else {
        setAdultFile(selectedFile);
        onFileChange(selectedFile, "adult");
      }
    }
  };

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
        <label htmlFor="specie">Espèce</label>
        <input
          type="text"
          id="specie"
          name="specie"
          value={formData.specie}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, specie: e.target.value }))
          }
          required
        />

        <label htmlFor="base-strength">Force de base</label>
        <input
          type="number"
          id="base-strength"
          value={formData.base_strength}
          onChange={(e) => {
            let newValue = Number(e.target.value);
            if (newValue > 10) newValue = 10;
            if (newValue < 0) newValue = 0;
            setFormData((prev) => ({ ...prev, base_strength: newValue }));
          }}
          required
        />

        <label htmlFor="base-speed">Vitesse de base</label>
        <input
          type="number"
          id="base-speed"
          value={formData.base_speed}
          onChange={(e) => {
            let newValue = Number(e.target.value);
            if (newValue > 10) newValue = 10;
            if (newValue < 0) newValue = 0;
            setFormData((prev) => ({ ...prev, base_speed: newValue }));
          }}
          required
        />

        <label htmlFor="base-stamina">Endurance de base</label>
        <input
          type="number"
          id="base-stamina"
          value={formData.base_stamina}
          onChange={(e) => {
            let newValue = Number(e.target.value);
            if (newValue > 10) newValue = 10;
            if (newValue < 0) newValue = 0;
            setFormData((prev) => ({ ...prev, base_stamina: newValue }));
          }}
          required
        />

        <label htmlFor="baby-image">Image version bébé</label>
        {babyPreview ? (
          <img src={babyPreview} alt={`${formData.specie} bébé`} />
        ) : (
          ""
        )}
        <input
          type="file"
          name="baby-image"
          id="baby-image"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "baby")}
          required
        />

        <label htmlFor="adult-image">Image version adulte</label>
        {adultPreview ? (
          <img src={adultPreview} alt={`${formData.specie} adulte`} />
        ) : (
          ""
        )}
        <input
          type="file"
          name="adult-image"
          id="adult-image"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "adult")}
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
