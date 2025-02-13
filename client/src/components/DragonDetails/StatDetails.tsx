import StatCircles from "../ui/StatCircles";

export default function StatDetails({
  strength,
  speed,
  stamina,
  size,
}: { strength: number; speed: number; stamina: number; size: string }) {
  return (
    <ul>
      <li>
        {"Force"}
        <StatCircles value={strength} size={size} />
      </li>
      <li>
        {"Vitesse"}
        <StatCircles value={speed} size={size} />
      </li>
      <li>
        {"Endurance"}
        <StatCircles value={stamina} size={size} />
      </li>
    </ul>
  );
}
