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

const authorizeAdmin: RequestHandler = (req, res, next) => {
  try {
    const isAdmin = req.user?.isAdmin;
    if (!isAdmin) {
      throw new Error("Accès interdit: rôle insuffisant");
    }

    next();
  } catch (error) {
    next(error);
  }
};

const verifyId: RequestHandler = (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error("Vous devez être connecté pour accéder à cette route");
    }

    const userFromToken = req.user.id;
    const userFromRequest = Number(req.params.userId);

    if (req.user.isAdmin || userFromRequest === userFromToken) {
      next();
    }
  } catch (error) {
    res.sendStatus(404);
  }
};

export default { verifyToken, authorizeAdmin, verifyId };
