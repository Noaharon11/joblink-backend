const mongoose = require("mongoose");

// Embedded schema for job preferences
const jobPreferencesSchema = new mongoose.Schema(
  {
    desiredRole: { type: String },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "student", "freelance"],
    },
    workMode: {
      type: String,
      enum: ["onsite", "remote", "hybrid"],
    },
    salaryMin: { type: Number },
    salaryMax: { type: Number },
  },
  { _id: false } // Prevent creation of an internal _id for this subdocument
);

// Main User Schema
const userSchema = new mongoose.Schema(
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
      required: true, // Will be hashed using bcrypt later
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    experience: {
      type: String, // Free text field describing experience
    },
    resumeUrl: {
      type: String, // Link to stored CV file (e.g. S3, local storage)
    },
    resumeText: {
      type: String, // Extracted text from CV (future feature)
    },
    jobPreferences: jobPreferencesSchema,
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Model export
const User = mongoose.model("User", userSchema);

module.exports = User;
