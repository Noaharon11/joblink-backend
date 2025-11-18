const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
