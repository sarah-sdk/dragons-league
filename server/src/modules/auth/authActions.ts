import type { RequestHandler } from "express";
import { loginSchema, registerSchema } from "../../schemas/authSchema";
import { comparePassword, hashPassword } from "../../services/passwordServices";
import authRepository from "./authRepository";

const register: RequestHandler = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }

    const hashedPassword = await hashPassword(req.body.password);

    const newUser = await authRepository.create({
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin || false,
    });

    res
      .sendStatus(201)
      .json({ email: newUser.email, isAdmin: newUser.isAdmin });
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }

    const user = await authRepository.getUserByEmail(req.body.email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await comparePassword(
      req.body.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export default { register, login };
