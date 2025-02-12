import type { RequestHandler } from "express";
import type { DragonTraining } from "../../types/types";
import dragonTrainingRepository from "./dragonTrainingRepository";

// B of BREAD
const browse: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const dragonId = Number(req.params.dragonId);

  try {
    const dragonTranings = await dragonTrainingRepository.readAll({
      userId,
      dragonId,
    });

    if (!dragonTranings) {
      res.sendStatus(404);
    }

    res.json(dragonTranings);
  } catch (error) {
    next(error);
  }
};

// R of BREAD
const read: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const dragonId = Number(req.params.dragonId);
  const trainingId = Number(req.params.trainingId);

  try {
    const dragonTraining = await dragonTrainingRepository.read({
      userId,
      dragonId,
      trainingId,
    });

    if (!dragonTraining) {
      res.sendStatus(404);
    }

    res.json(dragonTraining);
  } catch (error) {
    next(error);
  }
};

// E of BREAD
const edit: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const dragonId = Number(req.params.dragonId);
  const trainingId = Number(req.params.trainingId);

  try {
    const dragonTraining: Omit<DragonTraining, "training_id"> = {
      id: trainingId,
      user_id: userId,
      dragon_id: dragonId,
      strength_earned: req.body.strength_earned,
      speed_earned: req.body.speed_earned,
      stamina_earned: req.body.stamina_earned,
    };

    const updateDragonTraining =
      await dragonTrainingRepository.update(dragonTraining);

    if (!updateDragonTraining) {
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
  const dragonId = Number(req.params.dragonId);

  try {
    const dragonTraining: Omit<DragonTraining, "id"> = {
      user_id: userId,
      dragon_id: dragonId,
      training_id: req.body.training_id,
      strength_earned: req.body.strength_earned,
      speed_earned: req.body.speed_earned,
      stamina_earned: req.body.stamina_earned,
    };

    const insertId = await dragonTrainingRepository.create(dragonTraining);

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

// D of BREAD
const destroy: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const dragonId = Number(req.params.dragonId);
  const trainingId = Number(req.params.trainingId);

  try {
    const success = await dragonTrainingRepository.destroy({
      userId,
      dragonId,
      trainingId,
    });

    if (!success) {
      res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };
