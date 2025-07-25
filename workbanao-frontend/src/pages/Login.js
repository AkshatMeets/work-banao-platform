import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../services/api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log("Sending login request with:", formData);
    try {
      const loginResponse = await api.post("/login", formData);
      console.log("Login response:", loginResponse.data);
      const { accessToken, refreshToken, role } = loginResponse.data;

      if (!role) {
        throw new Error("Role not provided in login response");
      }

      setAuthToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);

      console.log("User role:", role);
      if (role.toLowerCase() === "villager" || role === "VILLAGER") {
        console.log("Redirecting to /task-form");
        navigate("/task-form");
      } else if (role.toLowerCase() === "worker" || role === "WORKER") {
        console.log("Redirecting to /task-list");
        navigate("/task-list");
      } else {
        console.error("Unknown role:", role);
        setError("Unknown role. Please contact support.");
      }
    } catch (error) {
      console.error("Login error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      setError("Login failed. Please check your credentials or contact support.");
    }
  };

  return (
    <form onSubmit={handleSubmit} action ="/api/auth/login" method="POST">
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          autoComplete="email"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          autoComplete="current-password"
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;