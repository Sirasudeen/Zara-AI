// backend/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

interface JwtData {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Response {
      jwtData?: JwtData;
    }
  }
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies[COOKIE_NAME];

  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Access Denied: No Token Provided!" });
  }

  const jwtData = verifyToken(token);

  if (!jwtData) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  res.jwtData = jwtData;
  next();
};
