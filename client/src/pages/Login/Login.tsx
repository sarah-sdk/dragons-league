import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/Form/InputField";
import "./Login.css";
import logo from "/logo.png";
import { useAuthForm } from "../../hooks/useAuthForm";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {
    criteria,
    showPassword,
    setShowPassword,
    validateEmail,
    validatePassword,
    togglePasswordVisibility,
  } = useAuthForm();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Veuillez remplir les champs requis.");
      return;
    }

    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(user),
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
    <main className="login">
      <img src={logo} alt="" />
      <h1>Connexion</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Se connecter</button>
        <button type="button" onClick={() => navigate("/inscription")}>
          S'inscrire
        </button>
      </form>
    </main>
  );
}
