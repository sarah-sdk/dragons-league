import SpecieDisplay from "../../services/SpecieDisplay";
import type { AdoptionType } from "../../types/types";
import StatDetails from "../DragonDetails/StatDetails";

export default function AdoptionCard({ specie, onClick }: AdoptionType) {
  return (
    <button type="button" className="adoptionCard" onClick={onClick}>
      <figure className="adoptionImageBtn">
        <img
          src={`${import.meta.env.VITE_API_URL}/${specie.urlAdult}`}
          alt={specie.specie}
          className="adoptionImage"
        />
        <h2>
          <SpecieDisplay specie={specie.specie} />
        </h2>
      </figure>
      <legend className="adoptionInfo">
        <StatDetails
          strength={+specie.baseStrength}
          speed={+specie.baseSpeed}
          stamina={+specie.baseStamina}
          size="10"
        />
      </legend>
    </button>
  );
}
