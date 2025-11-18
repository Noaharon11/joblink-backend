require("dotenv").config(); // Load environment variables

const express = require("express");
const connectDB = require("./src/config/db");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes imports
const jobsRouter = require("./src/routes/job.routes");
const usersRouter = require("./src/routes/user.routes");
const authRouter = require("./src/routes/auth.routes");
const matchRouter = require("./src/routes/match.routes");

// Health check route
app.get("/health", (req, res) => {
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
    console.log(`JobLink API listening at http://localhost:${port}`);
  });
});
