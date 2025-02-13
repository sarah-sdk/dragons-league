import { useLoaderData, useNavigate } from "react-router-dom";
import "./SelectUser.css";
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
        <button
          key={user.id}
          type="button"
          className="user-card"
          onClick={() => handleUserSelect(+user.id)}
        >
          <img
            src={`${import.meta.env.VITE_API_URL}/${user.url_avatar}`}
            alt={`avatar-${user.username}`}
            className="avatar"
          />
          <h2>{user.username}</h2>
        </button>
      ))}
    </section>
  );
}
