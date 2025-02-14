import type { RequestHandler } from "express";
import type { Dragon } from "../../types/types";
import dragonRepository from "./dragonRepository";

// B of BREAD
const browse: RequestHandler = async (req, res, next) => {
  try {
    const dragons = await dragonRepository.readAll();

    if (!dragons) {
      res.sendStatus(404);
    }

    res.json(dragons);
  } catch (error) {
    next(error);
  }
};

const browseByProfile: RequestHandler = async (req, res, next) => {
  const profileId = Number(req.params.profileId);

  try {
    const dragons = await dragonRepository.readAllByProfile(profileId);

    if (!dragons) {
      res.sendStatus(404);
    }

    res.json(dragons);
  } catch (error) {
    next(error);
  }
};

// R of BREAD
const read: RequestHandler = async (req, res, next) => {
  const profileId = Number(req.params.profileId);
  const dragonId = Number(req.params.dragonId);

  try {
    const dragon = await dragonRepository.read({ profileId, dragonId });

    if (!dragon) {
      res.sendStatus(404);
    }

    res.json(dragon);
  } catch (error) {
    next(error);
  }
};

// E of BREAD
const edit: RequestHandler = async (req, res, next) => {
  const profileId = Number(req.params.profileId);
  const dragonId = Number(req.params.dragonId);

  try {
    const dragon: Omit<Dragon, "specie_id"> = {
      name: req.body.name,
      strength: req.body.strength,
      speed: req.body.speed,
      stamina: req.body.stamina,
      profile_id: profileId,
      id: dragonId,
    };

    const updateDragon = await dragonRepository.update(dragon);

    if (!updateDragon) {
      res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// A of BREAD
const add: RequestHandler = async (req, res, next) => {
  const profileId = Number(req.params.profileId);

  try {
    const dragon: Omit<Dragon, "id" | "strength" | "speed" | "stamina"> = {
      name: req.body.name,
      specie_id: req.body.specie_id,
      profile_id: profileId,
    };

    const insertId = await dragonRepository.create(dragon);

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

// D of BREAD
const destroy: RequestHandler = async (req, res, next) => {
  const profileId = Number(req.params.profileId);
  const dragonId = Number(req.params.dragonId);

  try {
    const affectedRows = await dragonRepository.destroy({
      profileId,
      dragonId,
    });

    if (affectedRows === 0) {
      res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, browseByProfile, read, edit, add, destroy };
