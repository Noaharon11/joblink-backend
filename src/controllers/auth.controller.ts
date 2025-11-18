import { Request, Response } from "express";
import { login as loginService } from "../services/auth.service";

export async function login(req: Request, res: Response): Promise<Response> {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const result = await loginService(email, password);

    return res.status(200).json({
      success: true,
      data: {
        user: result.user,
        token: result.token,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error(
      "Error in login controller:",
      error instanceof Error ? error.message : error
    );

    const statusCode =
      (error as any)?.statusCode &&
      typeof (error as any).statusCode === "number"
        ? (error as any).statusCode
        : 400;

    const message = error instanceof Error ? error.message : "Failed to login";

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
}
