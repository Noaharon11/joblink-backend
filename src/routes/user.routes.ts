import { Router } from "express";
import { registerUser, getMe } from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

// POST /api/users/register
router.post("/register", registerUser);

// GET /api/users/me (protected)
router.get("/me", authMiddleware, getMe);

export default router;
