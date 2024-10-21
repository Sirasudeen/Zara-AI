import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables in development only
if (process.env.NODE_ENV !== "production") {
  import('dotenv').then(({ config }) => config());
}

const app = express();

// Security middleware
app.use(helmet());

// Determine CORS origin based on environment
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Use morgan only in development
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1", appRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
