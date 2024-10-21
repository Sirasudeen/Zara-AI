import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
import dotenv from 'dotenv';
dotenv.config();

const COOKIE_OPTIONS = {
  path: "/",
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  httpOnly: true,
  signed: true,
  sameSite: "none" as const, // Corrected to lowercase 'none'
  secure: true,
   domain: process.env.BACKEND_URL, // Set this if needed
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get all users
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User signup
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered");

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Create token
    const token = createToken(user._id.toString(), user.email, "7d");

    // Set new cookie
    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);

    return res
      .status(201)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User login
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    // Create token
    const token = createToken(user._id.toString(), user.email, "7d");

    // Set new cookie
    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User logout
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    // Clear cookie
    res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
