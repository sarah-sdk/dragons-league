import { useState } from "react";
import logo from "/logo.png";
import InputField from "../../components/Register/InputField";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [criteria, setCriteria] = useState({
    email: "❌  L'email doit être de type address@example.com",
    passwordLength: "❌  Minimum 12 caractères",
    passwordUppercase: "❌  Au moins 1 majuscule",
    passwordNumber: "❌  Au moins 1 chiffre",
    passwordSpecialChar: "❌  Au moins 1 caractère spécial",
    confirmPassword: "❌  Les mots de passe doivent correspondre",
  });

  const validateEmail = (email: string) => {
    setCriteria((prev) => ({
      ...prev,
      email: /\S+@\S+\.\S+/.test(email)
        ? "✅  Email valide"
        : "❌  L'email doit être de type address@example.com",
    }));
  };

  const validatePassword = (password: string) => {
    setCriteria((prev) => ({
      ...prev,
      passwordLength:
        password.length >= 12
          ? "✅  Minimum 12 caractères"
          : "❌  Minimum 12 caractères",
      passwordUppercase: /[A-Z]/.test(password)
        ? "✅  Au moins 1 majuscule"
        : "❌  Au moins 1 majuscule",
      passwordNumber: /\d/.test(password)
        ? "✅  Au moins 1 chiffre"
        : "❌  Au moins 1 chiffre",
      passwordSpecialChar: /[!@#$%^&*]/.test(password)
        ? "✅  Au moins 1 caractère spécial"
        : "❌  Au moins 1 caractère spécial",
    }));
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    setCriteria((prev) => ({
      ...prev,
      confirmPassword:
        confirmPassword === password
          ? "✅  Les mots de passe correspondent"
          : "❌  Les mots de passe doivent correspondre",
    }));
  };

  return (
    <main className="register">
      <img src={logo} alt="" />
      <h1>Inscription</h1>
      <form>
        <InputField
          label="Votre email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          criteria={criteria.email}
        />

        <InputField
          label="Votre mot de passe"
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          criteria={[
            criteria.passwordLength,
            criteria.passwordUppercase,
            criteria.passwordNumber,
            criteria.passwordSpecialChar,
          ]}
        />

        <InputField
          label="Confirmez votre mot de passe"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            validateConfirmPassword(e.target.value);
          }}
          criteria={criteria.confirmPassword}
        />

        <button type="submit">S'inscrire</button>
      </form>
    </main>
  );
}
