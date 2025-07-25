
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import authService from "../Services/authService";
const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
    const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:7000/jobs', {
        params: { search }
      });
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [search]);
  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="container mt-5">
        <div className='d-flex justify-content-between'>
      <p className="mb-4 h4">Available Jobs</p>
  <button className="btn btn-danger mb-4"
   onClick={handleLogout}
   >
      Logout
    </button>
    </div>
      {/* Search Filter */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by job title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{job.title}</h5>
              <p className="card-text">{job.description.slice(0, 120)}...</p>
              <p className="text-muted small">{job.location} | {job.type}</p>
                        <p className="text-muted small">{job.salaryRange}</p>
              <Link to={`/jobs/${job._id}`} className="btn btn-outline-primary btn-sm mt-2">
                View & Apply
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllJobs;
