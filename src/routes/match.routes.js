const express = require("express");
const router = express.Router();
const matchController = require("../controllers/match.controller");
const authMiddleware = require("../middleware/auth.middleware");

// All match routes are protected
router.post("/like", authMiddleware, matchController.likeJob);
router.post("/dislike", authMiddleware, matchController.dislikeJob);
router.get("/my-likes", authMiddleware, matchController.getMyLikes);

module.exports = router;
