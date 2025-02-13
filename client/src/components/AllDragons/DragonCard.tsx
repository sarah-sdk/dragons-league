import { useNavigate } from "react-router-dom";
import getDragonImage from "../../services/getDragonImage";
import type { Dragon } from "../../types/types";
import StatDetails from "../DragonDetails/StatDetails";

export default function DragonCard({ dragon }: { dragon: Dragon }) {
  const dragonImage = getDragonImage({ dragon });
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/my-dragons/${dragon.dragon_id}`);
  };

  return (
    <figure className="dragonCard">
      <button
        type="button"
        onClick={handleCardClick}
        className="dragonImageBtn"
      >
        <img
          src={`${import.meta.env.VITE_API_URL}/${dragonImage}`}
          alt={dragon.name}
          className="dragonImage"
        />
      </button>
      <button type="button" onClick={handleCardClick} className="dragonInfo">
        <h2>{dragon.name}</h2>
        <StatDetails dragon={dragon} />
      </button>
    </figure>
  );
}
