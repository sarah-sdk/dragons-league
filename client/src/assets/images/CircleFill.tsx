export default function CircleFill({
  size,
  color,
}: { size: string; color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      className="bi bi-circle-fill"
      viewBox="0 0 16 16"
    >
      <title>Cercle plein</title>
      <circle cx="8" cy="8" r="8" />
    </svg>
  );
}
