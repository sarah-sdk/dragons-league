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
router.post("/api/species", specieActions.add);

/* ************************************************************************* */

export default router;
