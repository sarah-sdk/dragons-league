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
        <p className={criteria.includes("❌") ? "invalid" : "valid"}>
          {criteria}
        </p>
      )}
      {Array.isArray(criteria) && criteria.length > 0 && (
        <ul>
          {criteria.map((criterion) => (
            <li
              key={criterion}
              className={criterion.includes("❌") ? "invalid" : "valid"}
            >
              {criterion}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
