import { type ChangeEvent, useEffect } from "react";
import type { FileInputFieldType } from "../../types/types";

export default function FileInputField({
  label,
  name,
  file,
  setFile,
  preview,
  setPreview,
  onFileChange,
  type,
  required = false,
}: FileInputFieldType) {
  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }, [file, setPreview]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      onFileChange(selectedFile, type);
    }
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      {preview && <img src={preview} alt="Aperçu" />}
      <input
        type="file"
        id={name}
        name={name}
        accept="image/*"
        onChange={handleFileChange}
        required={required}
      />
    </>
  );
}
