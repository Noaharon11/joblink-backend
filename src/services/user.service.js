const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

async function registerUser(userData) {
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

  // Basic required fields check
  if (!name || !email || !password) {
    throw new Error("Name, email and password are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email is already in use");
    error.statusCode = 400;
    throw error;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user document
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    location,
    skills,
    experience,
    jobPreferences,
  });

  // Remove password before returning
  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
}

module.exports = {
  registerUser,
};
