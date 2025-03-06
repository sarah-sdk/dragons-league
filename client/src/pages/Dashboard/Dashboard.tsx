import "./Dashboard.css";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
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
