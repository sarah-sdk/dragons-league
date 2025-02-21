import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main>
      <h1>Connexion</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Votre email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="on"
          required
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Votre mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="on"
          required
        />

        <button type="submit">Se connecter</button>
        <button type="button" onClick={() => navigate("/inscription")}>
          S'inscrire
        </button>
      </form>
    </main>
  );
}
