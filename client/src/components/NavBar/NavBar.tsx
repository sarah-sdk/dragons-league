import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/types";
import "./NavBar.css";

export default function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`)
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) =>
          console.error("Erreur de récupération du user", error),
        );
    }
  }, [userId]);

  if (!user) return <div>Chargement</div>;

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogOut = () => {
    localStorage.removeItem("userId");
    navigate("/profils");
  };

  return (
    <header className="navbar">
      <nav>
        <button type="button" onClick={handleGoBack}>
          ←
        </button>
        <div>
          <img
            src={`${import.meta.env.VITE_API_URL}/${user.url_avatar}`}
            alt={user.username}
            className="avatar"
          />
          <button type="button" onClick={handleLogOut}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-arrow-left"
              viewBox="0 0 16 16"
            >
              <title>Déconnexion</title>
              <path
                fillRule="evenodd"
                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
              />
              <path
                fillRule="evenodd"
                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
