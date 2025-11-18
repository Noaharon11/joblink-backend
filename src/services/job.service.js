const Job = require("../models/job.model");

async function createJob(jobData, userId) {
  const {
    title,
    company,
    description,
    location,
    type,
    salaryMin,
    salaryMax,
    requiredSkills,
  } = jobData;

  if (!title || !company || !description || !location) {
    const error = new Error(
      "Title, company, description and location are required"
    );
    error.statusCode = 400;
    throw error;
  }

  const job = await Job.create({
    title,
    company,
    description,
    location,
    type,
    salaryMin,
    salaryMax,
    requiredSkills,
    createdBy: userId,
  });

  return job;
}

async function getAllJobs(filters = {}) {
  const query = {};

  if (filters.location) {
    query.location = filters.location;
  }

  if (filters.type) {
    query.type = filters.type;
  }

  if (filters.isActive !== undefined) {
    query.isActive = filters.isActive;
  }

  const jobs = await Job.find(query).sort({ createdAt: -1 });
  return jobs;
}

async function getJobById(jobId) {
  const job = await Job.findById(jobId);

  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  return job;
}

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
};
