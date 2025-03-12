import express from "express";
import authMiddlewares from "./middlewares/authMiddlewares";
import upload from "./middlewares/upload";
import authActions from "./modules/auth/authActions";
import dragonActions from "./modules/dragon/dragonActions";
import dragonTrainingActions from "./modules/dragonTraining/dragonTrainingActions";
import profileActions from "./modules/profile/profileActions";
import specieActions from "./modules/specie/specieActions";
import trainingActions from "./modules/training/trainingActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

/* ************************************************************************* */
// Authentification (routes publiques)
/* ************************************************************************* */
router.post("/api/auth/register", authActions.register);
router.post("/api/auth/login", authActions.login);

/* ************************************************************************* */
// Mur d'authentification : toutes les routes suivantes nécessitent un token
/* ************************************************************************* */
router.use("/api", authMiddlewares.verifyToken);
router.post("/api/auth/logout", authActions.logout);
router.get("/api/auth/me", (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Aucun utilisateur connecté" });
  } else {
    res.json({ userId: req.user.id, isAdmin: req.user.isAdmin });
  }
});
router.get("/api/auth/check", authActions.check);

//SPECIE
router.get("/api/species", specieActions.browse);
router.get("/api/species/:specieId", specieActions.read);

//TRAINING
router.get("/api/trainings", trainingActions.browse);
router.get("/api/trainings/:trainingId", trainingActions.read);

/* ************************************************************************* */
// Toutes les routes suivantes doivent venir du user ou d'un admin
/* ************************************************************************* */

//USER
router.get("/api/users/:userId", authMiddlewares.verifyId, userActions.read);
router.put("/api/users/:userId", authMiddlewares.verifyId, userActions.edit);
router.delete(
  "/api/users/:userId",
  authMiddlewares.verifyId,
  userActions.destroy,
);

//PROFILE
router.get(
  "/api/users/:userId/profiles",
  authMiddlewares.verifyId,
  profileActions.browse,
);
router.get(
  "/api/users/:userId/profiles/:profileId",
  authMiddlewares.verifyId,
  profileActions.read,
);
router.put(
  "/api/users/:userId/profiles/:profileId",
  authMiddlewares.verifyId,
  profileActions.edit,
);
router.post(
  "/api/users/:userId/profiles",
  authMiddlewares.verifyId,
  profileActions.add,
);
router.delete(
  "/api/users/:userId/profiles/:profileId",
  authMiddlewares.verifyId,
  profileActions.destroy,
);

//DRAGON
router.get(
  "/api/users/:userId/profiles/:profileId/dragons",
  authMiddlewares.verifyId,
  dragonActions.browse,
);
router.get(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId",
  authMiddlewares.verifyId,
  dragonActions.read,
);
router.put(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId",
  authMiddlewares.verifyId,
  dragonActions.edit,
);
router.post(
  "/api/users/:userId/profiles/:profileId/dragons/",
  authMiddlewares.verifyId,
  dragonActions.add,
);
router.delete(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId",
  authMiddlewares.verifyId,
  dragonActions.destroy,
);

//DRAGON-TRAINING
router.get(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId/trainings",
  authMiddlewares.verifyId,
  dragonTrainingActions.browse,
);
router.get(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId/trainings/:trainingId",
  authMiddlewares.verifyId,
  dragonTrainingActions.read,
);
router.post(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId/trainings/",
  authMiddlewares.verifyId,
  dragonTrainingActions.add,
);

/* ************************************************************************* */
// Mur de vérification : accès réservé aux admins
/* ************************************************************************* */
router.use("/api", authMiddlewares.authorizeAdmin);

//SPECIE
router.put(
  "/api/species/:specieId",
  upload.fields([
    { name: "babyImage", maxCount: 1 },
    { name: "adultImage", maxCount: 1 },
  ]),
  specieActions.edit,
);
router.post(
  "/api/species",
  upload.fields([
    { name: "babyImage", maxCount: 1 },
    { name: "adultImage", maxCount: 1 },
  ]),
  specieActions.add,
);
router.delete("/api/species/:specieId", specieActions.destroy);

//TRAINING
router.put("/api/trainings/:trainingId", trainingActions.edit);
router.post("/api/trainings", trainingActions.add);
router.delete("/api/trainings/:trainingId", trainingActions.destroy);

//USER
router.get("/api/users", userActions.browse);
router.post("/api/users", userActions.add);

//DRAGON-TRAINING
router.put(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId/trainings/:trainingId",
  dragonTrainingActions.edit,
);
router.delete(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId/trainings/:trainingId",
  dragonTrainingActions.destroy,
);

/* ************************************************************************* */

export default router;
