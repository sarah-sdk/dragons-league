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
  try {
    const userId = Number(req.params.id);
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

export default { browse, read, add };
