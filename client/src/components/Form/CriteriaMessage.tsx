import type { CriteriaMessageType } from "../../types/types";

export default function CriteriaMessage({ criteria }: CriteriaMessageType) {
  if (!criteria || (Array.isArray(criteria) && criteria.length === 0))
    return null;

  return (
    <>
      {typeof criteria === "string" ? (
        <p
          className={
            criteria.includes("❌") ? "criteria invalid" : "criteria valid"
          }
        >
          {criteria}
        </p>
      ) : (
        <ul>
          {criteria.map((criterion) => (
            <li
              key={criterion}
              className={
                criteria.includes("❌") ? "criteria invalid" : "criteria valid"
              }
            >
              {criterion}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
