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

  try {
    const currentSpecie = await specieRepository.read(specieId);

    const { specie, baseStrength, baseSpeed, baseStamina, urlBaby, urlAdult } =
      req.body;

    let babyUrl: string = urlBaby;
    let adultUrl: string = urlAdult;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files.babyImage?.[0]) {
      babyUrl = path.join("uploads", files.babyImage[0].filename);
    } else {
      babyUrl = currentSpecie.urlBaby;
    }

    if (files.adultImage?.[0]) {
      adultUrl = path.join("uploads", files.adultImage[0].filename);
    } else {
      adultUrl = currentSpecie.urlAdult;
    }

    const updateSpecie: Specie = {
      specie,
      baseStrength: Number(baseStrength),
      baseSpeed: Number(baseSpeed),
      baseStamina: Number(baseStamina),
      urlBaby: babyUrl,
      urlAdult: adultUrl,
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
    const { specie, baseStrength, baseSpeed, baseStamina } = req.body;

    if (!specie || !baseStrength || !baseSpeed || !baseStamina) {
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

    const newSpecie: Omit<Specie, "id"> = {
      specie,
      baseStrength: Number(baseStrength),
      baseSpeed: Number(baseSpeed),
      baseStamina: Number(baseStamina),
      urlBaby: babyUrl ?? "",
      urlAdult: adultUrl ?? "",
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
