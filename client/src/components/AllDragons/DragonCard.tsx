import SpecieDisplay from "../../services/SpecieDisplay";
import getDragonImage from "../../services/getDragonImage";
import type { Dragon } from "../../types/types";

export default function DragonCard({ dragon }: { dragon: Dragon }) {
  const dragonImage = getDragonImage({ dragon });

  return (
    <article>
      <img
        src={`${import.meta.env.VITE_API_URL}/${dragonImage}`}
        alt={dragon.name}
      />
      <h2>{dragon.name}</h2>
      <p>
        <SpecieDisplay specie={dragon.specie} />
      </p>
    </article>
  );
}
