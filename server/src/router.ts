import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import userActions from "./modules/user/userActions";
router.get("/api/users", userActions.browse);
router.get("/api/users/:userId", userActions.read);
router.put("/api/users/:userId", userActions.edit);
router.post("/api/users", userActions.add);
router.delete("/api/users/:userId", userActions.destroy);

import profileActions from "./modules/profile/profileActions";
router.get("/api/users/:userId/profiles", profileActions.browse);
router.get("/api/users/:userId/profiles/:profileId", profileActions.read);
router.put("/api/users/:userId/profiles/:profileId", profileActions.edit);
router.post("/api/users/:userId/profiles", profileActions.add);
router.delete("/api/users/:userId/profiles/:profileId", profileActions.destroy);

import specieActions from "./modules/specie/specieActions";
router.get("/api/species", specieActions.browse);
router.get("/api/species/:id", specieActions.read);
router.put("/api/species/:id", specieActions.edit);
router.post("/api/species", specieActions.add);
router.delete("/api/species/:id", specieActions.destroy);

import trainingActions from "./modules/training/trainingActions";
router.get("/api/trainings", trainingActions.browse);
router.get("/api/trainings/:id", trainingActions.read);
router.put("/api/trainings/:id", trainingActions.edit);
router.post("/api/trainings", trainingActions.add);
router.delete("/api/trainings/:id", trainingActions.destroy);

import dragonActions from "./modules/dragon/dragonActions";
router.get(
  "/api/users/:userId/profiles/:profileId/dragons",
  dragonActions.browse,
);
router.get(
  "/api/users/:userId/profiles/:profileId/dragons/:dragonId",
  dragonActions.read,
);
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

import dragonTrainingActions from "./modules/dragonTraining/dragonTrainingActions";
router.get(
  "/api/profiles/:profileId/dragons/:dragonId/trainings",
  dragonTrainingActions.browse,
);
router.get(
  "/api/profiles/:profileId/dragons/:dragonId/trainings/:trainingId",
  dragonTrainingActions.read,
);
router.put(
  "/api/profiles/:profileId/dragons/:dragonId/trainings/:trainingId",
  dragonTrainingActions.edit,
);
router.post(
  "/api/profiles/:profileId/dragons/:dragonId/trainings/",
  dragonTrainingActions.add,
);
router.delete(
  "/api/profiles/:profileId/dragons/:dragonId/trainings/:trainingId",
  dragonTrainingActions.destroy,
);

/* ************************************************************************* */

export default router;
