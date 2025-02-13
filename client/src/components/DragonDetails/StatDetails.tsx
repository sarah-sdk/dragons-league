import type { Dragon } from "../../types/types";
import StatCircles from "../ui/StatCircles";

export default function StatDetails({
  dragon,
  size,
}: { dragon: Dragon; size: string }) {
  return (
    <ul>
      <li>
        {"Force"}
        <StatCircles value={+dragon.strength} size={size} />
      </li>
      <li>
        {"Vitesse"}
        <StatCircles value={+dragon.speed} size={size} />
      </li>
      <li>
        {"Endurance"}
        <StatCircles value={+dragon.stamina} size={size} />
      </li>
    </ul>
  );
}
