import type { Profile } from "../../types/types";

export default function ProfileCard({
  profile,
  onClick,
}: { profile: Profile; onClick: () => void }) {
  return (
    <button
      key={profile.id}
      type="button"
      className="profileCard"
      onClick={onClick}
    >
      <img
        src={`${import.meta.env.VITE_API_URL}/${profile.url_avatar}`}
        alt={`avatar-${profile.username}`}
        className="avatar"
      />
      <h2>{profile.username}</h2>
    </button>
  );
}
