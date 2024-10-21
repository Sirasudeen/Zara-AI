// src/controllers/chat-controllers.ts

import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import User from '../models/User.js';
import { IUser } from '../interfaces/IUser.js';
import { IChat } from '../interfaces/IChat.js';
import { Types } from "mongoose";



export const generateChatCompletion = async (req, res, next) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" })                      ;
    }

    // Load chat history from MongoDB
    const chatHistory = user.chats;

    // Append the new user message
    chatHistory.push({ content: message, role: "user" });

    // Send the chat message and full history to the RAG service
    const response = await axios.post(process.env.RAG_SERVICE_URL, {
      text: message,
      history: chatHistory.map((chat) => ({
        role: chat.role, 
        content: chat.content
      })),
      
    });

    const botMessage = response.data.data;

    // Append bot response to chat history and save to MongoDB
    chatHistory.push({ content: botMessage, role: "assistant" });
    user.chats = chatHistory;
    await user.save();

    return res.status(200).json({ chats: chatHistory });
  } catch (error) {
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
): Promise<Response> => {
  try {
    const user: IUser | null = await User.findById(res.locals.jwtData.id).exec();

    if (!user) {
      return res.status(401).json({
        message: 'User not registered OR Token malfunctioned',
      });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({
        message: "Permissions didn't match",
      });
    }

    // TypeScript should recognize user.chats as DocumentArray<IChat>
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

