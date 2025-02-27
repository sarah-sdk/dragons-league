import { type FormEvent, useState } from "react";
import logo from "/logo.png";
import InputField from "../../components/Register/InputField";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useAuthForm } from "../../hooks/useAuthForm";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const {
    criteria,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    validateEmail,
    validatePassword,
    togglePasswordVisibility,
  } = useAuthForm();

  const isFormValid = () => {
    return (
      criteria.email.includes("✅") &&
      criteria.passwordLength.includes("✅") &&
      criteria.passwordLowercase.includes("✅") &&
      criteria.passwordUppercase.includes("✅") &&
      criteria.passwordNumber.includes("✅") &&
      criteria.passwordSpecialChar.includes("✅") &&
      (criteria.confirmPassword
        ? criteria.confirmPassword.includes("✅")
        : false)
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!isFormValid()) {
      setError("Veuillez remplir correctement tous les champs.");
      return;
    }

    const newUser = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newUser),
          credentials: "include",
        },
      );

      const data = await response.json();
      if (response.ok) {
        navigate("/profils");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <main className="register">
      <img src={logo} alt="" />
      <h1>Inscription</h1>
      {error && <p className="error">{error}</p>}
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
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          criteria={[
            criteria.passwordLength,
            criteria.passwordLowercase,
            criteria.passwordUppercase,
            criteria.passwordNumber,
            criteria.passwordSpecialChar,
          ]}
          showPassword={showPassword}
          togglePasswordVisibility={() =>
            togglePasswordVisibility(setShowPassword)
          }
        />

        <InputField
          label="Confirmez votre mot de passe"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          criteria={criteria.confirmPassword ? criteria.confirmPassword : ""}
          showPassword={showConfirmPassword}
          togglePasswordVisibility={() =>
            togglePasswordVisibility(setShowConfirmPassword)
          }
        />

        <button type="submit" onClick={handleSubmit}>
          S'inscrire
        </button>
      </form>
    </main>
  );
}
