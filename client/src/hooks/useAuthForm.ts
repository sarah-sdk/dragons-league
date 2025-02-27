import { type Dispatch, type SetStateAction, useState } from "react";
import type { ValidationCriteria } from "../types/types";

export const useAuthForm = () => {
  const [criteria, setCriteria] = useState<ValidationCriteria>({
    email: "❌ L'email doit être de type address@example.com",
    passwordLength: "❌ Minimum 12 caractères",
    passwordLowercase: "❌ Au moins 1 minuscule",
    passwordUppercase: "❌ Au moins 1 majuscule",
    passwordNumber: "❌ Au moins 1 chiffre",
    passwordSpecialChar: "❌ Au moins 1 caractère spécial",
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

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string,
  ) => {
    setCriteria((prev) => ({
      ...prev,
      confirmPassword:
        confirmPassword === password
          ? "✅ Les mots de passe correspondent"
          : "❌ Les mots de passe doivent correspondre",
    }));
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const togglePasswordVisibility = (
    setState: Dispatch<SetStateAction<boolean>>,
  ) => {
    setState((prevState) => !prevState);
  };

  return {
    criteria,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    togglePasswordVisibility,
  };
};
