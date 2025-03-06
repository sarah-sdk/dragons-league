import { useLoaderData, useNavigate } from "react-router-dom";
import DragonCard from "../../components/AllDragons/DragonCard";
import type { Dragon } from "../../types/types";
import "./AllDragons.css";

export default function AllDragons() {
  const { dragons } = useLoaderData() as { dragons: Dragon[] };
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/adopter-dragon");
  };
  return (
    <section className="dragonsList">
      <h1>Mes dragons</h1>
      <p>Constituez votre équipe de dragons 🐉</p>
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
