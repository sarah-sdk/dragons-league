import type { RequestHandler } from "express";
import type { Training } from "../../types/types";
import trainingRepository from "./trainingRepository";

// B of BREAD
const browse: RequestHandler = async (req, res, next) => {
  try {
    const trainings = await trainingRepository.readAll();

    if (!trainings) {
      res.sendStatus(404);
    }

    res.json(trainings);
  } catch (error) {
    next(error);
  }
};

// R of BREAD
const read: RequestHandler = async (req, res, next) => {
  const trainingId = Number(req.params.trainingId);

  try {
    const training = await trainingRepository.read(trainingId);

    if (!training) {
      res.sendStatus(404);
    }

    res.json(training);
  } catch (error) {
    next(error);
  }
};

// E of BREAD
const edit: RequestHandler = async (req, res, next) => {
  const trainingId = Number(req.params.trainingId);

  try {
    const training: Training = {
      type: req.body.type,
      id: trainingId,
    };

    const updateTraining = await trainingRepository.update(training);

    if (!updateTraining) {
      res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// A of BREAD
const add: RequestHandler = async (req, res, next) => {
  try {
    const training: Omit<Training, "id"> = {
      type: req.body.type,
    };

    const insertId = await trainingRepository.create(training);

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

// D of BREAD
const destroy: RequestHandler = async (req, res, next) => {
  const trainingId = Number(req.params.trainingId);

  try {
    const affectedRows = await trainingRepository.destroy(trainingId);

    if (affectedRows === 0) {
      res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };
