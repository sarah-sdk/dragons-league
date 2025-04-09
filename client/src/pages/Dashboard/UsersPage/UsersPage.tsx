import { useEffect, useState } from "react";
import formatDate from "../../../services/formatDate";
import type { User } from "../../../types/types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
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
              <td>{user.createdAt ? formatDate(user.createdAt) : ""}</td>
              <td>{user.isAdmin ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
