import path from "node:path";
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
  const specieId = Number(req.params.specieId);

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
  const specieId = Number(req.params.specieId);

  const currentSpecie = await specieRepository.read(specieId);

  try {
    const {
      specie,
      base_strength,
      base_speed,
      base_stamina,
      url_baby,
      url_adult,
    } = req.body;

    let babyUrl: string = url_baby;
    let adultUrl: string = url_adult;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files.babyImage?.[0]) {
      babyUrl = path.join("uploads", files.babyImage[0].filename);
    } else {
      babyUrl = currentSpecie.url_baby;
    }

    if (files.adultImage?.[0]) {
      adultUrl = path.join("uploads", files.adultImage[0].filename);
    } else {
      adultUrl = currentSpecie.url_adult;
    }

    const updateSpecie = {
      specie,
      base_strength: Number(base_strength),
      base_speed: Number(base_speed),
      base_stamina: Number(base_stamina),
      url_baby: babyUrl,
      url_adult: adultUrl,
      id: specieId,
    };

    const updatedSpecie = await specieRepository.update(updateSpecie);

    if (!updatedSpecie) {
      res.sendStatus(404);
    }

    res.status(200).json({ message: "Espèce mise à jour avec succès" });
  } catch (error) {
    next(error);
  }
};

// A of BREAD
const add: RequestHandler = async (req, res, next) => {
  try {
    const { specie, base_strength, base_speed, base_stamina } = req.body;

    if (!specie || !base_strength || !base_speed || !base_stamina) {
      res.status(400).json({ error: "Champ obligatoire manquant" });
    }

    let babyUrl: string | null = null;
    let adultUrl: string | null = null;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files.babyImage?.[0]) {
      babyUrl = path.join("uploads", files.babyImage[0].filename);
    } else {
      res.status(400).json({ error: "Image version bébé manquante" });
    }
    if (files.adultImage?.[0]) {
      adultUrl = path.join("uploads", files.adultImage[0].filename);
    } else {
      res.status(400).json({ error: "Image version adulte manquante" });
    }

    const newSpecie = {
      specie,
      base_strength: Number(base_strength),
      base_speed: Number(base_speed),
      base_stamina: Number(base_stamina),
      url_baby: babyUrl ?? "",
      url_adult: adultUrl ?? "",
    };

    const insertId = await specieRepository.create(newSpecie);

    res.status(201).json({ insertId, babyUrl, adultUrl });
  } catch (error) {
    next(error);
  }
};

// D of BREAD
const destroy: RequestHandler = async (req, res, next) => {
  const specieId = Number(req.params.specieId);

  try {
    const affectedRows = await specieRepository.destroy(specieId);

    if (affectedRows === 0) {
      res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };
