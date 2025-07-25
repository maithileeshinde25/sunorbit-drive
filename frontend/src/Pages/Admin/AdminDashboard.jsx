import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../Services/authService";
import AllJobs from "./AllJobs";
import AddJob from "./AddJob";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [showAddJobForm, setShowAddJobForm] = useState(false); // Toggle state

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:7000/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJobClick = () => {
    setShowAddJobForm(!showAddJobForm); 
  };

  return (
    <div className="container mt-5">
      <h2>Welcome Admin</h2>
      <p>Use this dashboard to manage job posts, view candidates, etc.</p>

     <div className="mt-4">
  <div className="d-flex gap-3 mb-3">
    <button className="btn btn-success" onClick={handleAddJobClick}>
      {showAddJobForm ? "Close Add Job Form" : "Add New Job"}
    </button>

    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  </div>

  {showAddJobForm && (
    <AddJob
      onJobAdded={() => {
        fetchJobs();
        setShowAddJobForm(false); // Hide form after job added
      }}
    />
  )}

  <AllJobs jobs={jobs} onDelete={fetchJobs} />
</div>

    </div>
  );
};

export default AdminDashboard;
