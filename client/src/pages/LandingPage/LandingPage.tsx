import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <section className="landingPage">
      <div>
        <h1>Bienvenue sur Dragons League 🐉</h1>
      </div>
      <div>
        <article>
          <h2>Les bases du jeu 🌟</h2>
          <ul>
            <li>
              <h3>Adopte un dragon 🐲</h3>
              <p>
                Commence ton aventure en choisissant un dragon parmi nos
                créatures toutes plus mignonnes les unes que les autres ! Chaque
                dragon est unique, avec ses propres pouvoirs et une personnalité
                toute particulière. 🐉
              </p>
            </li>
            <li>
              <h3>Entraîne-les pour les rendre plus forts 💪</h3>
              <p>
                En tant que dresseur, tu devras entraîner tes dragons dans
                différentes disciplines pour les préparer aux défis à venir.
                Plus tu t’entraînes, plus ils deviennent puissants et prêts à
                affronter d’autres dragons ! ⚡
              </p>
            </li>
          </ul>
        </article>
        <article>
          <h2>Qui peut jouer ? 👾</h2>
          <p>
            Dragons League est ouvert à tous ceux qui rêvent de s’occuper de
            dragons mignons et d’explorer un univers magique. Peu importe ton
            expérience de jeu, ici, on t’accueille à bras ouverts !
          </p>
        </article>
        <nav>
          <Link to="/connexion">
            <button type="button">Se connecter</button>
          </Link>
          <Link to="/inscription">
            <button type="button">S'inscire</button>
          </Link>
        </nav>
      </div>
    </section>
  );
}
