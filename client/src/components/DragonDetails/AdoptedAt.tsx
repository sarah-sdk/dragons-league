import formatDate from "../../services/formatDate";
import type { Dragon } from "../../types/types";

export default function AdoptedAt({ dragon }: { dragon: Dragon }) {
  const adopted_at = formatDate(dragon.adoptedAt);
  return (
    <p>
      {"Adopté le "}
      {adopted_at}
    </p>
  );
}
