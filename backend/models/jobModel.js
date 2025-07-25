import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  salaryRange: { type: String, required: true },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship"],
    required: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;
