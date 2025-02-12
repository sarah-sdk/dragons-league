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

const browseByUser: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);

  try {
    const dragons = await dragonRepository.readAllByUser(userId);

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
  const userId = Number(req.params.userId);
  const dragonId = Number(req.params.dragonId);

  try {
    const dragon = await dragonRepository.read({ userId, dragonId });

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
  const userId = Number(req.params.userId);
  const dragonId = Number(req.params.dragonId);

  try {
    const dragon: Omit<Dragon, "specie_id"> = {
      name: req.body.name,
      strength: req.body.strength,
      speed: req.body.speed,
      stamina: req.body.stamina,
      user_id: userId,
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
  const userId = Number(req.params.userId);

  try {
    const dragon: Omit<Dragon, "id" | "strength" | "speed" | "stamina"> = {
      name: req.body.name,
      specie_id: req.body.specie_id,
      user_id: userId,
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
  const dragonId = Number(req.params.dragonId);

  try {
    const affectedRows = await dragonRepository.destroy({ userId, dragonId });

    if (affectedRows === 0) {
      res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, browseByUser, read, edit, add, destroy };
