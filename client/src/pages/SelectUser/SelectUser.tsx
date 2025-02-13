import { useLoaderData, useNavigate } from "react-router-dom";
import "./SelectUser.css";
import { useState } from "react";
import ProfileModal from "../../components/SelectUser/ProfileModal";
import UserCard from "../../components/SelectUser/UserCard";
import type { User } from "../../types/types";

export default function SelectUser() {
  const { users } = useLoaderData() as { users: User[] };
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserSelect = (userId: number) => {
    localStorage.setItem("userId", userId.toString());

    navigate("/");
  };

  if (!users) {
    return <div>Chargement des utilisateurs...</div>;
  }

  const handleCreateProfile = async (username: string, avatar: string) => {
    if (username && avatar) {
      const newUser = {
        username: username,
        url_avatar: avatar,
      };

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          },
        );

        if (response.ok) {
          const { insertId } = await response.json();
          localStorage.setItem("userId", insertId.toString());

          setIsModalOpen(false);
          navigate("/mes-dragons");
        } else {
          alert("Erreur lors de la création du profil");
        }
      } catch (error) {
        console.error("Erreur de connexion", error);
        alert("Erreur de connexion");
      }
    } else {
      alert("Veuillez entre un nom pour le profil");
    }
  };

  return (
    <section className="user-selection">
      <h1>Choissisez un utilisateur</h1>
      {users.map((user) => (
        <UserCard
          key={user.username}
          user={user}
          onClick={() => handleUserSelect(+user.id)}
        />
      ))}
      <button
        type="button"
        className="user-card"
        onClick={() => setIsModalOpen(true)}
      >
        <p>+</p>
      </button>

      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProfile}
      />
    </section>
  );
}
