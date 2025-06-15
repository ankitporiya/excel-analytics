// // with animation
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getStorageUsage } from "../utils/adminApi";
import FileDistributionChart from "../components/FileDistributionChart";
import { RefreshCw } from "lucide-react";
const StorageDisplay = () => {
  const [storageData, setStorageData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStorageUsage();
  }, []);

  const fetchStorageUsage = async () => {
    setLoading(true);
    try {
      const data = await getStorageUsage();
      setStorageData(data);
    } catch (error) {
      console.error("Error fetching storage usage:", error);
      alert("Failed to fetch storage usage");
    } finally {
      setLoading(false);
    }
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
    <div
      style={{
        background: "linear-gradient(135deg, #f8fff8 0%, #e6f3e6 100%)",
        minHeight: "100vh",
      }}
    >
      <motion.div
        className="container mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="mb-6" variants={itemVariants}>
          <h2
            className="text-xl sm:text-2xl font-bold"
            style={{ color: "#0d0d0d" }}
          >
            Storage Usage
          </h2>
          <p className="text-sm mt-1" style={{ color: "#228B22" }}>
            Monitor your system's storage consumption
          </p>
        </motion.div>

        {loading ? (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-4xl sm:text-6xl mb-4"
              style={{ color: "#90EE90" }}
              // animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ⏳
            </motion.div>
            <p className="text-base sm:text-lg" style={{ color: "#228B22" }}>
              Loading storage information...
            </p>
          </motion.div>
        ) : storageData ? (
          <motion.div variants={containerVariants}>
            {/* Storage Overview Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
              variants={containerVariants}
            >
              {/* Total Storage Used */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6"
                style={{ backgroundColor: "#f0f8f0" }}
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-xs sm:text-sm font-medium"
                      style={{ color: "#228B22" }}
                    >
                      Total Storage Used
                    </p>
                    <motion.p
                      className="text-2xl sm:text-3xl font-bold"
                      style={{ color: "#0d0d0d" }}
                      key={storageData.formattedSize}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {storageData.formattedSize}
                    </motion.p>
                  </div>
                  <div
                    className="text-2xl sm:text-3xl"
                    style={{ color: "#90EE90" }}
                  >
                    💾
                  </div>
                </div>
              </motion.div>

              {/* Total Files */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6"
                style={{ backgroundColor: "#f0f8f0" }}
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-xs sm:text-sm font-medium"
                      style={{ color: "#228B22" }}
                    >
                      Total Files
                    </p>
                    <motion.p
                      className="text-2xl sm:text-3xl font-bold"
                      style={{ color: "#0d0d0d" }}
                      key={storageData.fileCount}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {storageData.fileCount}
                    </motion.p>
                  </div>
                  <div
                    className="text-2xl sm:text-3xl"
                    style={{ color: "#90EE90" }}
                  >
                    📄
                  </div>
                </div>
              </motion.div>

              {/* Average File Size */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6 col-span-1 md:col-span-2 lg:col-span-1"
                style={{ backgroundColor: "#f0f8f0" }}
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-xs sm:text-sm font-medium"
                      style={{ color: "#228B22" }}
                    >
                      Average File Size
                    </p>
                    <motion.p
                      className="text-2xl sm:text-3xl font-bold"
                      style={{ color: "#0d0d0d" }}
                      key={storageData.fileCount}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {storageData.fileCount > 0
                        ? Math.round(
                            (storageData.totalSizeMB / storageData.fileCount) *
                              100
                          ) /
                            100 +
                          " MB"
                        : "0 MB"}
                    </motion.p>
                  </div>
                  <div
                    className="text-2xl sm:text-3xl"
                    style={{ color: "#90EE90" }}
                  >
                    📊
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Management Sections */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 sm:mb-8"
              variants={containerVariants}
            >
              {/* Storage Details */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6"
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
                  Storage Details
                </motion.h2>
                <div className="space-y-4">
                  <motion.div
                    className="flex justify-between items-center py-3 border-b"
                    style={{ borderColor: "#90EE90" }}
                    whileHover={{ backgroundColor: "#f8fff8" }}
                    transition={{ duration: 0.3 }}
                  >
                    <span style={{ color: "#228B22" }}>Storage (MB)</span>
                    <span
                      className="font-semibold"
                      style={{ color: "#0d0d0d" }}
                    >
                      {storageData.totalSizeMB} MB
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex justify-between items-center py-3 border-b"
                    style={{ borderColor: "#90EE90" }}
                    whileHover={{ backgroundColor: "#f8fff8" }}
                    transition={{ duration: 0.3 }}
                  >
                    <span style={{ color: "#228B22" }}>Storage (Bytes)</span>
                    <span
                      className="font-semibold"
                      style={{ color: "#0d0d0d" }}
                    >
                      {storageData.totalSizeBytes.toLocaleString()}
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex justify-between items-center py-3"
                    whileHover={{ backgroundColor: "#f8fff8" }}
                    transition={{ duration: 0.3 }}
                  >
                    <span style={{ color: "#228B22" }}>Last Updated</span>
                    <span
                      className="font-semibold"
                      style={{ color: "#0d0d0d" }}
                    >
                      {new Date().toLocaleDateString()}
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              {/* File Distribution */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6"
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
                  File Distribution
                </motion.h2>
                <FileDistributionChart
                  storageData={storageData}
                ></FileDistributionChart>
              </motion.div>
            </motion.div>

            {/* Storage Health and Actions */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
              variants={containerVariants}
            >
              {/* Storage Health */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6"
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
                  Storage Health
                </motion.h2>
                <div className="text-center py-6">
                  <motion.div
                    className="text-4xl sm:text-6xl mb-4"
                    style={{
                      color:
                        storageData.totalSizeMB > 80 ? "#ff6b6b" : "#90EE90",
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {storageData.totalSizeMB > 80
                      ? "🔴"
                      : storageData.totalSizeMB > 50
                      ? "🟡"
                      : "🟢"}
                  </motion.div>
                  <p
                    className="text-base sm:text-lg font-bold mb-2"
                    style={{ color: "#0d0d0d" }}
                  >
                    {storageData.totalSizeMB > 80
                      ? "Critical"
                      : storageData.totalSizeMB > 50
                      ? "Warning"
                      : "Healthy"}
                  </p>
                  <p
                    className="text-sm sm:text-base"
                    style={{ color: "#228B22" }}
                  >
                    Overall storage health status
                  </p>
                </div>

                {/* Usage Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm" style={{ color: "#228B22" }}>
                      Usage
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#0d0d0d" }}
                    >
                      {storageData.totalSizeMB} MB
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      className="h-3 rounded-full"
                      style={{ backgroundColor: "#228B22" }}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(
                          (storageData.totalSizeMB / 100) * 100,
                          100
                        )}%`,
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Recommendations and Actions */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6"
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
                  Recommendations
                </motion.h2>
                <div className="space-y-4 mb-6">
                  {storageData.totalSizeMB > 50 ? (
                    <motion.div
                      className="flex items-start gap-3 p-3 rounded"
                      style={{ backgroundColor: "#fff" }}
                      whileHover={{ backgroundColor: "#f8fff8" }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-lg" style={{ color: "#90EE90" }}>
                        ⚠️
                      </span>
                      <p className="text-sm" style={{ color: "#228B22" }}>
                        Consider archiving older files to optimize storage
                        usage.
                      </p>
                    </motion.div>
                  ) : storageData.fileCount === 0 ? (
                    <motion.div
                      className="flex items-start gap-3 p-3 rounded"
                      style={{ backgroundColor: "#fff" }}
                      whileHover={{ backgroundColor: "#f8fff8" }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-lg" style={{ color: "#90EE90" }}>
                        📂
                      </span>
                      <p className="text-sm" style={{ color: "#228B22" }}>
                        No files uploaded yet. Start by uploading your first
                        file.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="flex items-start gap-3 p-3 rounded"
                      style={{ backgroundColor: "#fff" }}
                      whileHover={{ backgroundColor: "#f8fff8" }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-lg" style={{ color: "#90EE90" }}>
                        ✅
                      </span>
                      <p className="text-sm" style={{ color: "#228B22" }}>
                        Storage usage is within optimal range.
                      </p>
                    </motion.div>
                  )}
                  <motion.div
                    className="flex items-start gap-3 p-3 rounded"
                    style={{ backgroundColor: "#fff" }}
                    whileHover={{ backgroundColor: "#f8fff8" }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-lg" style={{ color: "#90EE90" }}>
                      💡
                    </span>
                    <p className="text-sm" style={{ color: "#228B22" }}>
                      Regular cleanup helps maintain system performance.
                    </p>
                  </motion.div>
                </div>

                {/* Action Button */}
                <motion.button
                  onClick={fetchStorageUsage}
                  className="w-full px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  style={{
                    backgroundColor: "#228B22",
                    color: "#f0f8f0",
                  }}
                  whileHover={{
                    backgroundColor: "#32CD32",
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span>Refresh Storage Data</span>
                  <RefreshCw className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-4xl sm:text-6xl mb-4"
              style={{ color: "#90EE90" }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              💾
            </motion.div>
            <p className="text-base sm:text-lg" style={{ color: "#228B22" }}>
              Unable to load storage information
            </p>
            <p className="text-sm sm:text-base" style={{ color: "#228B22" }}>
              Storage monitoring and analytics will appear here
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default StorageDisplay;
