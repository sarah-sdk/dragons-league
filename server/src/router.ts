import express from "express";
import verifyToken from "./middlewares/authMiddlewares";
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
// Define Your API Routes Here
/* ************************************************************************* */

// Routes publiques
router.post("/api/auth/register", authActions.register);
router.post("/api/auth/login", authActions.login);
router.post("/api/auth/logout", authActions.logout);

router.get("/api/auth/me", verifyToken, (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Aucun utilisateur connecté" });
  } else {
    res.json({ userId: req.user.id, isAdmin: req.user.isAdmin });
  }
});

/* ************************************************************************* */
// Mur d'authentification
/* ************************************************************************* */
router.use("/api", verifyToken);

// Route de vérification de connexion
router.get("/api/auth/check", authActions.check);

router.get("/api/users", userActions.browse);
router.get("/api/users/:userId", userActions.read);
router.put("/api/users/:userId", userActions.edit);
router.post("/api/users", userActions.add);
router.delete("/api/users/:userId", userActions.destroy);

router.get("/api/users/:userId/profiles", profileActions.browse);
router.get("/api/users/:userId/profiles/:profileId", profileActions.read);
router.put("/api/users/:userId/profiles/:profileId", profileActions.edit);
router.post("/api/users/:userId/profiles", profileActions.add);
router.delete("/api/users/:userId/profiles/:profileId", profileActions.destroy);

router.get("/api/species", specieActions.browse);
router.get("/api/species/:specieId", specieActions.read);

router.get("/api/trainings", trainingActions.browse);
router.get("/api/trainings/:trainingId", trainingActions.read);

router.get(
  "/api/users/:userId/profiles/:profileId/dragons",
  dragonActions.browse,
);
router.get(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId",
  dragonActions.read,
);

router.get(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId/trainings",
  dragonTrainingActions.browse,
);
router.get(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId/trainings/:trainingId",
  dragonTrainingActions.read,
);

// Routes accessibles aux admins
router.put("/api/species/:specieId", specieActions.edit);
router.post(
  "/api/species",
  upload.fields([
    { name: "babyImage", maxCount: 1 },
    { name: "adultImage", maxCount: 1 },
  ]),
  specieActions.add,
);
router.delete("/api/species/:specieId", specieActions.destroy);

router.put("/api/trainings/:trainingId", trainingActions.edit);
router.post("/api/trainings", trainingActions.add);
router.delete("/api/trainings/:trainingId", trainingActions.destroy);

router.put(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId",
  dragonActions.edit,
);
router.post(
  "/api/users/:userId/profiles/:profileId/dragons/",
  dragonActions.add,
);
router.delete(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId",
  dragonActions.destroy,
);

router.put(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId/trainings/:trainingId",
  dragonTrainingActions.edit,
);
router.post(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId/trainings/",
  dragonTrainingActions.add,
);
router.delete(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId/trainings/:trainingId",
  dragonTrainingActions.destroy,
);

/* ************************************************************************* */

export default router;
