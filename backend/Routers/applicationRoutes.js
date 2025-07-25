import express from "express";
import { applyJob, getMyApplications } from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/apply/:jobId", protect, applyJob);
router.get("/my-applications", protect, getMyApplications);


export default router;
