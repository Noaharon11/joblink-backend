import bcrypt from "bcryptjs";
import User, { IUser, JobPreferences } from "../models/user.model";

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  location?: string;
  skills?: string[];
  experience?: string;
  jobPreferences?: JobPreferences;
}

export const registerUser = async (
  userData: RegisterUserInput
): Promise<any> => {
  const {
    name,
    email,
    password,
    phone,
    location,
    skills,
    experience,
    jobPreferences,
  } = userData;

  if (!name || !email || !password) {
    const error = new Error("Name, email and password are required");
    (error as any).statusCode = 400;
    throw error;
  }

  const existingUser: IUser | null = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("User with this email already exists");
    (error as any).statusCode = 409;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    location,
    skills: skills || [],
    experience,
    jobPreferences,
  });

  const userObject = newUser.toObject();
  delete (userObject as any).password;

  return userObject;
};
