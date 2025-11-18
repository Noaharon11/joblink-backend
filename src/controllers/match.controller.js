const matchService = require("../services/match.service");

// POST /api/match/like
async function likeJob(req, res) {
  try {
    const userId = req.user.id;
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "jobId is required",
      });
    }

    const match = await matchService.likeJob(userId, jobId);

    return res.status(200).json({
      success: true,
      data: match,
      message: "Job liked successfully",
    });
  } catch (error) {
    console.error("Error in likeJob controller:", error.message);

    const statusCode = error.statusCode || 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to like job",
    });
  }
}

// POST /api/match/dislike
async function dislikeJob(req, res) {
  try {
    const userId = req.user.id;
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "jobId is required",
      });
    }

    const match = await matchService.dislikeJob(userId, jobId);

    return res.status(200).json({
      success: true,
      data: match,
      message: "Job disliked successfully",
    });
  } catch (error) {
    console.error("Error in dislikeJob controller:", error.message);

    const statusCode = error.statusCode || 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to dislike job",
    });
  }
}

// GET /api/match/my-likes
async function getMyLikes(req, res) {
  try {
    const userId = req.user.id;
    const matches = await matchService.getUserLikes(userId);

    return res.status(200).json({
      success: true,
      data: matches,
    });
  } catch (error) {
    console.error("Error in getMyLikes controller:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch likes",
    });
  }
}

// GET /api/match/my-matches
async function getMyMatches(req, res) {
  try {
    const userId = req.user.id;
    const matches = await matchService.getUserMatches(userId);

    return res.status(200).json({
      success: true,
      data: matches,
    });
  } catch (error) {
    console.error("Error in getMyMatches controller:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch matches",
    });
  }
}

// POST /api/match/approve/:id
async function approveMatch(req, res) {
  try {
    const employerId = req.user.id;
    const matchId = req.params.id;

    const match = await matchService.approveMatch(employerId, matchId);

    return res.status(200).json({
      success: true,
      data: match,
      message: "Match approved successfully",
    });
  } catch (error) {
    console.error("Error in approveMatch controller:", error.message);

    const statusCode = error.statusCode || 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to approve match",
    });
  }
}

// GET /api/match/job/:jobId/likes
async function getJobLikes(req, res) {
  try {
    const employerId = req.user.id;
    const jobId = req.params.jobId;

    const matches = await matchService.getJobLikesForEmployer(
      employerId,
      jobId
    );

    return res.status(200).json({
      success: true,
      data: matches,
    });
  } catch (error) {
    console.error("Error in getJobLikes controller:", error.message);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to fetch job likes",
    });
  }
}

module.exports = {
  likeJob,
  dislikeJob,
  getMyLikes,
  getMyMatches,
  approveMatch,
  getJobLikes,
};
