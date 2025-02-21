import { type ChangeEvent, useState } from "react";
import InputField from "../../components/Register/InputField";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    passwordLength: "",
    passwordUppercase: "",
    passwordNumber: "",
    passwordSpecialChar: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      setErrors((prev) => ({
        ...prev,
        email: value.includes("@") ? "" : "L'email n'est pas valide.",
      }));
    }

    if (name === "password") {
      setPassword(value);
      setErrors((prev) => ({
        ...prev,
        passwordLength:
          value.length >= 12
            ? ""
            : "Le mot de passe doit contenir 12 caractères minimum.",
        passwordUppercase: /[A-Z]/.test(value)
          ? ""
          : "Le mot de passe doit contenir au moins 1 majuscule.",
        passwordNumber: /\d/.test(value)
          ? ""
          : "Le mot de passe doit contenir au moins 1 chiffre.",
        passwordSpecialChar: /[!@#$%^&*]/.test(value)
          ? ""
          : "Le mot de passe doit contenir 1 caractère spécial.",
      }));
    }

    if (name === "confirmPassword") {
      setConfirmPassword(value);
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value === password ? "" : "Les mots de passe ne correspondent pas.",
      }));
    }
  };

  return (
    <main>
      <h1>Inscription</h1>
      <form>
        <InputField
          label="Votre email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          errors={errors.email}
        />

        <InputField
          label="Votre mot de pass"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          errors={[
            errors.passwordLength,
            errors.passwordUppercase,
            errors.passwordNumber,
            errors.passwordSpecialChar,
          ].filter(Boolean)}
        />

        <InputField
          label="Confirmez votre mot de passe"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          errors={errors.confirmPassword}
        />

        <button type="submit">S'inscrire</button>
      </form>
    </main>
  );
}
