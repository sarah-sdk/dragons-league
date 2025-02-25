import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react";
import logo from "/logo.png";
import InputField from "../../components/Register/InputField";
import "./Register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [criteria, setCriteria] = useState({
    email: "❌ L'email doit être de type address@example.com",
    passwordLength: "❌ Minimum 12 caractères",
    passwordLowercase: "❌ Au moins 1 minuscule",
    passwordUppercase: "❌ Au moins 1 majuscule",
    passwordNumber: "❌ Au moins 1 chiffre",
    passwordSpecialChar: "❌ Au moins 1 caractère spécial",
    confirmPassword: "❌ Les mots de passe doivent correspondre",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

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

  const validateConfirmPassword = (confirmPassword: string) => {
    setCriteria((prev) => ({
      ...prev,
      confirmPassword:
        confirmPassword === password
          ? "✅ Les mots de passe correspondent"
          : "❌ Les mots de passe doivent correspondre",
    }));
  };

  const togglePasswordVisibility = (
    setState: Dispatch<SetStateAction<boolean>>,
  ) => {
    setState((prevState) => !prevState);
  };

  const isFormValid = () => {
    return (
      criteria.email.includes("✅") &&
      criteria.passwordLength.includes("✅") &&
      criteria.passwordLowercase.includes("✅") &&
      criteria.passwordUppercase.includes("✅") &&
      criteria.passwordNumber.includes("✅") &&
      criteria.passwordSpecialChar.includes("✅") &&
      criteria.confirmPassword.includes("✅")
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
            validateConfirmPassword(e.target.value);
          }}
          criteria={criteria.confirmPassword}
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
