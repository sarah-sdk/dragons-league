import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../../schemas/authSchema";
import { generateToken } from "../../services/jwtServices";
import { comparePassword, hashPassword } from "../../services/passwordServices";
import authRepository from "./authRepository";

const register: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = registerSchema.validate(req.body);

    if (!email || !password) {
      res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const existingUser = await authRepository.getUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: "Cet email est déjà utilisé." });
    }

    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }

    const hashedPassword = await hashPassword(req.body.password);

    const newUser = await authRepository.create({
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin || false,
    });

    const token = generateToken(newUser.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600 * 1000,
    });

    res.status(201).json({ token, isAdmin: newUser.isAdmin });
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
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

    const token = generateToken(user.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600 * 1000,
    });

    res.status(200).json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    next(error);
  }
};

export default { register, login };
