import { Router } from "express";
import { createJob, getJobs, getJobById } from "../controllers/job.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

// GET /api/jobs
router.get("/", getJobs);

// GET /api/jobs/:id
router.get("/:id", getJobById);

// POST /api/jobs (protected)
router.post("/", authMiddleware, createJob);

export default router;
