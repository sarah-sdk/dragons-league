import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Profile } from "../../types/types";
import "./NavBar.css";
import authServices from "../../services/authServices";

export default function NavBar() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await authServices.fetchUserData();
        const userId = userData?.userId;
        setIsAdmin(userData?.isAdmin);

        const profileId = localStorage.getItem("profileId");
        if (!profileId) throw new Error("Aucun profileId trouvé");

        const profileResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}/profiles/${profileId}`,
          { method: "GET", credentials: "include" },
        );

        if (!profileResponse.ok) throw new Error("Profil introuvable");

        const profileData = await profileResponse.json();
        setProfile(profileData);
      } catch (error) {
        console.error("Erreur d'authentification", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading || !profile) return <div>Chargement</div>;

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChangeProfile = async () => {
    localStorage.removeItem("profileId");
    setProfile(null);

    navigate("/profils");
  };

  const handleLogOut = async () => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("profileId");
      setProfile(null);

      navigate("/connexion");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <header className="navbar">
      <nav>
        <button type="button" onClick={handleGoBack}>
          ←
        </button>
        <div>
          {isAdmin ? <Link to="/dashboard">Dashboard</Link> : ""}
          <Link to="/mes-dragons">
            <img
              src={`${import.meta.env.VITE_API_URL}/${profile.url_avatar}`}
              alt={profile.username}
              className="avatar"
            />
          </Link>
          <button type="button" onClick={handleChangeProfile}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <title>Changer de profil</title>
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          </button>
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
