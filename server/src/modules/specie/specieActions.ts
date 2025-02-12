import type { RequestHandler } from "express";
import type { Specie } from "../../types/types";
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
const edit: RequestHandler = async (req, res, next) => {
  const specieId = Number(req.params.id);

  try {
    const specie: Specie = {
      specie: req.body.specie,
      base_strength: req.body.base_strength,
      base_speed: req.body.base_speed,
      base_stamina: req.body.base_stamina,
      url_baby: req.body.url_baby,
      url_adult: req.body.url_adult,
      id: specieId,
    };

    const updateSpecie = await specieRepository.update(specie);

    if (!updateSpecie) {
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
    const specie: Omit<Specie, "id"> = {
      specie: req.body.specie,
      base_strength: req.body.base_strength,
      base_speed: req.body.base_speed,
      base_stamina: req.body.base_stamina,
      url_baby: req.body.url_baby,
      url_adult: req.body.url_adult,
    };

    const insertId = await specieRepository.create(specie);

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

// D of BREAD
const destroy: RequestHandler = async (req, res, next) => {};

export default { browse, read, edit, add, destroy };
