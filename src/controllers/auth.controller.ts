const authService = require("../services/auth.service");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    return res.status(200).json({
      success: true,
      data: {
        user: result.user,
        token: result.token,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);

    const statusCode = error.statusCode || 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to login",
    });
  }
}

module.exports = {
  login,
};
