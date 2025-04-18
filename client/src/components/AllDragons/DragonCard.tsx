import { useNavigate } from "react-router-dom";
import getDragonImage from "../../services/getDragonImage";
import type { Dragon } from "../../types/types";
import StatDetails from "../DragonDetails/StatDetails";

export default function DragonCard({ dragon }: { dragon: Dragon }) {
  const dragonImage = getDragonImage({ dragon });
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/mes-dragons/${dragon.dragonId}`);
  };

  return (
    <button type="button" className="dragonCard" onClick={handleCardClick}>
      <figure className="dragonImageBtn">
        <img
          src={`${import.meta.env.VITE_API_URL}/${dragonImage}`}
          alt={dragon.name}
          className="dragonImage"
        />
      </figure>
      <legend className="dragonInfo">
        <h2>{dragon.name}</h2>
        <StatDetails
          strength={+dragon.strength}
          speed={+dragon.speed}
          stamina={+dragon.stamina}
          size="10"
        />
      </legend>
    </button>
  );
}
