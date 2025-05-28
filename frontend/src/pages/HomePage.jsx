// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100"
      style={{
        background: "linear-gradient(135deg, #bde8f1 0%, #f2f2f0 100%)",
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: "#0d0d0d" }}
          >
            Excel Analytics Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8" style={{ color: "#5b6e74" }}>
            Transform your Excel data into powerful insights
          </p>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#819fa7" }}>
            Upload, analyze, and visualize your Excel data with advanced
            charting capabilities and AI-powered insights.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-md mx-auto">
          <button
            onClick={() => navigate("/login")}
            className="w-full md:w-auto px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: "#5b6e74",
              color: "#f2f2f0",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#819fa7")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#5b6e74")}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full md:w-auto px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            style={{
              borderColor: "#5b6e74",
              color: "#5b6e74",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#5b6e74";
              e.target.style.color = "#f2f2f0";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#5b6e74";
            }}
          >
            Register
          </button>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div
            className="text-center p-6 rounded-lg"
            style={{ backgroundColor: "rgba(189, 232, 241, 0.3)" }}
          >
            <div className="text-3xl mb-4">📊</div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "#0d0d0d" }}
            >
              Data Visualization
            </h3>
            <p style={{ color: "#819fa7" }}>
              Create stunning charts and graphs from your Excel data
            </p>
          </div>

          <div
            className="text-center p-6 rounded-lg"
            style={{ backgroundColor: "rgba(189, 232, 241, 0.3)" }}
          >
            <div className="text-3xl mb-4">🤖</div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "#0d0d0d" }}
            >
              AI Insights
            </h3>
            <p style={{ color: "#819fa7" }}>
              Get intelligent analysis and recommendations
            </p>
          </div>

          <div
            className="text-center p-6 rounded-lg"
            style={{ backgroundColor: "rgba(189, 232, 241, 0.3)" }}
          >
            <div className="text-3xl mb-4">📈</div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "#0d0d0d" }}
            >
              Advanced Analytics
            </h3>
            <p style={{ color: "#819fa7" }}>
              Perform complex data analysis with ease
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
