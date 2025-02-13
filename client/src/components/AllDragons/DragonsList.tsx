import { useLoaderData, useNavigate } from "react-router-dom";
import type { Dragon } from "../../types/types";
import DragonCard from "./DragonCard";

export default function DragonsList() {
  const { dragons } = useLoaderData() as { dragons: Dragon[] };
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/adopt-dragon");
  };

  return (
    <section className="dragonsList">
      <h1>Mes dragons</h1>
      {dragons.map((dragon) => (
        <DragonCard key={dragon.name} dragon={dragon} />
      ))}
      <button
        type="button"
        className="dragonCard adoptCard"
        onClick={handleCardClick}
      >
        <p>+</p>
      </button>
    </section>
  );
}
