import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import authServices from "../../services/authServices";
import type { RouteType } from "../../types/types";

const AdminRoute = ({ element }: RouteType) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuthentification = async () => {
      try {
        const userData = await authServices.fetchUserData();
        if (userData) {
          setIsAuthenticate(true);
          setLoading(false);

          if (userData.isAdmin === 1) {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error("Erreur d'authentifciation", error);
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

  if (!isAdmin) {
    return <Navigate to="/mes-dragons" replace />;
  }

  return element;
};

export default AdminRoute;
