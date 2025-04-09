import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Profile } from "../../types/types";
import "./NavBar.css";
import arrowBack from "/arrow-back.svg";
import changeProfile from "/change-profile.svg";
import logout from "/logout.svg";
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
          <img src={arrowBack} alt="Retour" />
        </button>
        <div>
          {isAdmin ? <Link to="/dashboard">Dashboard</Link> : ""}
          <Link to="/mes-dragons">
            <img
              src={`${import.meta.env.VITE_API_URL}/${profile.urlAvatar}`}
              alt={profile.username}
              className="avatar"
            />
          </Link>
          <button type="button" onClick={handleChangeProfile}>
            <img src={changeProfile} alt="Changer de profil" />
          </button>
          <button type="button" onClick={handleLogOut}>
            <img src={logout} alt="Se déconnecter" />
          </button>
        </div>
      </nav>
    </header>
  );
}
