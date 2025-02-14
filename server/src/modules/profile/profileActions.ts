import type { RequestHandler } from "express";
import type { Profile } from "../../types/types";
import profileRepository from "./profileRepository";

// B of BREAD
const browse: RequestHandler = async (req, res, next) => {
  try {
    const profiles = await profileRepository.readAll();

    if (!profiles) {
      res.sendStatus(404);
    }

    res.json(profiles);
  } catch (error) {
    next(error);
  }
};

// R of BREAD
const read: RequestHandler = async (req, res, next) => {
  const profileId = Number(req.params.id);

  try {
    const profile = await profileRepository.read(profileId);

    if (!profile) {
      res.sendStatus(404);
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

// E of BREAD
const edit: RequestHandler = async (req, res, next) => {
  const profileId = Number(req.params.id);

  try {
    const profile: Profile = {
      username: req.body.username,
      url_avatar: req.body.url_avatar,
      id: profileId,
    };

    const updateUser = await profileRepository.update(profile);

    if (!updateUser) {
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
    const profile: Omit<Profile, "id"> = {
      username: req.body.username,
      url_avatar: req.body.url_avatar,
    };

    const insertId = await profileRepository.create(profile);

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

// D of BREAD
const destroy: RequestHandler = async (req, res, next) => {
  const profileId = Number(req.params.id);

  try {
    const affectedRows = await profileRepository.destroy(profileId);

    if (affectedRows === 0) {
      res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };
