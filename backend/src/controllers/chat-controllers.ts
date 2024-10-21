// backend/controllers/chat-controllers.ts

import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import User from '../models/User.js';
import { IUser } from '../interfaces/IUser.js';
import { IChat } from '../interfaces/IChat.js';
import { Types } from "mongoose"; 

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.jwtData?.id);
    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
    }

    const chatHistory = user.chats;

    chatHistory.push({ content: message, role: "user" });

    const response = await axios.post(process.env.RAG_SERVICE_URL!, {
      text: message,
      history: chatHistory.map((chat) => ({
        role: chat.role, 
        content: chat.content
      })),
      
    });

    const botMessage = response.data.data;

    chatHistory.push({ content: botMessage, role: "assistant" });
    user.chats = chatHistory;
    await user.save();

    return res.status(200).json({ chats: chatHistory });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.jwtData?.id);
    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
    }
    if (user._id.toString() !== res.jwtData?.id) {
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
): Promise<Response> => {
  try {
    const user: IUser | null = await User.findById(res.jwtData?.id).exec();

    if (!user) {
      return res.status(401).json({
        message: 'User not registered OR Token malfunctioned',
      });
    }

    if (user._id.toString() !== res.jwtData?.id) {
      return res.status(401).json({
        message: "Permissions didn't match",
      });
    }

    user.chats = [] as Types.DocumentArray<IChat>;
    await user.save();

    return res.status(200).json({
      message: 'OK',
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};
