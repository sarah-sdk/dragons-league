import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/especes", { replace: true });
    }
  }, [location.pathname, navigate]);
  return (
    <section className="dashboard">
      <h1>Dashboard</h1>
      <nav>
        <Link to="/dashboard/especes">Espèces</Link>
        <Link to="/dashboard/utilisateurs">Utilisateurs</Link>
      </nav>
      <Outlet />
    </section>
  );
}
