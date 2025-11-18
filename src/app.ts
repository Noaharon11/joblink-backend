import "dotenv/config";
import express, { Application, Request, Response } from "express";
import connectDB from "./config/db";

// Routers (currently written in JS, but TS can import them)
import jobsRouter from "./routes/job.routes";
import usersRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import matchRouter from "./routes/match.routes";

const app: Application = express();
const port = process.env.PORT || 3000;

// Global middlewares
app.use(express.json());

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "JobLink API",
  });
});

// Main API routes
app.use("/api/jobs", jobsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/match", matchRouter);

// Start server only after DB connection
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 JobLink API listening at http://localhost:${port}`);
  });
});
