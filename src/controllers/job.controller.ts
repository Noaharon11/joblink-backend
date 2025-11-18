import { Request, Response } from "express";
import * as jobService from "../services/job.service";

// POST /api/jobs
export const createJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const jobData = req.body;
    const job = await jobService.createJob(jobData, userId);

    return res.status(201).json({
      success: true,
      data: job,
      message: "Job created successfully",
    });
  } catch (error: any) {
    console.error("Error in createJob controller:", error.message);

    const statusCode = error.statusCode || 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to create job",
    });
  }
};

// GET /api/jobs
export const getJobs = async (req: Request, res: Response) => {
  try {
    const filters = {
      location: req.query.location as string | undefined,
      type: req.query.type as any,
      isActive:
        typeof req.query.isActive !== "undefined"
          ? req.query.isActive === "true"
          : undefined,
    };

    const jobs = await jobService.getAllJobs(filters);

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error: any) {
    console.error("Error in getJobs controller:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

// GET /api/jobs/:id
export const getJobById = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;

    const job = await jobService.getJobById(jobId);

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error: any) {
    console.error("Error in getJobById controller:", error.message);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to fetch job",
    });
  }
};
