import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type MatchStatus = "like" | "dislike" | "matched";

export interface IMatch extends Document {
  userId: Types.ObjectId;
  jobId: Types.ObjectId;
  status: MatchStatus;
  createdAt: Date;
  updatedAt: Date;
}

const matchSchema = new Schema<IMatch>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    status: {
      type: String,
      enum: ["like", "dislike", "matched"],
      required: true,
    },
  },
  { timestamps: true }
);

const Match: Model<IMatch> = mongoose.model<IMatch>("Match", matchSchema);

export default Match;
