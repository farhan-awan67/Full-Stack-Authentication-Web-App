import mongoose from "mongoose";
import dotenv from "dotenv"; // Import dotenv package

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Failed:", error.message); // Log error to console
    process.exit(1); // Exit process if connection fails (optional)
  }
};

export default connectDB;
