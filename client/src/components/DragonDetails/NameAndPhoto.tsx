import SpecieDisplay from "../../services/SpecieDisplay";
import getDragonImage from "../../services/getDragonImage";
import type { Dragon } from "../../types/types";

export default function NameAndPhoto({ dragon }: { dragon: Dragon }) {
  const imageDragon = getDragonImage({ dragon });
  return (
    <>
      <h1>{dragon.name}</h1>
      <img
        src={`${import.meta.env.VITE_API_URL}/${imageDragon}`}
        alt={dragon.name}
      />
      <h2>
        Espèce : <SpecieDisplay specie={dragon.specie} />
      </h2>
    </>
  );
}
