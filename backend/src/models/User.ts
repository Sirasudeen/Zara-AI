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
    enum: ['user', 'assistant'], 
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

export default model<IUser>('User', userSchema);
