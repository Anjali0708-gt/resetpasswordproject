import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./route/authroute.js";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));

// Middleware
app.use(express.json());

// Connect to MongoDB using .env
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log(" DB Connected"))
  .catch((err) => console.error(" DB Error:", err));

// Routes
app.use("/api/auth", router);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
