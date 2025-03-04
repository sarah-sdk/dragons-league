import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Specie } from "../../../types/types";
import "./EditSpecieModal.css";

type EditSpecieModalType = {
  isOpen: boolean;
  specie: Specie;
  onClose: () => void;
  onSave: (updatedSpecie: Specie) => void;
  onFileChange: (file: File | null, type: "baby" | "adult") => void;
};

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
    const updatedSpecie = {
      ...formData,
      babyImage: babyFile || specie.url_baby,
      adultImage: adultFile || specie.url_adult,
    };
    onSave(updatedSpecie);
  };

  return (
    <dialog ref={dialogRef} className="edit-specie-modal-dialog">
      <h3>Modifier l'espèce</h3>

      <form method="dialog" onSubmit={handleSubmit}>
        <label htmlFor="specie">Espèce</label>
        <input
          type="text"
          id="specie"
          name="specie"
          value={formData?.specie}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, specie: e.target.value }))
          }
        />

        <label htmlFor="base-strength">Force de base</label>
        <input
          type="number"
          id="base-strength"
          value={formData?.base_strength}
          onChange={(e) => {
            let newValue = Number(e.target.value);
            if (newValue > 10) newValue = 10;
            if (newValue < 0) newValue = 0;
            setFormData((prev) => ({ ...prev, base_strength: newValue }));
          }}
        />

        <label htmlFor="base-speed">Vitesse de base</label>
        <input
          type="number"
          id="base-speed"
          value={formData?.base_speed}
          onChange={(e) => {
            let newValue = Number(e.target.value);
            if (newValue > 10) newValue = 10;
            if (newValue < 0) newValue = 0;
            setFormData((prev) => ({ ...prev, base_speed: newValue }));
          }}
        />

        <label htmlFor="base-stamina">Endurance de base</label>
        <input
          type="number"
          id="base-stamina"
          value={formData?.base_stamina}
          onChange={(e) => {
            let newValue = Number(e.target.value);
            if (newValue > 10) newValue = 10;
            if (newValue < 0) newValue = 0;
            setFormData((prev) => ({ ...prev, base_stamina: newValue }));
          }}
        />

        <label htmlFor="baby-image">Image version bébé</label>
        <img
          src={
            babyPreview
              ? babyPreview
              : `${import.meta.env.VITE_API_URL}/${formData?.url_baby}`
          }
          alt={`${formData.specie} bébé`}
        />
        <input
          type="file"
          name="baby-image"
          id="baby-image"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "baby")}
        />

        <label htmlFor="adult-image">Image version adulte</label>
        <img
          src={
            adultPreview
              ? adultPreview
              : `${import.meta.env.VITE_API_URL}/${formData?.url_adult}`
          }
          alt={`${formData.specie} adulte`}
        />
        <input
          type="file"
          name="adult-image"
          id="adult-image"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "adult")}
        />

        <button type="submit">Modifier l'espèce</button>
        <button type="button" onClick={onClose}>
          ❌
        </button>
      </form>
    </dialog>
  );
}
