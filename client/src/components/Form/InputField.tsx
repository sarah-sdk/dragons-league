import type { InputFieldType } from "../../types/types";
import CriteriaMessage from "./CriteriaMessage";
import ShowPassword from "./ShowPassword";

export default function InputField({
  label,
  type,
  min,
  max,
  name,
  className,
  id,
  value,
  onChange,
  criteria,
  showPassword,
  togglePasswordVisibility,
}: InputFieldType) {
  const uniqueId = id || name;
  return (
    <>
      {type === "radio" ? (
        <>
          <input
            type={type}
            id={uniqueId}
            name={name}
            onChange={onChange}
            required
          />
          <label htmlFor={uniqueId} className={className}>
            {label}
          </label>
        </>
      ) : (
        <>
          <label htmlFor={uniqueId}>{label}</label>
          {type === "number" ? (
            <input
              type={type}
              id={uniqueId}
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
              id={uniqueId}
              name={name}
              value={value}
              onChange={onChange}
              required
            />
          )}
        </>
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
