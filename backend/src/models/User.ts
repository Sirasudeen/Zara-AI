// src/models/User.ts

import mongoose, { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/IUser.js';
import { IChat } from '../interfaces/IChat.js';
import { randomUUID } from 'crypto';

const chatSchema: Schema<IChat> = new Schema({
  id: {
    type: String,
    default: () => randomUUID(),
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'assistant'], // Ensuring role is either 'user' or 'assistant'
  },
  content: {
    type: String,
    required: true,
  },
});

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Consider adding email validation here
  },
  password: {
    type: String,
    required: true,
  },
  chats: {
    type: [chatSchema],
    default: [],
  },
});

// Export the User model with the IUser interface
export default model<IUser>('User', userSchema);
