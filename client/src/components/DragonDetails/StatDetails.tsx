import type { Dragon } from "../../types/types";
import StatCircles from "../ui/StatCircles";

export default function StatDetails({ dragon }: { dragon: Dragon }) {
  return (
    <ul>
      <li>
        {"Force"}
        <StatCircles value={+dragon.strength} />
      </li>
      <li>
        {"Vitesse"}
        <StatCircles value={+dragon.speed} />
      </li>
      <li>
        {"Endurance"}
        <StatCircles value={+dragon.stamina} />
      </li>
    </ul>
  );
}
