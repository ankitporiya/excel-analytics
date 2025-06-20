// src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "../redux/userSlice";
import apiService from "../services/api";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setValidationError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    dispatch(loginStart());

    try {
      await apiService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // Auto login after registration
      const loginResponse = await apiService.login({
        email: formData.email,
        password: formData.password,
      });

      dispatch(loginSuccess(loginResponse));

      // Navigate based on role
      if (loginResponse.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/main");
      }
    } catch (error) {
      dispatch(loginFailure(error.message || "Registration failed"));
    }
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #f8fff8 0%, #e6f3e6 50%, #f0f8f0 100%)",
      }}
    >
      <div
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        style={{
          backgroundColor: "#f8fff8",
          boxShadow: "0 20px 40px rgba(34, 139, 34, 0.1)",
        }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold" style={{ color: "#228B22" }}>
            Create Account
          </h2>
          <p className="mt-2" style={{ color: "#228B22" }}>
            Join us today
          </p>
        </div>

        {(error || validationError) && (
          <div className="mb-4 p-3 rounded bg-red-100 border border-red-400 text-red-700">
            {error || validationError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#228B22" }}
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md"
              style={{
                borderColor: "#90EE90",
                focusRingColor: "#32CD32",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#32CD32";
                e.target.style.boxShadow = "0 0 0 3px rgba(50, 205, 50, 0.2)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#90EE90";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "translateY(0)";
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#228B22" }}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md"
              style={{
                borderColor: "#90EE90",
                focusRingColor: "#32CD32",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#32CD32";
                e.target.style.boxShadow = "0 0 0 3px rgba(50, 205, 50, 0.2)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#90EE90";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "translateY(0)";
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#228B22" }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md"
              style={{
                borderColor: "#90EE90",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#32CD32";
                e.target.style.boxShadow = "0 0 0 3px rgba(50, 205, 50, 0.2)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#90EE90";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "translateY(0)";
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#228B22" }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md"
              style={{
                borderColor: "#90EE90",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#32CD32";
                e.target.style.boxShadow = "0 0 0 3px rgba(50, 205, 50, 0.2)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#90EE90";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "translateY(0)";
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#228B22" }}
            >
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md"
              style={{
                borderColor: "#90EE90",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#32CD32";
                e.target.style.boxShadow = "0 0 0 3px rgba(50, 205, 50, 0.2)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#90EE90";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            style={{ backgroundColor: loading ? "#90EE90" : "#228B22" }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = "#32CD32";
                e.target.style.transform = "translateY(-2px) scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = "#228B22";
                e.target.style.transform = "translateY(0) scale(1)";
              }
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p style={{ color: "#228B22" }}>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold hover:underline"
              style={{ color: "#32CD32" }}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
