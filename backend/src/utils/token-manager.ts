// backend/utils/token-manager.ts

import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

interface JwtData {
  id: string;
  email: string;
}

export const createToken = (id: string, email: string, expiresIn: string): string => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET!, { expiresIn });
};

export const verifyToken = (token: string): JwtData | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtData;
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
