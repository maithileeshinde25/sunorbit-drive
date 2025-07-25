import Application from "../models/applicationModel.js";

 export const applyJob = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Job ID:", req.params.jobId);
    console.log("User ID:", req.user.id);

    const newApp = new Application({
      jobId: req.params.jobId, // Make sure this line is updated
      ...req.body,
      candidateId: req.user.id
    });

    await newApp.save();
    res.status(201).json({ message: "Applied successfully", application: newApp });
  } catch (err) {
    console.error("Apply Job Error:", err); // ⬅️ Add this line to see exact error in console
    res.status(500).json({ message: "Server Error" });
  }
};


export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ candidateId: req.user.id }).populate("jobId");
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
