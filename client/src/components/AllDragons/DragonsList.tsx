import { useLoaderData } from "react-router-dom";
import type { Dragon } from "../../types/types";
import DragonCard from "./DragonCard";

export default function DragonsList() {
  const { dragons } = useLoaderData() as { dragons: Dragon[] };

  return (
    <section>
      {dragons.map((dragon) => (
        <DragonCard key={dragon.name} dragon={dragon} />
      ))}
      <article className="adoptCard">
        <h2>+</h2>
      </article>
    </section>
  );
}
