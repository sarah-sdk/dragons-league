import type { RequestHandler } from "express";
import type { Dragon } from "../../types/types";
import dragonRepository from "./dragonRepository";

// B of BREAD
const browse: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const profileId = Number(req.params.profileId);

  try {
    const dragons = await dragonRepository.readAll({ userId, profileId });

    if (!dragons) res.sendStatus(404);

    res.json(dragons);
  } catch (error) {
    next(error);
  }
};

// R of BREAD
const read: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const profileId = Number(req.params.profileId);
  const dragonId = Number(req.params.dragonId);

  try {
    const dragon = await dragonRepository.read({ userId, profileId, dragonId });

    if (!dragon) res.sendStatus(404);

    res.json(dragon);
  } catch (error) {
    next(error);
  }
};

// E of BREAD
const edit: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const profileId = Number(req.params.profileId);
  const dragonId = Number(req.params.dragonId);

  try {
    const dragon: Omit<Dragon, "specieId"> = {
      userId: userId,
      profileId: profileId,
      id: dragonId,
      name: req.body.name,
      strength: req.body.strength,
      speed: req.body.speed,
      stamina: req.body.stamina,
    };

    const updateDragon = await dragonRepository.update(dragon);

    if (!updateDragon) res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// A of BREAD
const add: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const profileId = Number(req.params.profileId);

  try {
    const dragon: Omit<Dragon, "id" | "strength" | "speed" | "stamina"> = {
      userId: userId,
      profileId: profileId,
      name: req.body.name,
      specieId: req.body.specieId,
    };

    const insertId = await dragonRepository.create(dragon);

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

// D of BREAD
const destroy: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const profileId = Number(req.params.profileId);
  const dragonId = Number(req.params.dragonId);

  try {
    const affectedRows = await dragonRepository.destroy({
      userId,
      profileId,
      dragonId,
    });

    if (affectedRows === 0) res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };
