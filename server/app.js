import dotenv from "dotenv"; // Import dotenv package
dotenv.config(); // Load the .env file
import express from "express";
const app = express();
import cors from "cors";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";

let corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/auth/api", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`server running on ${PORT}`);
});
