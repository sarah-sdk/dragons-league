import { v4 as uuidv4 } from "uuid";
import "./StatCircles.css";
import Circle from "../../assets/images/Circle";
import CircleFill from "../../assets/images/CircleFill";
import type { Stat } from "../../types/types";

export default function StatCircles({ value, size, highlight = false }: Stat) {
  const totalCircles = 10;
  const filledCircles = value;
  const hasHighlight = highlight && value < totalCircles;
  const emptyCircles = totalCircles - filledCircles - (hasHighlight ? 1 : 0);

  const circles = [
    ...Array.from({ length: filledCircles }, () => "filled"),
    ...(hasHighlight ? ["highlight"] : []),
    ...Array.from({ length: emptyCircles }, () => "empty"),
  ];

  return (
    <div className="statCircles">
      {circles.map((status) => (
        <span key={uuidv4()} className={`circle ${status}`}>
          {status === "filled" || status === "highlight" ? (
            <CircleFill
              size={size}
              color={status === "highlight" ? "green" : "currentColor"}
            />
          ) : (
            <Circle size={size} />
          )}
        </span>
      ))}
    </div>
  );
}
