import type { RequestHandler } from "express";
import type { Profile } from "../../types/types";
import profileRepository from "./profileRepository";

// B of BREAD
const browse: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);

  try {
    const profiles = await profileRepository.readAll(userId);

    if (!profiles) res.sendStatus(404);

    res.json(profiles);
  } catch (error) {
    next(error);
  }
};

// R of BREAD
const read: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const profileId = Number(req.params.profileId);

  try {
    const profile = await profileRepository.read({ userId, profileId });

    if (!profile) res.sendStatus(404);

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

// E of BREAD
const edit: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const profileId = Number(req.params.profileId);

  try {
    const profile: Profile = {
      userId: userId,
      id: profileId,
      username: req.body.username,
      urlAvatar: req.body.urlAvatar,
    };

    const updateProfile = await profileRepository.update(profile);

    if (!updateProfile) res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// A of BREAD
const add: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);

  try {
    const profile: Omit<Profile, "id"> = {
      userId: userId,
      username: req.body.username,
      urlAvatar: req.body.urlAvatar,
    };

    const insertId = await profileRepository.create(profile);

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

// D of BREAD
const destroy: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  const profileId = Number(req.params.profileId);

  try {
    const affectedRows = await profileRepository.destroy({ userId, profileId });

    if (affectedRows === 0) {
      res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };
