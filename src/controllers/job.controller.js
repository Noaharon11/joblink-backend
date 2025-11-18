const jobService = require("../services/job.service");

// POST /api/jobs
async function createJob(req, res) {
  try {
    const userId = req.user.id; // from auth middleware
    const jobData = req.body;

    const job = await jobService.createJob(jobData, userId);

    return res.status(201).json({
      success: true,
      data: job,
      message: "Job created successfully",
    });
  } catch (error) {
    console.error("Error in createJob controller:", error.message);

    const statusCode = error.statusCode || 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to create job",
    });
  }
}

// GET /api/jobs
async function getJobs(req, res) {
  try {
    const filters = {
      location: req.query.location,
      type: req.query.type,
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
  } catch (error) {
    console.error("Error in getJobs controller:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
}

// GET /api/jobs/:id
async function getJobById(req, res) {
  try {
    const jobId = req.params.id;
    const job = await jobService.getJobById(jobId);

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Error in getJobById controller:", error.message);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to fetch job",
    });
  }
}

module.exports = {
  createJob,
  getJobs,
  getJobById,
};
