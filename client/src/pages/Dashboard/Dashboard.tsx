import { useEffect, useState } from "react";
import SpecieDisplay from "../../services/SpecieDisplay";
import type { Specie, User } from "../../types/types";
import "./Dashboard.css";
import AddSpeciesForm from "../../components/Dashboard/Species/AddSpeciesForm";
import formatDate from "../../services/formatDate";

export default function Dashboard() {
  const [species, setSpecies] = useState<Specie[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));

    fetch(`${import.meta.env.VITE_API_URL}/api/species`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setSpecies(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="dashboard">
      <h1>Dashboard</h1>
      <h2>Espèces :</h2>
      <table>
        <thead>
          <tr>
            <th>Espèce</th>
            <th>Force de base</th>
            <th>Vitesse de base</th>
            <th>Endurance de base</th>
            <th>Image version bébé</th>
            <th>Image version adulte</th>
          </tr>
        </thead>
        <tbody>
          {species.map((specie) => (
            <tr key={specie.id}>
              <td>
                <SpecieDisplay specie={specie.specie} />
              </td>
              <td>{specie.base_strength}</td>
              <td>{specie.base_speed}</td>
              <td>{specie.base_stamina}</td>
              <td>
                <img
                  src={`${import.meta.env.VITE_API_URL}/${specie.url_baby}`}
                  alt={`${specie.specie} bébé`}
                />
              </td>
              <td>
                <img
                  src={`${import.meta.env.VITE_API_URL}/${specie.url_adult}`}
                  alt={`${specie.specie} adulte`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddSpeciesForm />

      <h2>Utilisateurs :</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Créé le</th>
            <th>Administrateur</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.created_at ? formatDate(user.created_at) : ""}</td>
              <td>{user.isAdmin ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
