import type { InputFieldProps } from "../../types/types";

export default function InputField({
  label,
  type,
  name,
  value,
  onChange,
  errors,
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
      {typeof errors === "string" && <p className="error">{errors}</p>}
      {Array.isArray(errors) && errors.length > 0 && (
        <ul className="error-list">
          {errors.map((error) => (
            <li key={error} className="error-item">
              {error}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
