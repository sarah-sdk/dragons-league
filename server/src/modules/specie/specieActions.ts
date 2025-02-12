import type { RequestHandler } from "express";
import specieRepository from "./specieRepository";

// B of BREAD
const browse: RequestHandler = async (req, res, next) => {
  try {
    const species = await specieRepository.readAll();

    if (!species) {
      res.sendStatus(404);
    }

    res.json(species);
  } catch (error) {
    next(error);
  }
};

// R of BREAD
const read: RequestHandler = async (req, res, next) => {
  const specieId = Number(req.params.id);

  try {
    const specie = await specieRepository.read(specieId);

    if (!specie) {
      res.sendStatus(404);
    }

    res.json(specie);
  } catch (error) {
    next(error);
  }
};

// E of BREAD
const edit: RequestHandler = async (req, res, next) => {};

// A of BREAD
const add: RequestHandler = async (req, res, next) => {};

// D of BREAD
const destroy: RequestHandler = async (req, res, next) => {};

export default { browse, read, edit, add, destroy };
