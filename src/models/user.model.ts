import mongoose, { Schema, Document, Model } from "mongoose";

export interface JobPreferences {
  desiredRole?: string;
  employmentType?: string;
  workMode?: string;
  salaryMin?: number;
  salaryMax?: number;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  location?: string;
  skills: string[];
  experience?: string;
  jobPreferences?: JobPreferences;
  createdAt: Date;
  updatedAt: Date;
}

const jobPreferencesSchema = new Schema<JobPreferences>(
  {
    desiredRole: {
      type: String,
      trim: true,
    },
    employmentType: {
      type: String,
      trim: true,
    },
    workMode: {
      type: String,
      trim: true,
    },
    salaryMin: {
      type: Number,
    },
    salaryMax: {
      type: Number,
    },
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    experience: {
      type: String,
      trim: true,
    },
    jobPreferences: jobPreferencesSchema,
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
