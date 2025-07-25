import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "",
    salaryRange: "",
    description: "",
    companyName: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      const res = await axios.get(`http://localhost:7000/jobs/${id}`);
      setFormData(res.data);
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:7000/jobs/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Job updated successfully");
      navigate("/admin/jobs");
    } catch (err) {
      alert("Error updating job");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Edit Job</h3>
      <form onSubmit={handleUpdate}>
        {["title", "location", "companyName", "salaryRange"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            className="form-control mb-2"
            value={formData[field]}
            onChange={handleChange}
            required
          />
        ))}
        <select name="type" className="form-control mb-2" value={formData.type} onChange={handleChange}>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          className="form-control mb-2"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">Update Job</button>
      </form>
    </div>
  );
};

export default EditJob;
