import argon2 from "argon2";

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 19,
      timeCost: 2,
      parallelism: 1,
    });

    return hashedPassword;
  } catch (error) {
    throw Error("Erreur lors du hashage du mot de passe");
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  try {
    const isMatch = await argon2.verify(hashedPassword, password);
    return isMatch;
  } catch (error) {
    throw new Error("Erreur lors de la comparaison des mots de passe");
  }
};
