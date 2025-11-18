const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const authMiddleware = require("../middleware/auth.middleware");

// GET /api/jobs
router.get("/", jobController.getJobs);

// GET /api/jobs/:id
router.get("/:id", jobController.getJobById);

// POST /api/jobs  (protected - only logged in users can create jobs)
router.post("/", authMiddleware, jobController.createJob);

module.exports = router;
