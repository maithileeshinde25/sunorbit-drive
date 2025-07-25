// src/Services/authService.jsx
import axios from 'axios';

const BASE_URL = "http://localhost:7000";

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      // ✅ Return full response (token and success message)
      return {
        success: true,
        token,
        msg: response.data.msg || "Login successful",
      };
    } catch (error) {
      console.error("Login failed:", error.message);
      return {
        success: false,
        msg:
          error?.response?.data?.msg ||
          error.message ||
          "Login failed due to server error",
      };
    }
  },

  getUser: async () => {
    const token = localStorage.getItem("token");

    console.log("getUser function called from authService");

    if (!token) {
      console.warn("No token found in localStorage.");
      return null;
    }

    try {
      const response = await axios.get(`${BASE_URL}/users/getUserInfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched user data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user information:", error.message);
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

export default authService;
