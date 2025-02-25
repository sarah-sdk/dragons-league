import eyeSlash from "/eye-slash.svg";
import eye from "/eye.svg";
import type { ShowPasswordProps } from "../../types/types";

export default function ShowPassword({
  togglePasswordVisibility,
  showPassword,
}: ShowPasswordProps) {
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
