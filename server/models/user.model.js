import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  verifyOtp: {
    type: String,
    default: "",
  },
  verifyOtpExpiresAt: {
    type: Number,
    default: 0,
  },
  resetOtp: {
    type: String,
    default: "",
  },
  resetOtpExpiresAt: {
    type: Number,
    default: 0,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const isCorrect = await bcrypt.compare(password, this.password);
  return isCorrect;
};

export const User = mongoose.model("User", userSchema);
