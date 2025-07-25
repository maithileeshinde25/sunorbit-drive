import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import authService from "../Services/authService";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Login API call
      const response = await authService.login(formData.email, formData.password);

      if (response.success) {
        // Save token to localStorage
        localStorage.setItem("token", response.token);

        // Fetch user info
        const userInfo = await authService.getUser();
        setUser(userInfo);

        const role = userInfo.loggedUser?.role?.toLowerCase();

        // Redirect based on role
        if (role === "admin") {
          alert("Admin login successful");
          navigate("/admin");
        } else if (role === "candidate") {
          alert("Candidate login successful");
          navigate("/jobs");
        } else {
          alert("Unauthorized role");
        }
      } else {
        alert(response.msg || "Login failed");
      }
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
       
      }}
    >
      <div className="p-5 w-50 border bg-white" style={{ height: "500px" }}>
        <h2 className="text-center" style={{ color: "rgb(3, 56, 56)" }}>
          SIGN IN TO YOUR ACCOUNT
        </h2>
        <form className="p-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fs-4">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fs-4">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: "rgb(3, 56, 56)" }}
          >
            Login
          </button>

          <p className="mt-3">
            <Link to="/Register">Not registered?</Link> Create an Account
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
