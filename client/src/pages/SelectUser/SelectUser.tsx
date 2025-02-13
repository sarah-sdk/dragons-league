import { useLoaderData, useNavigate } from "react-router-dom";
import avatar1 from "../../../public/avatar1.webp";
import avatar2 from "../../../public/avatar2.jpg";
import "./SelectUser.css";

type Users = {
  id: number;
  username: string;
};

export default function SelectUser() {
  const navigate = useNavigate();
  const { users } = useLoaderData() as { users: Users[] };

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
          onClick={() => handleUserSelect(user.id)}
        >
          <img
            src={+user.id === 1 ? avatar1 : avatar2}
            alt={`avatar-${user.username}`}
            className="avatar"
          />
          <h2>{user.username}</h2>
        </button>
      ))}
    </section>
  );
}
