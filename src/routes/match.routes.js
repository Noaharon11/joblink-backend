const express = require("express");
const router = express.Router();
const matchController = require("../controllers/match.controller");
const authMiddleware = require("../middleware/auth.middleware");

// All match routes are protected
router.post("/like", authMiddleware, matchController.likeJob);
router.post("/dislike", authMiddleware, matchController.dislikeJob);

// Candidate views
router.get("/my-likes", authMiddleware, matchController.getMyLikes);
router.get("/my-matches", authMiddleware, matchController.getMyMatches);

// Employer views / actions
router.get("/job/:jobId/likes", authMiddleware, matchController.getJobLikes);
router.post("/approve/:id", authMiddleware, matchController.approveMatch);

module.exports = router;
