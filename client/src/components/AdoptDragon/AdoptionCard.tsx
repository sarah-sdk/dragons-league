import SpecieDisplay from "../../services/SpecieDisplay";
import type { AdoptionProps } from "../../types/types";
import StatDetails from "../DragonDetails/StatDetails";

export default function AdoptionCard({ specie, onClick }: AdoptionProps) {
  return (
    <button type="button" className="adoptionCard" onClick={onClick}>
      <figure className="adoptionImageBtn">
        <img
          src={`${import.meta.env.VITE_API_URL}/${specie.url_adult}`}
          alt={specie.specie}
          className="adoptionImage"
        />
        <h2>
          <SpecieDisplay specie={specie.specie} />
        </h2>
      </figure>
      <legend className="adoptionInfo">
        <StatDetails
          strength={+specie.base_strength}
          speed={+specie.base_speed}
          stamina={+specie.base_stamina}
          size="10"
        />
      </legend>
    </button>
  );
}
