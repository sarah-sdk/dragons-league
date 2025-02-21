import { type ChangeEvent, useState } from "react";

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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          autoComplete="on"
          required
        />
        {errors.email && <p>{errors.email}</p>}

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          autoComplete="on"
          required
        />
        <ul>
          {errors.passwordLength && <li>{errors.passwordLength}</li>}
          {errors.passwordUppercase && <li>{errors.passwordUppercase}</li>}
          {errors.passwordNumber && <li>{errors.passwordNumber}</li>}
          {errors.passwordSpecialChar && <li>{errors.passwordSpecialChar}</li>}
        </ul>

        <label htmlFor="confirmPassword">Confirmez votre mot de passe</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          autoComplete="on"
          required
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <button type="submit">S'inscrire</button>
      </form>
    </main>
  );
}
