import eyeSlash from "/eye-slash.svg";
import eye from "/eye.svg";
import type { ShowPasswordType } from "../../types/types";

export default function ShowPassword({
  togglePasswordVisibility,
  showPassword,
}: ShowPasswordType) {
  return (
    <button type="button" onClick={togglePasswordVisibility}>
      {showPassword ? (
        <img src={eyeSlash} alt="Cacher le mot de passe" />
      ) : (
        <img src={eye} alt="Voir le mot de passe" />
      )}
    </button>
  );
}
