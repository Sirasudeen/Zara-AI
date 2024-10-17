import { NextFunction, Request, Response } from "express";
import axios from "axios";
import User from "../models/User.js";

// src/controllers/chat-controllers.ts

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    // Retrieve the user from the database
    const user: IUser | null = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    }

    // Append the user's message to their chat history
    user.chats.push({ content: message, role: "user" });

    // Send the user's message to the Python microservice
    const response = await axios.post("http://localhost:5001/chat", {
      text: message,
    });

    // Get the assistant's response from the Python service
    const botMessage: string = response.data.data;

    // Append the assistant's response to the user's chat history
    user.chats.push({ content: botMessage, role: "assistant" });
    await user.save();

    // Return the updated chat history
    return res.status(200).json({ chats: user.chats });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};


export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Permissions didn't match" });
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Permissions didn't match" });
    }
    // Clear the user's chat history
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
