import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import profileActions from "./modules/profile/profileActions";
router.get("/api/profiles", profileActions.browse);
router.get("/api/profiles/:id", profileActions.read);
router.put("/api/profiles/:id", profileActions.edit);
router.post("/api/profiles", profileActions.add);
router.delete("/api/profiles/:id", profileActions.destroy);

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
router.get("/api/dragons", dragonActions.browse);
router.get("/api/profiles/:profileId/dragons", dragonActions.browseByProfile);
router.get("/api/profiles/:profileId/dragons/:dragonId", dragonActions.read);
router.put("/api/profiles/:profileId/dragons/:dragonId", dragonActions.edit);
router.post("/api/profiles/:profileId/dragons/", dragonActions.add);
router.delete(
  "/api/profiles/:profileId/dragons/:dragonId",
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
