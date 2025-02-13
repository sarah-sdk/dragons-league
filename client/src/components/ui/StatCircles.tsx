import { v4 as uuidv4 } from "uuid";
import "./StatCircles.css";

export default function StatCircles({ value }: { value: number }) {
  const totalCircles = 10;
  const circles = Array.from({ length: totalCircles }, (_, i) => i < value);

  return (
    <div>
      {circles.map((filled) => (
        <span
          key={uuidv4()}
          className={`circle ${filled ? "filled" : "empty"}`}
        >
          {filled ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-circle-fill"
              viewBox="0 0 16 16"
            >
              <title>Cercle plein</title>
              <circle cx="8" cy="8" r="8" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-circle"
              viewBox="0 0 16 16"
            >
              <title>Cercle</title>
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}
