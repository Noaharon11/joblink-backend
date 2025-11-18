import bcrypt from "bcryptjs";
import User from "../models/user.model";
import jwt, { SignOptions, Secret } from "jsonwebtoken";

interface LoginResult {
  user: any;
  token: string;
}

function generateAccessToken(userId: string): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const expiresInEnv = process.env.JWT_EXPIRES_IN || "1h";

  const options: SignOptions = {
    expiresIn: expiresInEnv as SignOptions["expiresIn"],
  };

  return jwt.sign({ userId }, secret as Secret, options);
}

export async function login(
  email: string,
  password: string
): Promise<LoginResult> {
  if (!email || !password) {
    const error = new Error("Email and password are required");
    (error as any).statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Invalid email or password");
    (error as any).statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, (user as any).password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    (error as any).statusCode = 401;
    throw error;
  }

  const token = generateAccessToken(user._id.toString());

  const userObject = user.toObject();
  delete (userObject as any).password;

  return {
    user: userObject,
    token,
  };
}
