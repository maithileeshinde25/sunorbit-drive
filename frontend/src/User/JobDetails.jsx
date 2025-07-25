// pages/user/JobDetails.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [resumeLink, setResumeLink] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/jobs/${jobId}`);
        setJob(res.data);
      } catch (err) {
        console.error('Error fetching job details', err);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:7000/applications/apply/${jobId}`,
        { resumeLink, coverLetter },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
    } catch (err) {
      console.error('Error applying for job', err);
      setMessage('Failed to apply');
    }
  };

  if (!job) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title h4">{job.title}</h2>
          <p className="card-text">{job.description}</p>
          <p className="text-muted">{job.location} | {job.type}</p>

          <hr />

          <h5 className="mt-4">Apply for this job</h5>
          <form onSubmit={handleApply}>
            <div className="mb-3">
              <label className="form-label">Resume Link</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter resume link"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Cover Letter</label>
              <textarea
                className="form-control"
                placeholder="Write your cover letter (optional)"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows="4"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Application
            </button>
          </form>

          {message && (
            <div className="alert alert-info mt-4" role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
