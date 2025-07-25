import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import userRoutes from "./Routers/UserRouter.js";
import jobRoutes from "./Routers/jobRoutes.js";
import applicationRoutes from "./Routers/applicationRoutes.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);
app.use("/applications", applicationRoutes);



// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
