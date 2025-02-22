import type { InputFieldProps } from "../../types/types";

export default function InputField({
  label,
  type,
  name,
  value,
  onChange,
  criteria,
}: InputFieldProps) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="on"
        required
      />
      {typeof criteria === "string" && (
        <p
          className={
            criteria.includes("❌") ? "criteria invalid" : " criteria valid"
          }
        >
          {criteria}
        </p>
      )}
      {Array.isArray(criteria) && criteria.length > 0 && (
        <ul className="criteria-list">
          {criteria.map((criterion) => (
            <li
              key={criterion}
              className={
                criterion.includes("❌") ? "criteria invalid" : "criteria valid"
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
