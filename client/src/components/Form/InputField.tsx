import type { InputFieldType } from "../../types/types";
import CriteriaMessage from "./CriteriaMessage";
import ShowPassword from "./ShowPassword";

export default function InputField({
  label,
  type,
  min,
  max,
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
      {type === "number" ? (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          max={max}
          min={min}
          required
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required
        />
      )}

      {showPassword !== undefined && togglePasswordVisibility && (
        <ShowPassword
          showPassword={showPassword ?? false}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      )}

      {criteria && <CriteriaMessage criteria={criteria} />}
    </>
  );
}
