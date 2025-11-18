const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

// POST /api/users/register
router.post("/register", userController.registerUser);

// GET /api/users/me (protected)
router.get("/me", authMiddleware, userController.getMe);

module.exports = router;
