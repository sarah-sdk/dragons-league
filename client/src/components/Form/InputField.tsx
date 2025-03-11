import type { InputFieldType } from "../../types/types";
import ShowPassword from "./ShowPassword";

export default function InputField({
  label,
  type,
  max,
  name,
  value,
  onChange,
  accept,
  criteria,
  showPassword,
  togglePasswordVisibility,
}: InputFieldType) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        max={max}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        accept={accept}
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
        <ul className="criteriaList">
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
