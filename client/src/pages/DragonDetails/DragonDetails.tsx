import { useLoaderData } from "react-router-dom";
import AdoptedAt from "../../components/DragonDetails/AdoptedAt";
import NameAndPhoto from "../../components/DragonDetails/NameAndPhoto";
import StatDetails from "../../components/DragonDetails/StatDetails";
import type { Dragon } from "../../types/types";
import "./DragonDetails.css";

export default function DragonDetails() {
  const { dragon } = useLoaderData() as { dragon: Dragon };

  return (
    <article className="dragonDetails">
      <NameAndPhoto dragon={dragon} />
      <ul>
        <StatDetails dragon={dragon} />
      </ul>
      <AdoptedAt dragon={dragon} />
    </article>
  );
}
