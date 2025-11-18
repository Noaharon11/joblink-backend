import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  likeJob,
  dislikeJob,
  getMyLikes,
  getMyMatches,
  approveMatch,
  getJobLikes,
} from "../controllers/match.controller";

const router = Router();

router.post("/like", authMiddleware, likeJob);
router.post("/dislike", authMiddleware, dislikeJob);

router.get("/my-likes", authMiddleware, getMyLikes);
router.get("/my-matches", authMiddleware, getMyMatches);

router.get("/job/:jobId/likes", authMiddleware, getJobLikes);
router.post("/approve/:id", authMiddleware, approveMatch);

export default router;
