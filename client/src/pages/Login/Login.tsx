import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/Register/InputField";
import "./Login.css";
import logo from "/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [criteria, setCriteria] = useState({
    email: "❌ L'email doit être de type address@example.com",
    passwordLength: "❌ Minimum 12 caractères",
    passwordLowercase: "❌ Au moins 1 minuscule",
    passwordUppercase: "❌ Au moins 1 majuscule",
    passwordNumber: "❌ Au moins 1 chiffre",
    passwordSpecialChar: "❌ Au moins 1 caractère spécial",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

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
          ? "✅ Minimum 12 caractères"
          : "❌ Minimum 12 caractères",
      passwordLowercase: /[a-z]/.test(password)
        ? "✅ Au moins 1 minuscule"
        : "❌ Au moins 1 minuscule",
      passwordUppercase: /[A-Z]/.test(password)
        ? "✅ Au moins 1 majuscule"
        : "❌ Au moins 1 majuscule",
      passwordNumber: /\d/.test(password)
        ? "✅ Au moins 1 chiffre"
        : "❌ Au moins 1 chiffre",
      passwordSpecialChar: /[!@#$%^&*]/.test(password)
        ? "✅ Au moins 1 caractère spécial"
        : "❌ Au moins 1 caractère spécial",
    }));
  };

  const togglePasswordVisibility = (
    setState: Dispatch<SetStateAction<boolean>>,
  ) => {
    setState((prevState) => !prevState);
  };

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

        <button type="submit" onClick={handleSubmit}>
          Se connecter
        </button>
        <button type="button" onClick={() => navigate("/inscription")}>
          S'inscrire
        </button>
      </form>
    </main>
  );
}
