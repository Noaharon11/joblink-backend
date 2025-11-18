import { Request, Response } from "express";
import User from "../models/user.model";
import * as userService from "../services/user.service";

// POST /api/users/register
export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const newUser = await userService.registerUser(userData);

    return res.status(201).json({
      success: true,
      data: newUser,
      message: "User registered successfully",
    });
  } catch (error: any) {
    console.error("Error in registerUser controller:", error.message);

    const statusCode = error.statusCode || 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to register user",
    });
  }
};

// GET /api/users/me (protected)
export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

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
  } catch (error: any) {
    console.error("Error in getMe controller:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user data",
    });
  }
};
