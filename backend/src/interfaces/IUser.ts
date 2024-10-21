// src/interfaces/IUser.ts

import { Document, Types } from 'mongoose';
import { IChat } from './IChat.js';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  chats: Types.DocumentArray<IChat>;
}
