import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //if field is not available
  if (!name || !email || !password) {
    return res.json({ success: false, message: "all fields are required" });
  }
  //checking for existing user
  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return res.status(409).json({
      // 409 Conflict
      success: false,
      message: "email already existed",
    });
  }
  // creating new user
  const user = await User.create({
    name,
    email: normalizedEmail,
    password,
  });

  res.json({ success: true, message: "user created successfully", user });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //checking for fields
  if (!email || !password) {
    return res.json({ success: false, message: "all fields are required" });
  }
  //checking for user with email
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });
  const isMatched = await user.comparePassword(password);
  //if password is wrong
  if (!isMatched) {
    return res.json({ success: false, message: "incorrect email or password" });
  }
  //creating token
  const token = jwt.sign(
    { id: user._id, normalizedEmail },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h", // Default to 1 hour if not set
    }
  );

  //response
  res.status(200).json({
    success: true,
    message: "Login successfully",
    user,
    token,
  });
});
