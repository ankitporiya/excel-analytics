//With animation
// Admin Panel
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { logout } from "../redux/userSlice";
import { getDashboardStats } from "../utils/adminApi";
import UserListModal from "../components/UserListModal";
import FileListModal from "../components/FileListModal";
import StorageModal from "../components/StorageModal";
import StorageDisplay from "../components/StorageDisplay";
import ChartAnalysis from "../components/ChartAnalysis";
import { LogOut } from "lucide-react";
const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFiles: 0,
    totalCharts: 0,
    activeSessions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [showStorageModal, setShowStorageModal] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const dashboardData = await getDashboardStats();
      setStats(dashboardData);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleUserDeleted = () => {
    fetchDashboardStats(); // Refresh stats when user is deleted
  };

  const handleFileDeleted = () => {
    fetchDashboardStats(); // Refresh stats when file is deleted
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #f8fff8 0%, #e6f3e6 100%)",
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.header
        className="bg-white shadow-lg"
        style={{
          backgroundColor: "#f0f8f0",
          boxShadow: "0 4px 12px rgba(34, 139, 34, 0.4)",
        }}
        variants={itemVariants}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <motion.h1
              className="text-xl sm:text-2xl font-bold"
              style={{ color: "#228B22" }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Excel Analytics - Admin Panel
            </motion.h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="text-left sm:text-right">
                <p className="font-semibold" style={{ color: "#228B22" }}>
                  {user?.name}
                </p>
                <p className="text-sm font-medium" style={{ color: "#228B22" }}>
                  Administrator
                </p>
              </div>
              <motion.button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto"
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
      <motion.main
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
      >
        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8"
          variants={containerVariants}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f0f8f0" }}
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#228B22" }}>
                  Total Users
                </p>
                <motion.p
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: "#0d0d0d" }}
                  key={stats.totalUsers}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {loading ? "..." : stats.totalUsers}
                </motion.p>
              </div>
              <motion.div
                className="text-2xl sm:text-3xl"
                style={{ color: "#90EE90" }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                👥
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f0f8f0" }}
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#228B22" }}>
                  Files Uploaded
                </p>
                <motion.p
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: "#0d0d0d" }}
                  key={stats.totalFiles}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {loading ? "..." : stats.totalFiles}
                </motion.p>
              </div>
              <motion.div
                className="text-2xl sm:text-3xl"
                style={{ color: "#90EE90" }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                📁
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 col-span-1 sm:col-span-2 lg:col-span-1"
            style={{ backgroundColor: "#f0f8f0" }}
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#228B22" }}>
                  Charts Created
                </p>
                <motion.p
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: "#0d0d0d" }}
                  key={stats.totalCharts}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {loading ? "..." : stats.totalCharts}
                </motion.p>
              </div>
              <motion.div
                className="text-2xl sm:text-3xl"
                style={{ color: "#90EE90" }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                📊
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Management Sections */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
        >
          {/* User Management */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f0f8f0" }}
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.h2
              className="text-lg sm:text-xl font-bold mb-4"
              style={{ color: "#0d0d0d" }}
              whileHover={{ color: "#228B22" }}
              transition={{ duration: 0.3 }}
            >
              User Management
            </motion.h2>
            <div className="space-y-4">
              <motion.div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b gap-2 sm:gap-0"
                style={{ borderColor: "#90EE90" }}
                whileHover={{ backgroundColor: "#f8fff8" }}
                transition={{ duration: 0.3 }}
              >
                <span style={{ color: "#228B22" }}>All Users</span>
                <motion.button
                  onClick={() => setShowUserModal(true)}
                  className="px-3 py-1 rounded text-sm font-medium transition-all duration-300 w-full sm:w-auto"
                  style={{ backgroundColor: "#228B22", color: "#f0f8f0" }}
                  whileHover={{
                    backgroundColor: "#32CD32",
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  View
                </motion.button>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b gap-2 sm:gap-0"
                style={{ borderColor: "#90EE90" }}
                whileHover={{ backgroundColor: "#f8fff8" }}
                transition={{ duration: 0.3 }}
              >
                <span style={{ color: "#228B22" }}>Recent Registrations</span>
                <motion.button
                  onClick={() => setShowUserModal(true)}
                  className="px-3 py-1 rounded text-sm font-medium transition-all duration-300 w-full sm:w-auto"
                  style={{ backgroundColor: "#228B22", color: "#f0f8f0" }}
                  whileHover={{
                    backgroundColor: "#32CD32",
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  View
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Data Management */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f0f8f0" }}
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.h2
              className="text-lg sm:text-xl font-bold mb-4"
              style={{ color: "#0d0d0d" }}
              whileHover={{ color: "#228B22" }}
              transition={{ duration: 0.3 }}
            >
              Data Management
            </motion.h2>
            <div className="space-y-4">
              <motion.div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b gap-2 sm:gap-0"
                style={{ borderColor: "#90EE90" }}
                whileHover={{ backgroundColor: "#f8fff8" }}
                transition={{ duration: 0.3 }}
              >
                <span style={{ color: "#228B22" }}>All Uploaded Files</span>
                <motion.button
                  onClick={() => setShowFileModal(true)}
                  className="px-3 py-1 rounded text-sm font-medium transition-all duration-300 w-full sm:w-auto"
                  style={{ backgroundColor: "#228B22", color: "#f0f8f0" }}
                  whileHover={{
                    backgroundColor: "#32CD32",
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Manage
                </motion.button>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b gap-2 sm:gap-0"
                style={{ borderColor: "#90EE90" }}
                whileHover={{ backgroundColor: "#f8fff8" }}
                transition={{ duration: 0.3 }}
              >
                <span style={{ color: "#228B22" }}>Storage Usage</span>
                <motion.button
                  onClick={() => setShowStorageModal(true)}
                  className="px-3 py-1 rounded text-sm font-medium transition-all duration-300 w-full sm:w-auto"
                  style={{ backgroundColor: "#228B22", color: "#f0f8f0" }}
                  whileHover={{
                    backgroundColor: "#32CD32",
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Monitor
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.main>

      {/* Modals */}
      <UserListModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onUserDeleted={handleUserDeleted}
      />
      <FileListModal
        isOpen={showFileModal}
        onClose={() => setShowFileModal(false)}
        onFileDeleted={handleFileDeleted}
      />
      <StorageModal
        isOpen={showStorageModal}
        onClose={() => setShowStorageModal(false)}
      />

      <StorageDisplay></StorageDisplay>
      <ChartAnalysis></ChartAnalysis>
    </motion.div>
  );
};

export default AdminPanel;
