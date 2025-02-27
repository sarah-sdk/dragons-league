import type { InputFieldType } from "../../types/types";
import ShowPassword from "./ShowPassword";

export default function InputField({
  label,
  type,
  name,
  value,
  onChange,
  criteria,
  showPassword,
  togglePasswordVisibility,
}: InputFieldType) {
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

      {showPassword !== undefined && togglePasswordVisibility && (
        <ShowPassword
          showPassword={showPassword ?? false}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      )}

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
