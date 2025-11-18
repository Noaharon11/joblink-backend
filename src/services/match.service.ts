import Match, { IMatch, MatchStatus } from "../models/match.model";
import Job from "../models/job.model";

export const likeJob = async (
  userId: string,
  jobId: string
): Promise<IMatch> => {
  const job = await Job.findById(jobId);
  if (!job) {
    const error = new Error("Job not found");
    (error as any).statusCode = 404;
    throw error;
  }

  let match = await Match.findOne({ userId, jobId });

  if (match) {
    match.status = "like";
    await match.save();
  } else {
    match = await Match.create({ userId, jobId, status: "like" });
  }

  return match;
};

export const dislikeJob = async (
  userId: string,
  jobId: string
): Promise<IMatch> => {
  const job = await Job.findById(jobId);
  if (!job) {
    const error = new Error("Job not found");
    (error as any).statusCode = 404;
    throw error;
  }

  let match = await Match.findOne({ userId, jobId });

  if (match) {
    match.status = "dislike";
    await match.save();
  } else {
    match = await Match.create({ userId, jobId, status: "dislike" });
  }

  return match;
};

export const getUserLikes = async (userId: string) => {
  return Match.find({ userId, status: "like" }).populate("jobId");
};

export const getUserMatches = async (userId: string) => {
  return Match.find({ userId, status: "matched" }).populate("jobId");
};

// Employer approves candidate → turns into "matched"
export const approveMatch = async (
  employerId: string,
  matchId: string
): Promise<IMatch> => {
  const match = await Match.findById(matchId);
  if (!match) {
    const error = new Error("Match not found");
    (error as any).statusCode = 404;
    throw error;
  }

  const job = await Job.findById(match.jobId);
  if (!job) {
    const error = new Error("Job not found");
    (error as any).statusCode = 404;
    throw error;
  }

  if (job.createdBy.toString() !== employerId) {
    const error = new Error("Not authorized to approve matches for this job");
    (error as any).statusCode = 403;
    throw error;
  }

  match.status = "matched";
  await match.save();

  return match;
};

export const getJobLikesForEmployer = async (
  employerId: string,
  jobId: string
) => {
  const job = await Job.findById(jobId);
  if (!job) {
    const error = new Error("Job not found");
    (error as any).statusCode = 404;
    throw error;
  }

  if (job.createdBy.toString() !== employerId) {
    const error = new Error("You are not allowed to see likes for this job");
    (error as any).statusCode = 403;
    throw error;
  }

  return Match.find({ jobId, status: "like" })
    .populate("userId")
    .populate("jobId");
};
