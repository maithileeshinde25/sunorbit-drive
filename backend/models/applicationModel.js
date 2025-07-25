import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  resumeLink: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String
  },
  appliedDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);
export default Application;
