import type { RequestHandler } from "express";
import type { DragonTraining } from "../../types/types";
import dragonTrainingRepository from "./dragonTrainingRepository";

// B of BREAD
const browse: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const profileId = Number(req.params.profileId);
  const dragonId = Number(req.params.dragonId);

  try {
    const dragonTranings = await dragonTrainingRepository.readAll({
      userId,
      profileId,
      dragonId,
    });

    if (!dragonTranings) res.sendStatus(404);

    res.json(dragonTranings);
  } catch (error) {
    next(error);
  }
};

// R of BREAD
const read: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const profileId = Number(req.params.profileId);
  const dragonId = Number(req.params.dragonId);
  const trainingId = Number(req.params.trainingId);

  try {
    const dragonTraining = await dragonTrainingRepository.read({
      userId,
      profileId,
      dragonId,
      trainingId,
    });

    if (!dragonTraining) res.sendStatus(404);

    res.json(dragonTraining);
  } catch (error) {
    next(error);
  }
};

// E of BREAD
const edit: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const profileId = Number(req.params.profileId);
  const dragonId = Number(req.params.dragonId);
  const trainingId = Number(req.params.trainingId);

  try {
    const dragonTraining: Omit<DragonTraining, "trainingId"> = {
      id: trainingId,
      userId: userId,
      profileId: profileId,
      dragonId: dragonId,
      strengthEarned: req.body.strengthEarned,
      speedEarned: req.body.speedEarned,
      staminaEarned: req.body.staminaEarned,
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
  const profileId = Number(req.params.profileId);
  const dragonId = Number(req.params.dragonId);

  try {
    const dragonTraining: Omit<DragonTraining, "id"> = {
      userId: userId,
      profileId: profileId,
      dragonId: dragonId,
      trainingId: req.body.trainingId,
      strengthEarned: req.body.strengthEarned,
      speedEarned: req.body.speedEarned,
      staminaEarned: req.body.staminaEarned,
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
  const profileId = Number(req.params.profileId);
  const dragonId = Number(req.params.dragonId);
  const trainingId = Number(req.params.trainingId);

  try {
    const success = await dragonTrainingRepository.destroy({
      userId,
      profileId,
      dragonId,
      trainingId,
    });

    if (!success) res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };
