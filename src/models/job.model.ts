import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type JobType =
  | "full-time"
  | "part-time"
  | "student"
  | "freelance"
  | "intern";

export interface IJob extends Document {
  title: string;
  company: string;
  description: string;
  location: string;
  type: JobType;
  salaryMin?: number;
  salaryMax?: number;
  requiredSkills: string[];
  createdBy: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["full-time", "part-time", "student", "freelance", "intern"],
      default: "full-time",
    },
    salaryMin: {
      type: Number,
    },
    salaryMax: {
      type: Number,
    },
    requiredSkills: [
      {
        type: String,
        trim: true,
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job: Model<IJob> = mongoose.model<IJob>("Job", jobSchema);

export default Job;
