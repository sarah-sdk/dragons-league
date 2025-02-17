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
