import type { User } from "../../types/types";

export default function UserCard({
  user,
  onClick,
}: { user: User; onClick: () => void }) {
  return (
    <button key={user.id} type="button" className="user-card" onClick={onClick}>
      <img
        src={`${import.meta.env.VITE_API_URL}/${user.url_avatar}`}
        alt={`avatar-${user.username}`}
        className="avatar"
      />
      <h2>{user.username}</h2>
    </button>
  );
}
