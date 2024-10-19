import { NextFunction, Request, Response } from "express";
import axios from "axios";
import User from "../models/User.js";


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
    const response = await axios.post("http://localhost:5001/chat", {
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
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
