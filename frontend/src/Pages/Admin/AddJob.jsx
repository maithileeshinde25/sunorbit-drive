import React, { useState } from "react";
import axios from "axios";

const AddJob = ({ onJobAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "Full-time",
    salaryRange: "",
    description: "",
    companyName: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:7000/jobs", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Job created successfully");
      setFormData({
        title: "",
        location: "",
        type: "Full-time",
        salaryRange: "",
        description: "",
        companyName: "",
      });
      onJobAdded(); // 👉 trigger parent to refresh job list
    } catch (error) {
      console.error(error);
      alert("Error creating job");
    }
  };

  return (
    <div className="mb-4">
      <h3>Add New Job</h3>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">Add Job</button>
      </form>
    </div>
  );
};

export default AddJob;
