import type { Stats } from "../../types/types";
import StatCircles from "../ui/StatCircles";

export default function StatDetails({
  strength,
  speed,
  stamina,
  size,
  highlightedStat,
}: Stats) {
  return (
    <ul>
      <li>
        {"Endurance"}
        <StatCircles
          value={stamina}
          size={size}
          highlight={highlightedStat === "stamina"}
        />
      </li>
      <li>
        {"Force"}
        <StatCircles
          value={strength}
          size={size}
          highlight={highlightedStat === "strength"}
        />
      </li>
      <li>
        {"Vitesse"}
        <StatCircles
          value={speed}
          size={size}
          highlight={highlightedStat === "speed"}
        />
      </li>
    </ul>
  );
}
