import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import authRepository from "../modules/auth/authRepository";
import type { JwtPayload } from "../types/types";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error(
    "La clé secrète JWT_SECRET n'est pas définie dans le fichier .env",
  );
}

const verifyToken: RequestHandler = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Accès non autorisé, token manquant." });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    const user = await authRepository.getUserByEmail(decoded.email);

    if (!user) {
      res.status(401).json({ message: "Utilisateur non trouvé" });
      return;
    }

    req.user = {
      id: +user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
    return;
  }
};

export default verifyToken;
