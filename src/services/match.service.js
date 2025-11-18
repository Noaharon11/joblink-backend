const Match = require("../models/match.model");
const Job = require("../models/job.model");

async function likeJob(userId, jobId) {
  // Ensure job exists
  const job = await Job.findById(jobId);
  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  // Check if match already exists
  let match = await Match.findOne({ userId, jobId });

  if (match) {
    match.status = "like";
    await match.save();
  } else {
    match = await Match.create({
      userId,
      jobId,
      status: "like",
    });
  }

  return match;
}

async function dislikeJob(userId, jobId) {
  // Ensure job exists
  const job = await Job.findById(jobId);
  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  // Check if match already exists
  let match = await Match.findOne({ userId, jobId });

  if (match) {
    match.status = "dislike";
    await match.save();
  } else {
    match = await Match.create({
      userId,
      jobId,
      status: "dislike",
    });
  }

  return match;
}

async function getUserMatches(userId) {
  const matches = await Match.find({ userId, status: "like" }).populate(
    "jobId"
  );
  return matches;
}

module.exports = {
  likeJob,
  dislikeJob,
  getUserMatches,
};
