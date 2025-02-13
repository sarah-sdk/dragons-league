import { useLoaderData, useNavigate } from "react-router-dom";
import "./SelectUser.css";
import UserCard from "../../components/SelectUser/UserCard";
import type { User } from "../../types/types";

export default function SelectUser() {
  const navigate = useNavigate();
  const { users } = useLoaderData() as { users: User[] };

  const handleUserSelect = (userId: number) => {
    localStorage.setItem("userId", userId.toString());

    navigate("/");
  };

  if (!users) {
    return <div>Chargement des utilisateurs...</div>;
  }

  return (
    <section className="user-selection">
      <h1>Choissisez un utilisateur</h1>
      {users.map((user) => (
        <UserCard
          key={user.username}
          user={user}
          onClick={() => handleUserSelect(+user.id)}
        />
      ))}
      <button type="button" className="user-card">
        <p>+</p>
      </button>
    </section>
  );
}
