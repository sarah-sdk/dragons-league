import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ProfileModal.css";
import type { ProfileModalType } from "../../types/types";

export default function ProfileModal({
  isOpen,
  onClose,
  onCreate,
}: ProfileModalType) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const avatars = [
    "assets/images/avatars/avatar1.png",
    "assets/images/avatars/avatar2.png",
    "assets/images/avatars/avatar3.png",
    "assets/images/avatars/avatar4.png",
    "assets/images/avatars/avatar5.png",
  ];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const handleCreate = () => {
    if (username && selectedAvatar) {
      onCreate(username, selectedAvatar);
      onClose();
    }
  };

  return (
    <dialog ref={dialogRef} className="profile-modal-dialog">
      <h2>Créer un nouveau profil</h2>
      <div className="avatar-selection">
        {avatars.map((avatar, index) => (
          <button
            type="button"
            key={uuidv4()}
            onClick={() => setSelectedAvatar(avatar)}
            className={selectedAvatar === avatar ? "selected" : ""}
          >
            <img
              src={`${import.meta.env.VITE_API_URL}/${avatar}`}
              alt={`Avatar ${index + 1}`}
              className={selectedAvatar === avatar ? "selected" : ""}
            />
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit" onClick={handleCreate} className="navBtn">
        Créer le profil
      </button>
      <button type="button" onClick={onClose} className="navBtn">
        ❌
      </button>
    </dialog>
  );
}
