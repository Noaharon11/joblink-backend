const express = require("express");
const app = express();
const port = 3000;

// --- Middleware ---
app.use(express.json());

// --- Routes imports ---
const jobsRouter = require("./src/routes/job.routes");

// --- Health check route ---
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "JobLink API",
  });
});

// --- Main API routes ---
app.use("/api/jobs", jobsRouter);

// --- Start server ---
app.listen(port, () => {
  console.log(`JobLink API listening at http://localhost:${port}`);
});
