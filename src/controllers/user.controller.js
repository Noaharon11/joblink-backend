const userService = require("../services/user.service");

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

module.exports = {
  registerUser,
};
