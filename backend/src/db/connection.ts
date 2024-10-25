// backend/db/connection.ts

import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URL;
  
  if (!mongoUri) {
    console.error("Error: MONGODB_URL environment variable is not defined.");
    process.exit(1); // Exit process with failure
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};
