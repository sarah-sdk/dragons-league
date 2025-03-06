import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/species", { replace: true });
    }
  }, [location.pathname, navigate]);
  return (
    <main className="dashboard">
      <h1>Dashboard</h1>
      <nav>
        <Link to="/dashboard/species">Espèces</Link>
        <Link to="/dashboard/users">Utilisateurs</Link>
      </nav>
      <Outlet />
    </main>
  );
}
