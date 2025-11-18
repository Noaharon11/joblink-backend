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

// All likes of a user (not yet approved by employer)
async function getUserLikes(userId) {
  const matches = await Match.find({ userId, status: "like" }).populate(
    "jobId"
  );
  return matches;
}

// Confirmed mutual matches for a user
async function getUserMatches(userId) {
  const matches = await Match.find({ userId, status: "matched" }).populate(
    "jobId"
  );
  return matches;
}

// Employer approves a candidate for a specific match
async function approveMatch(employerId, matchId) {
  const match = await Match.findById(matchId);
  if (!match) {
    const error = new Error("Match not found");
    error.statusCode = 404;
    throw error;
  }

  const job = await Job.findById(match.jobId);
  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  // Ensure the employer is the creator of the job
  if (job.createdBy.toString() !== employerId.toString()) {
    const error = new Error(
      "You are not allowed to approve matches for this job"
    );
    error.statusCode = 403;
    throw error;
  }

  match.status = "matched";
  await match.save();

  return match;
}

// Employer can see all likes for a specific job
async function getJobLikesForEmployer(employerId, jobId) {
  const job = await Job.findById(jobId);
  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  if (job.createdBy.toString() !== employerId.toString()) {
    const error = new Error("You are not allowed to see likes for this job");
    error.statusCode = 403;
    throw error;
  }

  const matches = await Match.find({ jobId, status: "like" })
    .populate("userId")
    .populate("jobId");

  return matches;
}

module.exports = {
  likeJob,
  dislikeJob,
  getUserLikes,
  getUserMatches,
  approveMatch,
  getJobLikesForEmployer,
};
