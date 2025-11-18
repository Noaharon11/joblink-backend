import { Request, Response } from "express";
import * as matchService from "../services/match.service";

export const likeJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id!;
    const { jobId } = req.body;

    const match = await matchService.likeJob(userId, jobId);

    return res.status(200).json({
      success: true,
      data: match,
    });
  } catch (error: any) {
    console.error("Error in likeJob:", error.message);

    return res.status(error.statusCode || 400).json({
      success: false,
      message: error.message,
    });
  }
};

export const dislikeJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id!;
    const { jobId } = req.body;

    const match = await matchService.dislikeJob(userId, jobId);

    return res.status(200).json({
      success: true,
      data: match,
    });
  } catch (error: any) {
    console.error("Error in dislikeJob:", error.message);

    return res.status(error.statusCode || 400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyLikes = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id!;
    const matches = await matchService.getUserLikes(userId);

    return res.status(200).json({ success: true, data: matches });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyMatches = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id!;
    const matches = await matchService.getUserMatches(userId);

    return res.status(200).json({ success: true, data: matches });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const approveMatch = async (req: Request, res: Response) => {
  try {
    const employerId = req.user?.id!;
    const matchId = req.params.id;

    const match = await matchService.approveMatch(employerId, matchId);

    return res.status(200).json({
      success: true,
      data: match,
      message: "Match approved",
    });
  } catch (error: any) {
    return res.status(error.statusCode || 400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getJobLikes = async (req: Request, res: Response) => {
  try {
    const employerId = req.user?.id!;
    const jobId = req.params.jobId;

    const likes = await matchService.getJobLikesForEmployer(employerId, jobId);

    return res.status(200).json({ success: true, data: likes });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
