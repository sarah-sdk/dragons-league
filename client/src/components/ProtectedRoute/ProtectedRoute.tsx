import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { RouteType } from "../../types/types";

const ProtectedRoute = ({ element }: RouteType) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  useEffect(() => {
    const checkAuthentification = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (response.ok) {
          setIsAuthenticate(true);
        } else {
          setIsAuthenticate(false);
        }
      } catch (error) {
        console.error("Erreur d'authentification", error);
        setIsAuthenticate(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentification();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticate) {
    return <Navigate to="/connexion" replace />;
  }

  return element;
};

export default ProtectedRoute;
