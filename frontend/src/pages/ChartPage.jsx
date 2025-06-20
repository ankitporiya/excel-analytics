// ////WITH aNIMATION

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { getUserFiles, getFileData } from "../redux/fileSlice";
import { createChart } from "../redux/chartSlice";
import ChartDisplay from "../components/ChartDisplay";
import AIsuggestion from "../components/AISuggestion";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
const ChartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    files: userFiles = [],
    currentFile,
    loading: fileLoading,
  } = useSelector((state) => state.files || {});
  const { loading: chartLoading, currentChart } = useSelector(
    (state) => state.charts || {}
  );

  // State for chart creation workflow
  const [selectedFileId, setSelectedFileId] = useState("");
  const [chartConfig, setChartConfig] = useState({
    chartName: "",
    chartType: "bar",
    xAxis: "",
    yAxis: "",
  });
  const [showChart, setShowChart] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(true);

  // Load user files on component mount
  useEffect(() => {
    dispatch(getUserFiles());
  }, [dispatch]);

  // Load file data when a file is selected
  useEffect(() => {
    if (selectedFileId) {
      dispatch(getFileData(selectedFileId));
      setShowChart(false); // Hide previous chart when new file is selected
      setChartConfig((prev) => ({ ...prev, xAxis: "", yAxis: "" })); // Reset axis selection
      setShowAIPanel(true); // Show AI panel when new file is selected
    }
  }, [selectedFileId, dispatch]);

  const chartTypes = [
    { value: "bar", label: "Bar Chart", icon: "📊" },
    { value: "line", label: "Line Chart", icon: "📈" },
    { value: "pie", label: "Pie Chart", icon: "🥧" },
    { value: "scatter", label: "Scatter Plot", icon: "⚡" },
    // { value: "column3d", label: "3D Column Chart", icon: "📈" },
  ];

  const handleFileSelection = (e) => {
    setSelectedFileId(e.target.value);
  };

  const handleConfigChange = (e) => {
    setChartConfig({
      ...chartConfig,
      [e.target.name]: e.target.value,
    });
  };

  // Handle AI chart suggestions
  const handleAISuggestion = (suggestion) => {
    setChartConfig((prev) => ({
      ...prev,
      chartType: suggestion.chartType,
      xAxis: suggestion.xAxis || prev.xAxis,
      yAxis: suggestion.yAxis || prev.yAxis,
    }));

    // Show a brief notification
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-[#228B22] text-white px-4 py-2 rounded-lg shadow-lg z-50";
    notification.textContent = "✨ AI suggestion applied!";
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  const handleCreateChart = async () => {
    // Validation
    if (!selectedFileId) {
      alert("Please select a file first");
      return;
    }
    if (!chartConfig.chartName.trim()) {
      alert("Please enter a chart name");
      return;
    }
    if (!chartConfig.xAxis || !chartConfig.yAxis) {
      alert("Please select both X and Y axis");
      return;
    }

    try {
      const chartData = {
        fileId: selectedFileId,
        ...chartConfig,
      };

      const result = await dispatch(createChart(chartData)).unwrap();
      setShowChart(true);
      alert("Chart created successfully!");
    } catch (error) {
      console.error("Error creating chart:", error);
      alert("Failed to create chart. Please try again.");
    }
  };

  const canCreateChart =
    selectedFileId &&
    chartConfig.chartName.trim() &&
    chartConfig.xAxis &&
    chartConfig.yAxis;

  // Download chart as image
  const downloadChart = async (format = "png") => {
    try {
      const chartContainer = document.getElementById("chart-container");
      if (!chartContainer) {
        alert("Chart not found!");
        return;
      }

      // Find the canvas element inside the chart container
      const canvas = chartContainer.querySelector("canvas");
      if (!canvas) {
        alert("Chart canvas not found! Make sure the chart is fully loaded.");
        return;
      }
      const fileName = `${chartConfig?.chartName || "chart"}-${
        new Date().toISOString().split("T")[0]
      }`;
      // Create download link
      const link = document.createElement("a");
      link.download = `${chartConfig.chartName || "chart"}-${
        new Date().toISOString().split("T")[0]
      }.${format}`;

      if (format === "png") {
        link.href = canvas.toDataURL("image/png");
      } else if (format === "jpeg") {
        link.href = canvas.toDataURL("image/jpeg", 0.9);
      } else if (format === "pdf") {
        const imageData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(imageData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${fileName}.pdf`);
      }
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download chart. Please try again.");
    }
  };

  // Download chart data as CSV
  const downloadChartData = () => {
    try {
      if (!currentChart || !currentChart.chartData) {
        alert("No chart data available!");
        return;
      }

      const { labels, datasets } = currentChart.chartData;

      // Create CSV content
      let csvContent =
        "Category," + datasets.map((d) => d.label).join(",") + "\n";

      labels.forEach((label, index) => {
        const row = [label];
        datasets.forEach((dataset) => {
          row.push(dataset.data[index] || 0);
        });
        csvContent += row.join(",") + "\n";
      });

      // Create and download CSV file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${chartConfig.chartName || "chart"}-data-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      link.click();

      // Clean up
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("CSV download failed:", error);
      alert("Failed to download chart data. Please try again.");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fff8] via-[#e6f3e6] to-[#f0f8f0] p-4 sm:p-6">
      <motion.div
        className="max-w-8xl mx-auto space-y-6 sm:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8"
          variants={cardVariants}
          style={{ color: "#228B22" }}
        >
          Excel Analytics - AI-Powered Chart Creator
        </motion.h1>

        <motion.button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-[#228B22] text-white rounded-xl transition duration-300 hover:bg-[#32CD32] focus:ring-2 focus:ring-[#90EE90]"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Go Back
        </motion.button>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Chart Configuration */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Step 1: File Selection */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
              variants={cardVariants}
              whileHover="hover"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 flex items-center">
                <span className="bg-[#228B22] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                  1
                </span>
                <span className="break-words">Select Excel File</span>
              </h2>

              {fileLoading ? (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#228B22]"></div>
                  <p className="mt-2 text-gray-600">Loading your files...</p>
                </div>
              ) : userFiles && userFiles.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg">No Excel files found.</p>
                  <p className="text-sm sm:text-base">
                    Please upload some Excel files first to create charts.
                  </p>
                </div>
              ) : (
                <div>
                  <select
                    value={selectedFileId}
                    onChange={handleFileSelection}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[#32CD32] focus:outline-none text-base sm:text-lg"
                  >
                    <option value="">-- Select an Excel File --</option>
                    {userFiles &&
                      userFiles.map((file) => (
                        <option key={file._id} value={file._id}>
                          📄 {file.originalFileName} (
                          {new Date(file.uploadDate).toLocaleDateString()})
                        </option>
                      ))}
                  </select>

                  <AnimatePresence>
                    {selectedFileId && currentFile && (
                      <motion.div
                        className="mt-4 p-4 bg-[#90EE90] bg-opacity-20 rounded-lg border border-[#90EE90]"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-sm text-[#228B22] break-words">
                          <strong>Selected File:</strong>{" "}
                          {currentFile.originalFileName}
                        </p>
                        <p className="text-sm text-[#228B22]">
                          <strong>Columns Available:</strong>{" "}
                          {currentFile.columns?.length || 0} columns
                        </p>
                        <p className="text-sm text-[#228B22]">
                          <strong>Data Rows:</strong>{" "}
                          {currentFile.data?.length || 0} rows
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>

            {/* Step 2: Chart Configuration */}
            <AnimatePresence>
              {selectedFileId && currentFile && (
                <motion.div
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                >
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 flex items-center">
                    <span className="bg-[#228B22] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                      2
                    </span>
                    <span className="break-words">Configure Your Chart</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Chart Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Chart Name *
                      </label>
                      <input
                        type="text"
                        name="chartName"
                        value={chartConfig.chartName}
                        onChange={handleConfigChange}
                        placeholder="Enter a name for your chart"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[#32CD32] focus:outline-none"
                      />
                    </div>

                    {/* Chart Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Chart Type *
                      </label>
                      <select
                        name="chartType"
                        value={chartConfig.chartType}
                        onChange={handleConfigChange}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[#32CD32] focus:outline-none"
                      >
                        {chartTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* X Axis */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        X Axis (Categories) *
                      </label>
                      <select
                        name="xAxis"
                        value={chartConfig.xAxis}
                        onChange={handleConfigChange}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[#32CD32] focus:outline-none"
                      >
                        <option value="">-- Select X Axis Column --</option>
                        {currentFile.columns?.map((column) => (
                          <option key={column} value={column}>
                            {column}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Y Axis */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Y Axis (Values) *
                      </label>
                      <select
                        name="yAxis"
                        value={chartConfig.yAxis}
                        onChange={handleConfigChange}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[#32CD32] focus:outline-none"
                      >
                        <option value="">-- Select Y Axis Column --</option>
                        {currentFile.columns?.map((column) => (
                          <option key={column} value={column}>
                            {column}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Configuration Preview */}
                  <AnimatePresence>
                    {chartConfig.xAxis && chartConfig.yAxis && (
                      <motion.div
                        className="mt-6 p-4 bg-[#90EE90] bg-opacity-20 rounded-lg border border-[#90EE90]"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-lg font-semibold text-[#228B22] mb-2">
                          Chart Preview Configuration:
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <p className="break-words">
                            <strong>Chart Name:</strong>{" "}
                            {chartConfig.chartName || "Unnamed Chart"}
                          </p>
                          <p>
                            <strong>Chart Type:</strong>{" "}
                            {
                              chartTypes.find(
                                (t) => t.value === chartConfig.chartType
                              )?.label
                            }
                          </p>
                          <p className="break-words">
                            <strong>X Axis:</strong> {chartConfig.xAxis}
                          </p>
                          <p className="break-words">
                            <strong>Y Axis:</strong> {chartConfig.yAxis}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Create Chart Button */}
            <AnimatePresence>
              {selectedFileId && currentFile && (
                <motion.div
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                >
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 flex items-center">
                    <span className="bg-[#228B22] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                      3
                    </span>
                    <span className="break-words">Generate Chart</span>
                  </h2>

                  <div className="text-center">
                    <motion.button
                      onClick={handleCreateChart}
                      disabled={!canCreateChart || chartLoading}
                      className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-200 ${
                        canCreateChart && !chartLoading
                          ? "bg-[#228B22] hover:bg-[#32CD32] text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      variants={buttonVariants}
                      whileHover={
                        canCreateChart && !chartLoading ? "hover" : {}
                      }
                      whileTap={canCreateChart && !chartLoading ? "tap" : {}}
                    >
                      {chartLoading ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Creating Chart...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          🎨 Create Chart
                        </span>
                      )}
                    </motion.button>

                    {!canCreateChart && (
                      <p className="mt-3 text-sm text-gray-500 px-4">
                        Please complete all required fields above to create your
                        chart
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4: Display Chart */}
            <AnimatePresence>
              {showChart && currentChart && (
                <motion.div
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                >
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 flex items-center">
                    <span className="bg-[#228B22] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                      4
                    </span>
                    Your Chart
                  </h2>

                  <div
                    className="border-2 border-gray-200 rounded-lg p-4"
                    id="chart-container"
                  >
                    <ChartDisplay chart={currentChart} />
                  </div>

                  <div className="mt-6 flex justify-center flex-wrap gap-2 sm:gap-4">
                    <motion.button
                      onClick={() => downloadChart("pdf")}
                      className="px-4 sm:px-6 py-2 bg-[#228B22] text-white rounded-lg hover:bg-[#32CD32] transition-colors flex items-center space-x-2 text-sm sm:text-base"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <span>📄</span>
                      <span>Download PDF</span>
                    </motion.button>

                    <motion.button
                      onClick={() => downloadChart("png")}
                      className="px-4 sm:px-6 py-2 bg-[#228B22] text-white rounded-lg hover:bg-[#32CD32] transition-colors flex items-center space-x-2 text-sm sm:text-base"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <span>📥</span>
                      <span>Download PNG</span>
                    </motion.button>

                    <motion.button
                      onClick={() => downloadChart("jpeg")}
                      className="px-4 sm:px-6 py-2 bg-[#228B22] text-white rounded-lg hover:bg-[#32CD32] transition-colors flex items-center space-x-2 text-sm sm:text-base"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <span>📥</span>
                      <span>Download JPEG</span>
                    </motion.button>

                    <motion.button
                      onClick={() => downloadChartData()}
                      className="px-4 sm:px-6 py-2 bg-[#228B22] text-white rounded-lg hover:bg-[#32CD32] transition-colors flex items-center space-x-2 text-sm sm:text-base"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <span>📊</span>
                      <span>Download Data (CSV)</span>
                    </motion.button>

                    <motion.button
                      onClick={() => setShowChart(false)}
                      className="px-4 sm:px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Hide Chart
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        setChartConfig({
                          chartName: "",
                          chartType: "bar",
                          xAxis: "",
                          yAxis: "",
                        });
                        setShowChart(false);
                      }}
                      className="px-4 sm:px-6 py-2 bg-[#228B22] text-white rounded-lg hover:bg-[#32CD32] transition-colors text-sm sm:text-base"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Create Another Chart
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - AI Assistant Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {/* AI Toggle Button */}
              <motion.div className="mb-4" variants={cardVariants}>
                <motion.button
                  onClick={() => setShowAIPanel(!showAIPanel)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white rounded-lg hover:from-[#32CD32] hover:to-[#228B22] transition-all duration-200 flex items-center justify-center space-x-2"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span>🤖</span>
                  <span>
                    {showAIPanel ? "Hide AI Assistant" : "Show AI Assistant"}
                  </span>
                </motion.button>
              </motion.div>

              {/* AI Assistant Panel */}
              <AnimatePresence>
                {showAIPanel && selectedFileId && currentFile && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AIsuggestion
                      currentFile={currentFile}
                      onChartSuggestion={handleAISuggestion}
                      currentChart={currentChart}
                      chartConfig={chartConfig}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick Tips */}
              <motion.div
                className="mt-6 bg-white rounded-xl shadow-lg p-4 sm:p-6"
                variants={cardVariants}
                whileHover="hover"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  💡 Quick Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#228B22]">•</span>
                    <span>Use AI suggestions for optimal chart selection</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#32CD32]">•</span>
                    <span>
                      Bar charts work best for categorical comparisons
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#228B22]">•</span>
                    <span>Line charts are perfect for time series data</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#32CD32]">•</span>
                    <span>
                      Scatter plots reveal relationships between variables
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#228B22]">•</span>
                    <span>Pie charts show parts of a whole effectively</span>
                  </li>
                </ul>
              </motion.div>

              {/* Chart Type Guide */}
              <motion.div
                className="mt-6 bg-white rounded-xl shadow-lg p-4 sm:p-6"
                variants={cardVariants}
                whileHover="hover"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  📊 Chart Types Guide
                </h3>
                <div className="space-y-3 text-sm">
                  {chartTypes.map((type, index) => (
                    <motion.div
                      key={type.value}
                      className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-[#90EE90] hover:bg-opacity-20 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-lg">{type.icon}</span>
                      <div>
                        <p className="font-medium text-gray-800">
                          {type.label}
                        </p>
                        <p className="text-gray-600 text-xs">
                          {type.value === "bar" &&
                            "Compare categories side by side"}
                          {type.value === "line" && "Show trends over time"}
                          {type.value === "pie" &&
                            "Display proportions of a whole"}
                          {type.value === "scatter" &&
                            "Reveal correlations between variables"}
                          {type.value === "column3d" &&
                            "Enhanced visual impact for comparisons"}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChartPage;
