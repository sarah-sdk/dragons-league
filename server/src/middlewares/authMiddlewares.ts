import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/types";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error(
    "La clé secrète JWT_SECRET n'est pas définie dans le fichier .env",
  );
}

const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.info("cookies reçus :", token);

  if (!token) {
    throw new Error("Accès non autorisé, token manquant.");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    req.user = { role: decoded.isAdmin ? "admin" : "user" };
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
