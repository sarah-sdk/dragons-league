import type { RequestHandler } from "express";
import type { User } from "../../types/types";
import userRepository from "./userRepository";

// B of BREAD
const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();

    if (!users) {
      res.sendStatus(404);
    }

    res.json(users);
  } catch (error) {
    next(error);
  }
};

// R of BREAD
const read: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.id);

  try {
    const user = await userRepository.read(userId);

    if (!user) {
      res.sendStatus(404);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// E of BREAD
const edit: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.id);

  try {
    const user: User = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      id: userId,
    };

    const updateUser = await userRepository.update(user);

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
    const user: Omit<User, "id"> = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const insertId = await userRepository.create(user);

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

// D of BREAD

export default { browse, read, edit, add };
