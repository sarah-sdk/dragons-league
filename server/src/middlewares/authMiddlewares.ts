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
    throw new Error("Accès non autorisé, token manquant.");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    const user = await authRepository.getUserByEmail(decoded.email);

    if (!user) {
      res.status(401).json({ message: "Utilisateur non trouvé" });
    } else {
      req.user = {
        userId: user.id,
        userEmail: user.email,
        isAdmin: user.isAdmin,
      };
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
