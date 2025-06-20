//with amination
// src/pages/MainPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { motion } from "framer-motion";
import ExcelAnalyticsLanding from "../components/ExcelAnalyticsLanding";
import { LogOut } from "lucide-react";
const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const welcomeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #f8fff8 0%, #e6f3e6 50%, #f0f8f0 100%)",
      }}
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg"
        style={{
          backgroundColor: "#f0f8f0",
          boxShadow: "0 4px 12px rgba(34, 139, 34, 0.4)",
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.h1
              className="text-xl sm:text-2xl font-bold text-center sm:text-left"
              style={{ color: "#228B22" }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Excel Analytics - User Dashboard
            </motion.h1>
            <div className="flex items-center space-x-4">
              <div className="text-center sm:text-right">
                <p className="font-semibold" style={{ color: "#228B22" }}>
                  {user?.name}
                </p>
                <p className="text-sm" style={{ color: "#228B22" }}>
                  User
                </p>
              </div>
              <motion.button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
                style={{
                  backgroundColor: "#228B22",
                  color: "#f0f8f0",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#32CD32")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#228B22")
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-2">
                  <span>Logout</span>
                  <LogOut className="w-5 h-5" />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto my-center px-4 py-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Upload Excel File Card */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f0f8f0" }}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(34, 139, 34, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <motion.div
                className="text-4xl mb-4"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                📊
              </motion.div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#228B22" }}
              >
                Upload Excel File
              </h3>
              <p className="mb-4" style={{ color: "#228B22" }}>
                Upload your Excel files for analysis
              </p>
              <motion.button
                onClick={() => navigate("/upload")}
                className="w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-300"
                style={{ backgroundColor: "#228B22", color: "#f0f8f0" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#32CD32")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#228B22")
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Upload File
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f0f8f0" }}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(34, 139, 34, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <motion.div
                className="text-4xl mb-4"
                animate={{
                  y: [0, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                📁
              </motion.div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#228B22" }}
              >
                My Uploads
              </h3>
              <p className="mb-4" style={{ color: "#228B22" }}>
                Quickly Preview the Excel Uploads
              </p>
              <motion.button
                onClick={() => navigate("/myuploads")}
                className="w-full py-2 px-4 rounded-lg font-semibold border-2 transition-colors duration-300"
                style={{ borderColor: "#228B22", color: "#228B22" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#228B22";
                  e.target.style.color = "#f0f8f0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#228B22";
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                My Uploads
              </motion.button>
            </div>
          </motion.div>

          {/* Data Visualization Card */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f0f8f0" }}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(34, 139, 34, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <motion.div
                className="text-4xl mb-4"
                animate={{
                  y: [0, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                📈
              </motion.div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#228B22" }}
              >
                Create 2D Charts
              </h3>
              <p className="mb-4" style={{ color: "#228B22" }}>
                Visualize your data with interactive charts
              </p>
              <motion.button
                onClick={() => navigate("/charts")}
                className="w-full py-2 px-4 rounded-lg font-semibold border-2 transition-colors duration-300"
                style={{ borderColor: "#228B22", color: "#228B22" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#228B22";
                  e.target.style.color = "#f0f8f0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#228B22";
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Create 2D Chart
              </motion.button>
            </div>
          </motion.div>

          {/* ///////////////////////////////////// */}

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f0f8f0" }}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(34, 139, 34, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <motion.div
                className="text-4xl mb-4"
                animate={{
                  y: [0, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                ⚡
              </motion.div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#228B22" }}
              >
                Create 3D Charts
              </h3>
              <p className="mb-4" style={{ color: "#228B22" }}>
                Visualize your data with interactive charts
              </p>
              <motion.button
                onClick={() => navigate("/charts3d")}
                className="w-full py-2 px-4 rounded-lg font-semibold border-2 transition-colors duration-300"
                style={{ borderColor: "#228B22", color: "#228B22" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#228B22";
                  e.target.style.color = "#f0f8f0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#228B22";
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Create 3D Chart
              </motion.button>
            </div>
          </motion.div>

          {/* //////////////////// */}

          {/* Analysis History Card */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f0f8f0" }}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(34, 139, 34, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <motion.div
                className="text-4xl mb-4"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
              >
                📋
              </motion.div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#228B22" }}
              >
                Analysis History
              </h3>
              <p className="mb-4" style={{ color: "#228B22" }}>
                View Your Previous Analyses History
              </p>
              <motion.button
                onClick={() => navigate("/history")}
                className="w-full py-2 px-4 rounded-lg font-semibold border-2 transition-colors duration-300"
                style={{ borderColor: "#228B22", color: "#228B22" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#228B22";
                  e.target.style.color = "#f0f8f0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#228B22";
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                View History
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        <ExcelAnalyticsLanding></ExcelAnalyticsLanding>
      </main>
    </div>
  );
};

export default MainPage;
