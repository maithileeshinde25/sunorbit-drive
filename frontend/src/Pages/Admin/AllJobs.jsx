import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllJobs = ({ jobs, onDelete }) => {
  const navigate = useNavigate();

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:7000/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(); // refresh job list
    } catch (err) {
      alert("Error deleting job");
    }
  };

  return (
    <div className="mt-4">
      <h3>All Jobs</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Type</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job.title}</td>
              <td>{job.companyName}</td>
              <td>{job.location}</td>
              <td>{job.type}</td>
              <td>{job.salaryRange}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => navigate(`/admin/edit-job/${job._id}`)}>Edit</button>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => deleteJob(job._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllJobs;
