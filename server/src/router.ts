import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";
router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import userActions from "./modules/user/userActions";
router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.put("/api/users/:id", userActions.edit);
router.post("/api/users", userActions.add);
router.delete("/api/users/:id", userActions.destroy);

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
router.get("/api/users/:id/dragons", dragonActions.browseByUser);
router.get("/api/dragons/:id", dragonActions.read);
router.put("/api/dragons/:id", dragonActions.edit);
router.post("/api/dragons", dragonActions.add);
router.delete("/api/dragons/:id", dragonActions.destroy);

import dragonTrainingActions from "./modules/dragonTraining/dragonTrainingActions";
router.get("/api/dragons/:dragonId/trainings", dragonTrainingActions.browse);
router.get(
  "/api/dragons/:dragonId/trainings/:trainingId",
  dragonTrainingActions.read,
);
router.put(
  "/api/dragons/:dragonId/trainings/:trainingId",
  dragonTrainingActions.edit,
);
router.post("/api/dragons/:dragonId/trainings/", dragonTrainingActions.add);
router.delete(
  "/api/dragons/:dragonId/trainings/:trainingId",
  dragonTrainingActions.destroy,
);

/* ************************************************************************* */

export default router;
