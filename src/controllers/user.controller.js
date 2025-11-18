const userService = require("../services/user.service");
const User = require("../models/user.model");

// POST /api/users/register
async function registerUser(req, res) {
  try {
    const userData = req.body;
    const newUser = await userService.registerUser(userData);

    return res.status(201).json({
      success: true,
      data: newUser,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error in registerUser controller:", error.message);

    const statusCode = error.statusCode || 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to register user",
    });
  }
}

// GET /api/users/me (protected)
async function getMe(req, res) {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error in getMe controller:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user data",
    });
  }
}

module.exports = {
  registerUser,
  getMe,
};
