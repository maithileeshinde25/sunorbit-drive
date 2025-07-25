import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} from "../controllers/jobController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", protect, isAdmin, createJob);
router.put("/:id", protect, isAdmin, updateJob);
router.delete("/:id", protect, isAdmin, deleteJob);

export default router;
