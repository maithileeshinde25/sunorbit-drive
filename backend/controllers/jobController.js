import Job from "../models/jobModel.js";

export const createJob = async (req, res) => {
  try {
    const newJob = new Job({ ...req.body, createdBy: req.user.id });
    await newJob.save();
    res.status(201).json({ message: "Job created", job: newJob });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const { location, type, salaryMin, salaryMax, search, page = 1, limit = 5 } = req.query;

    let filter = {};
    if (location) filter.location = location;
    if (type) filter.type = type;
    if (search) filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
    if (salaryMin || salaryMax) {
      filter.salaryRange = { $gte: salaryMin || 0, $lte: salaryMax || 10000000 };
    }

    const jobs = await Job.find(filter)
      .sort({ postedDate: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
