import { useLoaderData } from "react-router-dom";
import type { Dragon } from "../../types/types";

export default function DragonDetails() {
  const { dragon } = useLoaderData() as { dragon: Dragon };
  return (
    <article>
      <h1>Mon dragon</h1>
      <h2>{dragon.name}</h2>
      <p>{dragon.specie}</p>
      <p>
        {"Force : "}
        {dragon.strength}
      </p>
      <p>
        {"Vitesse : "}
        {dragon.speed}
      </p>
      <p>
        {"Endurance : "}
        {dragon.stamina}
      </p>
      <img
        src={`${import.meta.env.VITE_URL_API}/${dragon.url_baby}`}
        alt={dragon.name}
      />
    </article>
  );
}
