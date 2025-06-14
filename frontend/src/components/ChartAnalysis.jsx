import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ChartDistributionPie from "../components/ChartDistributionPie";
import MostActiveUsersChart from "../components/MostActiveUsersChart";
import {
  getChartStats,
  getAllCharts,
  deleteChart,
  bulkDeleteCharts,
} from "../utils/adminApi";

const ChartAnalysis = () => {
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState([]);
  const [filteredCharts, setFilteredCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chartToDelete, setChartToDelete] = useState(null);
  const [selectedCharts, setSelectedCharts] = useState([]);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    chartType: "",
    sortBy: "createdDate",
    sortOrder: "desc",
  });
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const chartsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch();
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters, charts]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredCharts.length / chartsPerPage);
  const startIndex = (currentPage - 1) * chartsPerPage;
  const endIndex = startIndex + chartsPerPage;
  const currentCharts = filteredCharts.slice(startIndex, endIndex);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsResponse, chartsResponse] = await Promise.all([
        getChartStats(),
        getAllCharts(),
      ]);
      setStats(statsResponse);
      setCharts(chartsResponse);
      setFilteredCharts(chartsResponse);
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setError("Failed to load chart data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let filtered = charts.filter((chart) => {
      const matchesSearch =
        !searchTerm.trim() ||
        chart.chartName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chart.xAxis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chart.yAxis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chart.fileName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        !filters.chartType || chart.chartType === filters.chartType;
      return matchesSearch && matchesType;
    });

    filtered.sort((a, b) => {
      let aVal =
        filters.sortBy === "createdDate"
          ? new Date(a.createdAt)
          : a[filters.sortBy];
      let bVal =
        filters.sortBy === "createdDate"
          ? new Date(b.createdAt)
          : b[filters.sortBy];
      return filters.sortOrder === "asc"
        ? aVal < bVal
          ? -1
          : 1
        : aVal > bVal
        ? -1
        : 1;
    });

    setFilteredCharts(filtered);
  };

  const handleDeleteChart = (chart) => {
    setChartToDelete(chart);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteChart(chartToDelete._id);
      await fetchData();
      setShowDeleteModal(false);
      setChartToDelete(null);
    } catch (error) {
      console.error("Error deleting chart:", error);
      alert("Failed to delete chart: " + error.message);
    }
  };

  const confirmBulkDelete = async () => {
    try {
      await bulkDeleteCharts(selectedCharts);
      await fetchData();
      setSelectedCharts([]);
      setShowBulkDeleteModal(false);
    } catch (error) {
      console.error("Error bulk deleting charts:", error);
      alert("Failed to delete charts: " + error.message);
    }
  };

  const handleSelectChart = (chartId) => {
    setSelectedCharts((prev) =>
      prev.includes(chartId)
        ? prev.filter((id) => id !== chartId)
        : [...prev, chartId]
    );
  };

  const handleSelectAll = () => {
    const currentChartIds = currentCharts.map((chart) => chart._id);
    const allCurrentSelected = currentChartIds.every((id) =>
      selectedCharts.includes(id)
    );

    if (allCurrentSelected) {
      // Unselect all current page charts
      setSelectedCharts((prev) =>
        prev.filter((id) => !currentChartIds.includes(id))
      );
    } else {
      // Select all current page charts
      setSelectedCharts((prev) => [...new Set([...prev, ...currentChartIds])]);
    }
  };
 
  const getChartTypeIcon = (type) => {
    const icons = {
      bar: "📊",
      line: "📈",
      pie: "🥧",
      scatter: "🔸",
      column3d: "📊",
      surface3d:"🌐",
      bar3d: "📊",
      line3d:"📈",
      scatter3d:"⚡",
      pie3d:"🥧"
    };
    return icons[type] || "📊";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-6xl mb-4" style={{ color: "#bde8f1" }}>
          📊
        </div>
        <p className="text-lg" style={{ color: "#819fa7" }}>
          Loading chart analysis...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-6xl mb-4" style={{ color: "#dc3545" }}>
          ⚠️
        </div>
        <p className="text-lg mb-4" style={{ color: "#dc3545" }}>
          {error}
        </p>
        <button
          onClick={fetchData}
          className="px-4 py-2 rounded-lg font-medium"
          style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
        >
          Retry
        </button>
      </div>
    );
  }

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
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="mb-4 sm:mb-6">
        <h2
          className="text-xl sm:text-2xl font-bold"
          style={{ color: "#0d0d0d" }}
        >
          Chart Analysis Dashboard
        </h2>
        <p className="text-xs sm:text-sm mt-1" style={{ color: "#819fa7" }}>
          Monitor and analyze chart creation and usage
        </p>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8"
          variants={containerVariants}
        >
          {[
            { label: "Total Charts", value: stats.totalCharts, icon: "📊" },
            {
              label: "Recent Charts",
              value: stats.recentCharts,
              icon: "📈",
              sublabel: "Last 30 days",
            },
            {
              label: "Chart Types",
              value: stats.chartsByType?.length || 0,
              icon: "🎨",
            },
            {
              label: "Active Users",
              value: stats.topUsers?.length || 0,
              icon: "👥",
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-lg shadow-lg p-3 sm:p-6"
              style={{ backgroundColor: "#f0f8f0" }}
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-xs sm:text-sm font-medium"
                    style={{ color: "#819fa7" }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="text-xl sm:text-3xl font-bold"
                    style={{ color: "#0d0d0d" }}
                  >
                    {stat.value}
                  </p>
                  {stat.sublabel && (
                    <p className="text-xs" style={{ color: "#819fa7" }}>
                      {stat.sublabel}
                    </p>
                  )}
                </div>
                <div
                  className="text-2xl sm:text-3xl"
                  style={{ color: "#bde8f1" }}
                >
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Chart Type Distribution and Top Users */}
      <motion.div
        className="grid lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8"
        variants={containerVariants}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg p-4 sm:p-6"
          style={{ backgroundColor: "#f0f8f0" }}
          variants={cardVariants}
          whileHover="hover"
        >
          <h2
            className="text-lg sm:text-xl font-bold mb-4"
            style={{ color: "#0d0d0d" }}
          >
            Charts Distribution
          </h2>
          <ChartDistributionPie stats={stats}></ChartDistributionPie>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-lg p-4 sm:p-6"
          style={{ backgroundColor: "#f0f8f0" }}
          // variants={cardVariants}
          whileHover="hover"
        >
          <h2
            className="text-lg sm:text-xl font-bold mb-4"
            style={{ color: "#0d0d0d" }}
          >
            Most Active Users
          </h2>
          <MostActiveUsersChart stats={stats}></MostActiveUsersChart>
        </motion.div>
      </motion.div>

      {/* Search and Filter Controls */}
      <motion.div
        className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8"
        style={{ backgroundColor: "#f0f8f0" }}
        variants={cardVariants}
        whileHover="hover"
      >
        <motion.div className="flex flex-col gap-4">
          <motion.div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <h2
              className="text-lg sm:text-xl font-bold"
              style={{ color: "#0d0d0d" }}
            >
              Filter Charts
            </h2>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <select
                value={filters.chartType}
                onChange={(e) =>
                  setFilters({ ...filters, chartType: e.target.value })
                }
                className="px-3 py-2 border rounded-lg text-sm"
                style={{ borderColor: "#bde8f1", backgroundColor: "#fff" }}
              >
                <option value="">All Types</option>
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
                <option value="scatter">Scatter Plot</option>
                <option value="surface3d">Surface 3D</option>
                <option value="bar3d">Bar 3D</option>
                <option value="line3d">Line 3D</option>
                <option value="scatter3d">Scatter 3D</option>
                <option value="column3d">Column 3D</option>
                <option value="pie3d">Pie 3D</option>
               
              </select>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split("-");
                  setFilters({ ...filters, sortBy, sortOrder });
                }}
                className="px-3 py-2 border rounded-lg text-sm"
                style={{ borderColor: "#bde8f1", backgroundColor: "#fff" }}
              >
                <option value="createdDate-desc">Newest First</option>
                <option value="createdDate-asc">Oldest First</option>
                <option value="chartName-asc">Name A-Z</option>
                <option value="chartName-desc">Name Z-A</option>
              </select>
            </div>
          </motion.div>

          {selectedCharts.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={() => setShowBulkDeleteModal(true)}
                className="px-3 sm:px-4 py-2 rounded-lg font-medium text-sm"
                style={{ backgroundColor: "#dc3545", color: "#fff" }}
              >
                🗑️ Delete Selected ({selectedCharts.length})
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Charts List */}
      <motion.div
        className="bg-white rounded-lg shadow-lg p-4 sm:p-6"
        style={{ backgroundColor: "#f0f8f0" }}
        variants={cardVariants}
        whileHover="hover"
      >
        <motion.div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h2
            className="text-lg sm:text-xl font-bold"
            style={{ color: "#0d0d0d" }}
          >
            All Charts{" "}
            {filteredCharts.length !== charts.length &&
              `(${filteredCharts.length} of ${charts.length})`}
          </h2>
          {currentCharts.length > 0 && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentCharts.every((chart) =>
                  selectedCharts.includes(chart._id)
                )}
                onChange={handleSelectAll}
              />
              <span className="text-sm" style={{ color: "#819fa7" }}>
                Select All
              </span>
            </label>
          )}
        </motion.div>

        {filteredCharts.length === 0 ? (
          <div className="text-center py-8">
            <div
              className="text-4xl sm:text-6xl mb-4"
              style={{ color: "#bde8f1" }}
            >
              📊
            </div>
            <p className="text-base sm:text-lg" style={{ color: "#819fa7" }}>
              {searchTerm || filters.chartType
                ? "No charts match your search criteria"
                : "No charts found"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b" style={{ borderColor: "#bde8f1" }}>
                    <th className="text-left py-3 px-2 w-12">
                      <input
                        type="checkbox"
                        checked={currentCharts.every((chart) =>
                          selectedCharts.includes(chart._id)
                        )}
                        onChange={handleSelectAll}
                      />
                    </th>
                    {["Chart Name", "Type", "User", "Created", "Actions"].map(
                      (header) => (
                        <th
                          key={header}
                          className="text-left py-3 px-2 text-sm sm:text-base"
                          style={{ color: "#0d0d0d" }}
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {currentCharts.map((chart) => (
                    <tr
                      key={chart._id}
                      className="border-b hover:bg-white transition-colors"
                      style={{ borderColor: "#bde8f1" }}
                    >
                      <td className="py-3 px-2">
                        <input
                          type="checkbox"
                          checked={selectedCharts.includes(chart._id)}
                          onChange={() => handleSelectChart(chart._id)}
                        />
                      </td>
                      <td className="py-3 px-2">
                        <div
                          className="font-medium text-sm sm:text-base"
                          style={{ color: "#0d0d0d" }}
                        >
                          {chart.chartName}
                        </div>
                        <div className="text-xs" style={{ color: "#819fa7" }}>
                          X: {chart.xAxis}, Y: {chart.yAxis}
                          {chart.zAxis && `, Z: ${chart.zAxis}`}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base sm:text-lg">
                            {getChartTypeIcon(chart.chartType)}
                          </span>
                          <span
                            className="text-sm"
                            style={{ color: "#819fa7" }}
                          >
                            {chart.chartType?.toUpperCase().replace(/3D$/, " 3D")}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div
                          className="font-medium text-sm"
                          style={{ color: "#0d0d0d" }}
                        >
                          {chart.userId?.name || "N/A"}
                        </div>
                        <div className="text-xs" style={{ color: "#819fa7" }}>
                          {chart.userId?.email}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className="text-xs sm:text-sm"
                          style={{ color: "#819fa7" }}
                        >
                          {formatDate(chart.createdDate)}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                          <button
                            onClick={() => setSelectedChart(chart)}
                            className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg font-medium"
                            style={{
                              backgroundColor: "#228B22",
                              color: "#f0f8f0",
                            }}
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteChart(chart)}
                            className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg font-medium"
                            style={{
                              backgroundColor: "#dc3545",
                              color: "#fff",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                <div className="text-sm" style={{ color: "#819fa7" }}>
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredCharts.length)} of{" "}
                  {filteredCharts.length} charts
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor:
                        currentPage === 1 ? "#228B22" : "#228B22",
                      color: "#f2f2f0",
                    }}
                  >
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className="w-8 h-8 rounded text-sm font-medium"
                          style={{
                            backgroundColor:
                              currentPage === pageNum ? "#228B22" : "#bde8f1",
                            color:
                              currentPage === pageNum ? "#f2f2f0" : "#0d0d0d",
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor:
                        currentPage === totalPages ? "#228B22" : "#228B22",
                      color: "#f2f2f0",
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>

      {/* Modals */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full"
            style={{ backgroundColor: "#f2f2f0" }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: "#0d0d0d" }}>
              Confirm Delete
            </h3>
            <p
              className="mb-6 text-sm sm:text-base"
              style={{ color: "#819fa7" }}
            >
              Are you sure you want to delete "{chartToDelete?.chartName}"? This
              action cannot be undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg font-medium text-sm"
                style={{ backgroundColor: "#6c757d", color: "#fff" }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg font-medium text-sm"
                style={{ backgroundColor: "#dc3545", color: "#fff" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showBulkDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full"
            style={{ backgroundColor: "#f2f2f0" }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: "#0d0d0d" }}>
              Confirm Bulk Delete
            </h3>
            <p
              className="mb-6 text-sm sm:text-base"
              style={{ color: "#819fa7" }}
            >
              Are you sure you want to delete {selectedCharts.length} selected
              charts? This action cannot be undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowBulkDeleteModal(false)}
                className="px-4 py-2 rounded-lg font-medium text-sm"
                style={{ backgroundColor: "#6c757d", color: "#fff" }}
              >
                Cancel
              </button>
              <button
                onClick={confirmBulkDelete}
                className="px-4 py-2 rounded-lg font-medium text-sm"
                style={{ backgroundColor: "#dc3545", color: "#fff" }}
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedChart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-lg p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "#f0f8f0" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold" style={{ color: "#0d0d0d" }}>
                Chart Details
              </h3>
              <button
                onClick={() => setSelectedChart(null)}
                className="text-2xl hover:opacity-70"
                style={{ color: "#819fa7" }}
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Chart Name", value: selectedChart.chartName },
                { label: "Chart Type", value: selectedChart.chartType },
                { label: "X-Axis", value: selectedChart.xAxis },
                { label: "Y-Axis", value: selectedChart.yAxis },
                ...(selectedChart.zAxis
                  ? [{ label: "Z-Axis", value: selectedChart.zAxis }]
                  : []),
                {
                  label: "Created By",
                  value: selectedChart.userId?.name || "N/A",
                },
                {
                  label: "Created Date",
                  value: formatDate(selectedChart.createdDate),
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#819fa7" }}
                  >
                    {item.label}
                  </label>
                  <p
                    className="text-sm sm:text-base"
                    style={{ color: "#0d0d0d" }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-6">
              <button
                onClick={() => setSelectedChart(null)}
                className="px-4 py-2 rounded-lg font-medium text-sm"
                style={{ backgroundColor: "#6c757d", color: "#fff" }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDeleteChart(selectedChart);
                  setSelectedChart(null);
                }}
                className="px-4 py-2 rounded-lg font-medium text-sm"
                style={{ backgroundColor: "#dc3545", color: "#fff" }}
              >
                Delete Chart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartAnalysis;

/////////////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import { getChartStats, getAllCharts,
//   deleteChart,
//   bulkDeleteCharts,
//   searchCharts,
//   exportCharts
// } from '../utils/adminApi';

// const ChartAnalysis = () => {
//   const [stats, setStats] = useState(null);
//   const [charts, setCharts] = useState([]);
//   const [filteredCharts, setFilteredCharts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedChart, setSelectedChart] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [chartToDelete, setChartToDelete] = useState(null);
//   const [selectedCharts, setSelectedCharts] = useState([]);
//   const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     chartType: '',
//     sortBy: 'createdDate',
//     sortOrder: 'desc'
//   });
//   const [error, setError] = useState(null);

//   // Mock data for demonstration
//   useEffect(() => {
//     // Simulate API calls with mock data
//     const mockStats = {
//       totalCharts: 156,
//       recentCharts: 23,
//       chartsByType: [
//         { _id: 'bar', count: 45 },
//         { _id: 'line', count: 38 },
//         { _id: 'pie', count: 32 },
//         { _id: 'scatter', count: 25 },
//         { _id: 'column3d', count: 16 }
//       ],
//       topUsers: [
//         { userName: 'John Smith', userEmail: 'john@example.com', chartCount: 12 },
//         { userName: 'Sarah Johnson', userEmail: 'sarah@example.com', chartCount: 9 },
//         { userName: 'Mike Chen', userEmail: 'mike@example.com', chartCount: 7 },
//         { userName: 'Emily Davis', userEmail: 'emily@example.com', chartCount: 6 }
//       ]
//     };

//     const mockCharts = [
//       {
//         _id: '1',
//         chartName: 'Sales Performance Q4',
//         chartType: 'bar',
//         xAxis: 'Month',
//         yAxis: 'Revenue',
//         userId: { name: 'John Smith', email: 'john@example.com' },
//         fileName: 'sales_data.csv',
//         createdAt: new Date('2024-12-15T10:30:00Z')
//       },
//       {
//         _id: '2',
//         chartName: 'Customer Growth Trend',
//         chartType: 'line',
//         xAxis: 'Date',
//         yAxis: 'Customers',
//         userId: { name: 'Sarah Johnson', email: 'sarah@example.com' },
//         fileName: 'customer_data.xlsx',
//         createdAt: new Date('2024-12-14T14:20:00Z')
//       },
//       {
//         _id: '3',
//         chartName: 'Market Share Distribution',
//         chartType: 'pie',
//         xAxis: 'Company',
//         yAxis: 'Percentage',
//         userId: { name: 'Mike Chen', email: 'mike@example.com' },
//         fileName: 'market_analysis.csv',
//         createdAt: new Date('2024-12-13T09:15:00Z')
//       }
//     ];

//     setTimeout(() => {
//       setStats(mockStats);
//       setCharts(mockCharts);
//       setFilteredCharts(mockCharts);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   useEffect(() => {
//     handleSearch();
//   }, [searchTerm, filters, charts]);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//     //   In a real app, these would be actual API calls
//       const [statsResponse, chartsResponse] = await Promise.all([
//         getChartStats(),
//         getAllCharts()
//       ]);
//       setStats(statsResponse);
//       setCharts(chartsResponse);
//       setFilteredCharts(chartsResponse);
//     } catch (error) {
//       console.error('Error fetching chart data:', error);
//       setError('Failed to load chart data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       if (searchTerm.trim() || filters.chartType) {
//         let filtered = charts.filter(chart => {
//           const matchesSearch = !searchTerm.trim() ||
//             chart.chartName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             chart.xAxis.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             chart.yAxis.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             chart.fileName.toLowerCase().includes(searchTerm.toLowerCase());

//           const matchesType = !filters.chartType || chart.chartType === filters.chartType;

//           return matchesSearch && matchesType;
//         });

//         // Apply sorting
//         filtered.sort((a, b) => {
//           let aVal = a[filters.sortBy];
//           let bVal = b[filters.sortBy];

//           if (filters.sortBy === 'createdDate') {
//             aVal = new Date(a.createdAt);
//             bVal = new Date(b.createdAt);
//           }

//           if (filters.sortOrder === 'asc') {
//             return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
//           } else {
//             return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
//           }
//         });

//         setFilteredCharts(filtered);
//       } else {
//         setFilteredCharts(charts);
//       }
//     } catch (error) {
//       console.error('Search failed:', error);
//       setFilteredCharts(charts);
//     }
//   };

//   const handleDeleteChart = async (chart) => {
//     setChartToDelete(chart);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       // await deleteChart(chartToDelete._id);
//       setCharts(charts.filter(chart => chart._id !== chartToDelete._id));
//       setShowDeleteModal(false);
//       setChartToDelete(null);
//       // await fetchData(); // Refresh stats
//     } catch (error) {
//       console.error('Error deleting chart:', error);
//       alert('Failed to delete chart: ' + error.message);
//     }
//   };

//   const handleBulkDelete = () => {
//     if (selectedCharts.length === 0) {
//       alert('Please select charts to delete');
//       return;
//     }
//     setShowBulkDeleteModal(true);
//   };

//   const confirmBulkDelete = async () => {
//     try {
//       // await bulkDeleteCharts(selectedCharts);
//       setCharts(charts.filter(chart => !selectedCharts.includes(chart._id)));
//       setSelectedCharts([]);
//       setShowBulkDeleteModal(false);
//       // await fetchData(); // Refresh stats
//     } catch (error) {
//       console.error('Error bulk deleting charts:', error);
//       alert('Failed to delete charts: ' + error.message);
//     }
//   };

//   const handleSelectChart = (chartId) => {
//     setSelectedCharts(prev =>
//       prev.includes(chartId)
//         ? prev.filter(id => id !== chartId)
//         : [...prev, chartId]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedCharts.length === filteredCharts.length) {
//       setSelectedCharts([]);
//     } else {
//       setSelectedCharts(filteredCharts.map(chart => chart._id));
//     }
//   };

//   const handleExport = async () => {
//     try {
//       // await exportCharts();
//       alert('Charts exported successfully!');
//     } catch (error) {
//       console.error('Export failed:', error);
//       alert('Failed to export charts: ' + error.message);
//     }
//   };

//   const getChartTypeIcon = (type) => {
//     const icons = {
//       bar: '📊',
//       line: '📈',
//       pie: '🥧',
//       scatter: '🔸',
//       column3d: '📊'
//     };
//     return icons[type] || '📊';
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center py-8">
//           <div className="text-6xl mb-4" style={{ color: "#bde8f1" }}>📊</div>
//           <p className="text-lg" style={{ color: "#819fa7" }}>Loading chart analysis...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center py-8">
//           <div className="text-6xl mb-4" style={{ color: "#dc3545" }}>⚠️</div>
//           <p className="text-lg mb-4" style={{ color: "#dc3545" }}>{error}</p>
//           <button
//             onClick={fetchData}
//             className="px-4 py-2 rounded-lg font-medium transition-colors duration-300"
//             style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
//             onMouseEnter={(e) => (e.target.style.backgroundColor = "#819fa7")}
//             onMouseLeave={(e) => (e.target.style.backgroundColor = "#5b6e74")}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold" style={{ color: "#0d0d0d" }}>Chart Analysis Dashboard</h2>
//         <p className="text-sm mt-1" style={{ color: "#819fa7" }}>Monitor and analyze chart creation and usage</p>
//       </div>

//       {/* Statistics Cards */}
//       {stats && (
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Total Charts</p>
//                 <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>{stats.totalCharts}</p>
//               </div>
//               <div className="text-3xl" style={{ color: "#bde8f1" }}>📊</div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Recent Charts</p>
//                 <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>{stats.recentCharts}</p>
//                 <p className="text-xs" style={{ color: "#819fa7" }}>Last 30 days</p>
//               </div>
//               <div className="text-3xl" style={{ color: "#bde8f1" }}>📈</div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Chart Types</p>
//                 <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>{stats.chartsByType?.length || 0}</p>
//               </div>
//               <div className="text-3xl" style={{ color: "#bde8f1" }}>🎨</div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Active Users</p>
//                 <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>{stats.topUsers?.length || 0}</p>
//               </div>
//               <div className="text-3xl" style={{ color: "#bde8f1" }}>👥</div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Search and Filter Controls */}
//       <div className="bg-white rounded-lg shadow-lg p-6 mb-8" style={{ backgroundColor: "#f2f2f0" }}>
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//           <div className="flex flex-col md:flex-row gap-4 flex-1">
//             <div className="flex-1">
//               <input
//                 type="text"
//                 placeholder="Search charts by name, axis, or file..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
//                 style={{
//                   borderColor: "#bde8f1",
//                   focusRingColor: "#5b6e74",
//                   backgroundColor: "#fff"
//                 }}
//               />
//             </div>
//             <div>
//               <select
//                 value={filters.chartType}
//                 onChange={(e) => setFilters({...filters, chartType: e.target.value})}
//                 className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
//                 style={{
//                   borderColor: "#bde8f1",
//                   focusRingColor: "#5b6e74",
//                   backgroundColor: "#fff"
//                 }}
//               >
//                 <option value="">All Types</option>
//                 <option value="bar">Bar Chart</option>
//                 <option value="line">Line Chart</option>
//                 <option value="pie">Pie Chart</option>
//                 <option value="scatter">Scatter Plot</option>
//                 <option value="column3d">3D Column</option>
//               </select>
//             </div>
//             <div>
//               <select
//                 value={`${filters.sortBy}-${filters.sortOrder}`}
//                 onChange={(e) => {
//                   const [sortBy, sortOrder] = e.target.value.split('-');
//                   setFilters({...filters, sortBy, sortOrder});
//                 }}
//                 className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
//                 style={{
//                   borderColor: "#bde8f1",
//                   focusRingColor: "#5b6e74",
//                   backgroundColor: "#fff"
//                 }}
//               >
//                 <option value="createdDate-desc">Newest First</option>
//                 <option value="createdDate-asc">Oldest First</option>
//                 <option value="chartName-asc">Name A-Z</option>
//                 <option value="chartName-desc">Name Z-A</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={handleExport}
//               className="px-4 py-2 rounded-lg font-medium transition-colors duration-300"
//               style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
//               onMouseEnter={(e) => (e.target.style.backgroundColor = "#819fa7")}
//               onMouseLeave={(e) => (e.target.style.backgroundColor = "#5b6e74")}
//             >
//               📥 Export
//             </button>
//             {selectedCharts.length > 0 && (
//               <button
//                 onClick={handleBulkDelete}
//                 className="px-4 py-2 rounded-lg font-medium transition-colors duration-300"
//                 style={{ backgroundColor: "#dc3545", color: "#fff" }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
//                 onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
//               >
//                 🗑️ Delete Selected ({selectedCharts.length})
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Chart Type Distribution and Top Users */}
//       <div className="grid lg:grid-cols-2 gap-8 mb-8">
//         {/* Chart Types */}
//         <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
//           <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>Charts by Type</h2>
//           <div className="space-y-4">
//             {stats?.chartsByType?.map((type, index) => (
//               <div key={index} className="flex justify-between items-center py-3 border-b" style={{ borderColor: "#bde8f1" }}>
//                 <div className="flex items-center gap-2">
//                   <span className="text-lg">{getChartTypeIcon(type._id)}</span>
//                   <span style={{ color: "#819fa7" }}>{type._id.charAt(0).toUpperCase() + type._id.slice(1)}</span>
//                 </div>
//                 <span className="font-semibold" style={{ color: "#0d0d0d" }}>{type.count}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Top Users */}
//         <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
//           <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>Most Active Users</h2>
//           <div className="space-y-4">
//             {stats?.topUsers?.map((user, index) => (
//               <div key={index} className="flex justify-between items-center py-3 border-b" style={{ borderColor: "#bde8f1" }}>
//                 <div>
//                   <span className="font-medium" style={{ color: "#0d0d0d" }}>{user.userName}</span>
//                   <p className="text-xs" style={{ color: "#819fa7" }}>{user.userEmail}</p>
//                 </div>
//                 <span className="font-semibold" style={{ color: "#0d0d0d" }}>{user.chartCount} charts</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Charts List */}
//       <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold" style={{ color: "#0d0d0d" }}>
//             All Charts {filteredCharts.length !== charts.length && `(${filteredCharts.length} of ${charts.length})`}
//           </h2>
//           {filteredCharts.length > 0 && (
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={selectedCharts.length === filteredCharts.length}
//                 onChange={handleSelectAll}
//                 className="rounded"
//               />
//               <span style={{ color: "#819fa7" }}>Select All</span>
//             </label>
//           )}
//         </div>

//         {filteredCharts.length === 0 ? (
//           <div className="text-center py-8">
//             <div className="text-6xl mb-4" style={{ color: "#bde8f1" }}>📊</div>
//             <p className="text-lg" style={{ color: "#819fa7" }}>
//               {searchTerm || filters.chartType ? 'No charts match your search criteria' : 'No charts found'}
//             </p>
//             <p style={{ color: "#819fa7" }}>
//               {searchTerm || filters.chartType ? 'Try adjusting your search terms' : 'Charts will appear here when users create them'}
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b" style={{ borderColor: "#bde8f1" }}>
//                   <th className="text-left py-3 px-4 w-12">
//                     <input
//                       type="checkbox"
//                       checked={selectedCharts.length === filteredCharts.length}
//                       onChange={handleSelectAll}
//                       className="rounded"
//                     />
//                   </th>
//                   <th className="text-left py-3 px-4" style={{ color: "#0d0d0d" }}>Chart Name</th>
//                   <th className="text-left py-3 px-4" style={{ color: "#0d0d0d" }}>Type</th>
//                   <th className="text-left py-3 px-4" style={{ color: "#0d0d0d" }}>User</th>
//                   <th className="text-left py-3 px-4" style={{ color: "#0d0d0d" }}>File</th>
//                   <th className="text-left py-3 px-4" style={{ color: "#0d0d0d" }}>Created</th>
//                   <th className="text-left py-3 px-4" style={{ color: "#0d0d0d" }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredCharts.map((chart) => (
//                   <tr key={chart._id} className="border-b hover:bg-white transition-colors" style={{ borderColor: "#bde8f1" }}>
//                     <td className="py-3 px-4">
//                       <input
//                         type="checkbox"
//                         checked={selectedCharts.includes(chart._id)}
//                         onChange={() => handleSelectChart(chart._id)}
//                         className="rounded"
//                       />
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="font-medium" style={{ color: "#0d0d0d" }}>{chart.chartName}</div>
//                       <div className="text-xs" style={{ color: "#819fa7" }}>
//                         X: {chart.xAxis}, Y: {chart.yAxis}
//                       </div>
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="flex items-center gap-2">
//                         <span className="text-lg">{getChartTypeIcon(chart.chartType)}</span>
//                         <span style={{ color: "#819fa7" }}>{chart.chartType}</span>
//                       </div>
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="font-medium" style={{ color: "#0d0d0d" }}>{chart.userId?.name || 'N/A'}</div>
//                       <div className="text-xs" style={{ color: "#819fa7" }}>{chart.userId?.email}</div>
//                     </td>
//                     <td className="py-3 px-4">
//                       <span style={{ color: "#819fa7" }}>{chart.fileName}</span>
//                     </td>
//                     <td className="py-3 px-4">
//                       <span style={{ color: "#819fa7" }}>{formatDate(chart.createdAt)}</span>
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => setSelectedChart(chart)}
//                           className="px-3 py-1 text-sm rounded-lg font-medium transition-colors duration-300"
//                           style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
//                           onMouseEnter={(e) => (e.target.style.backgroundColor = "#819fa7")}
//                           onMouseLeave={(e) => (e.target.style.backgroundColor = "#5b6e74")}
//                         >
//                           View
//                         </button>
//                         <button
//                           onClick={() => handleDeleteChart(chart)}
//                           className="px-3 py-1 text-sm rounded-lg font-medium transition-colors duration-300"
//                           style={{ backgroundColor: "#dc3545", color: "#fff" }}
//                           onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
//                           onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" style={{ backgroundColor: "#f2f2f0" }}>
//             <h3 className="text-lg font-bold mb-4" style={{ color: "#0d0d0d" }}>Confirm Delete</h3>
//             <p className="mb-6" style={{ color: "#819fa7" }}>
//               Are you sure you want to delete "{chartToDelete?.chartName}"? This action cannot be undone.
//             </p>
//             <div className="flex gap-4 justify-end">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2 rounded-lg font-medium transition-colors duration-300"
//                 style={{ backgroundColor: "#6c757d", color: "#fff" }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a6268")}
//                 onMouseLeave={(e) => (e.target.style.backgroundColor = "#6c757d")}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 rounded-lg font-medium transition-colors duration-300"
//                 style={{ backgroundColor: "#dc3545", color: "#fff" }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
//                 onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Bulk Delete Confirmation Modal */}
//       {showBulkDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" style={{ backgroundColor: "#f2f2f0" }}>
//             <h3 className="text-lg font-bold mb-4" style={{ color: "#0d0d0d" }}>Confirm Bulk Delete</h3>
//             <p className="mb-6" style={{ color: "#819fa7" }}>
//               Are you sure you want to delete {selectedCharts.length} selected charts? This action cannot be undone.
//             </p>
//             <div className="flex gap-4 justify-end">
//               <button
//                 onClick={() => setShowBulkDeleteModal(false)}
//                 className="px-4 py-2 rounded-lg font-medium transition-colors duration-300"
//                 style={{ backgroundColor: "#6c757d", color: "#fff" }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a6268")}
//                 onMouseLeave={(e) => (e.target.style.backgroundColor = "#6c757d")}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmBulkDelete}
//                 className="px-4 py-2 rounded-lg font-medium transition-colors duration-300"
//                 style={{ backgroundColor: "#dc3545", color: "#fff" }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
//                 onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
//               >
//                 Delete All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Chart Details Modal */}
//       {selectedChart && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4" style={{ backgroundColor: "#f2f2f0" }}>
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-bold" style={{ color: "#0d0d0d" }}>Chart Details</h3>
//               <button
//                 onClick={() => setSelectedChart(null)}
//                 className="text-2xl hover:opacity-70"
//                 style={{ color: "#819fa7" }}
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1" style={{ color: "#819fa7" }}>Chart Name</label>
//                 <p className="font-medium" style={{ color: "#0d0d0d" }}>{selectedChart.chartName}</p>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1" style={{ color: "#819fa7" }}>Chart Type</label>
//                   <p style={{ color: "#0d0d0d" }}>{selectedChart.chartType}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1" style={{ color: "#819fa7" }}>File Name</label>
//                   <p style={{ color: "#0d0d0d" }}>{selectedChart.fileName}</p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1" style={{ color: "#819fa7" }}>X-Axis</label>
//                   <p style={{ color: "#0d0d0d" }}>{selectedChart.xAxis}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1" style={{ color: "#819fa7" }}>Y-Axis</label>
//                   <p style={{ color: "#0d0d0d" }}>{selectedChart.yAxis}</p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1" style={{ color: "#819fa7" }}>Created By</label>
//                   <p style={{ color: "#0d0d0d" }}>{selectedChart.userId?.name || 'N/A'}</p>
//                   <p className="text-xs" style={{ color: "#819fa7" }}>{selectedChart.userId?.email}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1" style={{ color: "#819fa7" }}>Created Date</label>
//                   <p style={{ color: "#0d0d0d" }}>{formatDate(selectedChart.createdAt)}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex gap-4 justify-end mt-6">
//               <button
//                 onClick={() => setSelectedChart(null)}
//                 className="px-4 py-2 rounded-lg font-medium transition-colors duration-300"
//                 style={{ backgroundColor: "#6c757d", color: "#fff" }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a6268")}
//                 onMouseLeave={(e) => (e.target.style.backgroundColor = "#6c757d")}
//               >
//                 Close
//               </button>
//               <button
//                 onClick={() => {
//                   handleDeleteChart(selectedChart);
//                   setSelectedChart(null);
//                 }}
//                 className="px-4 py-2 rounded-lg font-medium transition-colors duration-300"
//                 style={{ backgroundColor: "#dc3545", color: "#fff" }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
//                 onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
//               >
//                 Delete Chart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChartAnalysis;

// // maim
// import React, { useState, useEffect } from "react";
// import ChartDistributionPie from "../components/ChartDistributionPie";
// import MostActiveUsersChart from "../components/MostActiveUsersChart";
// import {
//   getChartStats,
//   getAllCharts,
//   deleteChart,
//   bulkDeleteCharts,
// } from "../utils/adminApi";

// const ChartAnalysis = () => {
//   const [stats, setStats] = useState(null);
//   const [charts, setCharts] = useState([]);
//   const [filteredCharts, setFilteredCharts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedChart, setSelectedChart] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [chartToDelete, setChartToDelete] = useState(null);
//   const [selectedCharts, setSelectedCharts] = useState([]);
//   const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     chartType: "",
//     sortBy: "createdDate",
//     sortOrder: "desc",
//   });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     handleSearch();
//   }, [searchTerm, filters, charts]);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const [statsResponse, chartsResponse] = await Promise.all([
//         getChartStats(),
//         getAllCharts(),
//       ]);
//       setStats(statsResponse);
//       setCharts(chartsResponse);
//       setFilteredCharts(chartsResponse);
//     } catch (error) {
//       console.error("Error fetching chart data:", error);
//       setError("Failed to load chart data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = () => {
//     let filtered = charts.filter((chart) => {
//       const matchesSearch =
//         !searchTerm.trim() ||
//         chart.chartName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         chart.xAxis.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         chart.yAxis.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         chart.fileName.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesType =
//         !filters.chartType || chart.chartType === filters.chartType;
//       return matchesSearch && matchesType;
//     });

//     filtered.sort((a, b) => {
//       let aVal =
//         filters.sortBy === "createdDate"
//           ? new Date(a.createdAt)
//           : a[filters.sortBy];
//       let bVal =
//         filters.sortBy === "createdDate"
//           ? new Date(b.createdAt)
//           : b[filters.sortBy];
//       return filters.sortOrder === "asc"
//         ? aVal < bVal
//           ? -1
//           : 1
//         : aVal > bVal
//         ? -1
//         : 1;
//     });

//     setFilteredCharts(filtered);
//   };

//   const handleDeleteChart = (chart) => {
//     setChartToDelete(chart);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await deleteChart(chartToDelete._id);
//       await fetchData();
//       setShowDeleteModal(false);
//       setChartToDelete(null);
//     } catch (error) {
//       console.error("Error deleting chart:", error);
//       alert("Failed to delete chart: " + error.message);
//     }
//   };

//   const confirmBulkDelete = async () => {
//     try {
//       await bulkDeleteCharts(selectedCharts);
//       await fetchData();
//       setSelectedCharts([]);
//       setShowBulkDeleteModal(false);
//     } catch (error) {
//       console.error("Error bulk deleting charts:", error);
//       alert("Failed to delete charts: " + error.message);
//     }
//   };

//   const handleSelectChart = (chartId) => {
//     setSelectedCharts((prev) =>
//       prev.includes(chartId)
//         ? prev.filter((id) => id !== chartId)
//         : [...prev, chartId]
//     );
//   };

//   const handleSelectAll = () => {
//     setSelectedCharts(
//       selectedCharts.length === filteredCharts.length
//         ? []
//         : filteredCharts.map((chart) => chart._id)
//     );
//   };

//   //   const handleExport = async () => {
//   //     try {
//   //       await exportCharts();
//   //       alert('Charts exported successfully!');
//   //     } catch (error) {
//   //       console.error('Export failed:', error);
//   //       alert('Failed to export charts: ' + error.message);
//   //     }
//   //   };

//   const getChartTypeIcon = (type) => {
//     const icons = {
//       bar: "📊",
//       line: "📈",
//       pie: "🥧",
//       scatter: "🔸",
//       column3d: "📊",
//     };
//     return icons[type] || "📊";
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <div className="text-6xl mb-4" style={{ color: "#bde8f1" }}>
//           📊
//         </div>
//         <p className="text-lg" style={{ color: "#819fa7" }}>
//           Loading chart analysis...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <div className="text-6xl mb-4" style={{ color: "#dc3545" }}>
//           ⚠️
//         </div>
//         <p className="text-lg mb-4" style={{ color: "#dc3545" }}>
//           {error}
//         </p>
//         <button
//           onClick={fetchData}
//           className="px-4 py-2 rounded-lg font-medium"
//           style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold" style={{ color: "#0d0d0d" }}>
//           Chart Analysis Dashboard
//         </h2>
//         <p className="text-sm mt-1" style={{ color: "#819fa7" }}>
//           Monitor and analyze chart creation and usage
//         </p>
//       </div>

//       {/* Statistics Cards */}
//       {stats && (
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {[
//             { label: "Total Charts", value: stats.totalCharts, icon: "📊" },
//             {
//               label: "Recent Charts",
//               value: stats.recentCharts,
//               icon: "📈",
//               sublabel: "Last 30 days",
//             },
//             {
//               label: "Chart Types",
//               value: stats.chartsByType?.length || 0,
//               icon: "🎨",
//             },
//             {
//               label: "Active Users",
//               value: stats.topUsers?.length || 0,
//               icon: "👥",
//             },
//           ].map((stat, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-lg shadow-lg p-6"
//               style={{ backgroundColor: "#f2f2f0" }}
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p
//                     className="text-sm font-medium"
//                     style={{ color: "#819fa7" }}
//                   >
//                     {stat.label}
//                   </p>
//                   <p
//                     className="text-3xl font-bold"
//                     style={{ color: "#0d0d0d" }}
//                   >
//                     {stat.value}
//                   </p>
//                   {stat.sublabel && (
//                     <p className="text-xs" style={{ color: "#819fa7" }}>
//                       {stat.sublabel}
//                     </p>
//                   )}
//                 </div>
//                 <div className="text-3xl" style={{ color: "#bde8f1" }}>
//                   {stat.icon}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Chart Type Distribution and Top Users */}
//       <div className="grid lg:grid-cols-2 gap-8 mb-8">
//         <div
//           className="bg-white rounded-lg shadow-lg p-6"
//           style={{ backgroundColor: "#f2f2f0" }}
//         >
//           <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>
//             Charts Distribution
//           </h2>
//           <ChartDistributionPie stats={stats}></ChartDistributionPie>
//           {/* <div className="space-y-4">
//             {stats?.chartsByType?.map((type, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between items-center py-3 border-b"
//                 style={{ borderColor: "#bde8f1" }}
//               >
//                 <div className="flex items-center gap-2">
//                   <span className="text-lg">{getChartTypeIcon(type._id)}</span>
//                   <span style={{ color: "#819fa7" }}>
//                     {type._id.charAt(0).toUpperCase() + type._id.slice(1)}
//                   </span>
//                 </div>
//                 <span className="font-semibold" style={{ color: "#0d0d0d" }}>
//                   {type.count}
//                 </span>
//               </div>
//             ))}
//           </div> */}
//         </div>

//         <div
//           className="bg-white rounded-lg shadow-lg p-6"
//           style={{ backgroundColor: "#f2f2f0" }}
//         >
//           <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>
//             Most Active Users
//           </h2>
//           <MostActiveUsersChart stats = {stats}></MostActiveUsersChart>
//           {/* <div className="space-y-4">
//             {stats?.topUsers?.map((user, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between items-center py-3 border-b"
//                 style={{ borderColor: "#bde8f1" }}
//               >
//                 <div>
//                   <span className="font-medium" style={{ color: "#0d0d0d" }}>
//                     {user.userName}
//                   </span>
//                   <p className="text-xs" style={{ color: "#819fa7" }}>
//                     {user.userEmail}
//                   </p>
//                 </div>
//                 <span className="font-semibold" style={{ color: "#0d0d0d" }}>
//                   {user.chartCount} charts
//                 </span>
//               </div>
//             ))}
//           </div> */}
//         </div>
//       </div>
//       {/* Search and Filter Controls */}
//       <div
//         className="bg-white rounded-lg shadow-lg p-6 mb-8"
//         style={{ backgroundColor: "#f2f2f0" }}
//       >
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//           <div className="flex flex-col md:flex-row gap-4 flex-1">
//             {/* <input
//               type="text"
//               placeholder="Search charts by name, axis, or file..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="flex-1 px-4 py-2 border rounded-lg"
//               style={{ borderColor: "#bde8f1", backgroundColor: "#fff" }}
//             /> */}
//             <h2
//               className="flex-1 px-4 py-2 text-xl font-bold"
//               style={{ color: "#0d0d0d" }}
//             >
//               Filter Charts
//             </h2>

//             <select
//               value={filters.chartType}
//               onChange={(e) =>
//                 setFilters({ ...filters, chartType: e.target.value })
//               }
//               className="px-4 py-2 border rounded-lg"
//               style={{ borderColor: "#bde8f1", backgroundColor: "#fff" }}
//             >
//               <option value="">All Types</option>
//               <option value="bar">Bar Chart</option>
//               <option value="line">Line Chart</option>
//               <option value="pie">Pie Chart</option>
//               <option value="scatter">Scatter Plot</option>
//               <option value="column3d">3D Column</option>
//             </select>
//             <select
//               value={`${filters.sortBy}-${filters.sortOrder}`}
//               onChange={(e) => {
//                 const [sortBy, sortOrder] = e.target.value.split("-");
//                 setFilters({ ...filters, sortBy, sortOrder });
//               }}
//               className="px-4 py-2 border rounded-lg"
//               style={{ borderColor: "#bde8f1", backgroundColor: "#fff" }}
//             >
//               <option value="createdDate-desc">Newest First</option>
//               <option value="createdDate-asc">Oldest First</option>
//               <option value="chartName-asc">Name A-Z</option>
//               <option value="chartName-desc">Name Z-A</option>
//             </select>
//           </div>

//           <div className="flex gap-2">
//             {/* <button onClick={handleExport} className="px-4 py-2 rounded-lg font-medium" style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}>
//               📥 Export
//             </button> */}
//             {selectedCharts.length > 0 && (
//               <button
//                 onClick={() => setShowBulkDeleteModal(true)}
//                 className="px-4 py-2 rounded-lg font-medium"
//                 style={{ backgroundColor: "#dc3545", color: "#fff" }}
//               >
//                 🗑️ Delete Selected ({selectedCharts.length})
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Charts List */}
//       <div
//         className="bg-white rounded-lg shadow-lg p-6"
//         style={{ backgroundColor: "#f2f2f0" }}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold" style={{ color: "#0d0d0d" }}>
//             All Charts{" "}
//             {filteredCharts.length !== charts.length &&
//               `(${filteredCharts.length} of ${charts.length})`}
//           </h2>
//           {filteredCharts.length > 0 && (
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={selectedCharts.length === filteredCharts.length}
//                 onChange={handleSelectAll}
//               />
//               <span style={{ color: "#819fa7" }}>Select All</span>
//             </label>
//           )}
//         </div>

//         {filteredCharts.length === 0 ? (
//           <div className="text-center py-8">
//             <div className="text-6xl mb-4" style={{ color: "#bde8f1" }}>
//               📊
//             </div>
//             <p className="text-lg" style={{ color: "#819fa7" }}>
//               {searchTerm || filters.chartType
//                 ? "No charts match your search criteria"
//                 : "No charts found"}
//             </p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b" style={{ borderColor: "#bde8f1" }}>
//                   <th className="text-left py-3 px-4 w-12">
//                     <input
//                       type="checkbox"
//                       checked={selectedCharts.length === filteredCharts.length}
//                       onChange={handleSelectAll}
//                     />
//                   </th>
//                   {["Chart Name", "Type", "User", "Created", "Actions"].map(
//                     (header) => (
//                       <th
//                         key={header}
//                         className="text-left py-3 px-4"
//                         style={{ color: "#0d0d0d" }}
//                       >
//                         {header}
//                       </th>
//                     )
//                   )}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredCharts.map((chart) => (
//                   <tr
//                     key={chart._id}
//                     className="border-b hover:bg-white transition-colors"
//                     style={{ borderColor: "#bde8f1" }}
//                   >
//                     <td className="py-3 px-4">
//                       <input
//                         type="checkbox"
//                         checked={selectedCharts.includes(chart._id)}
//                         onChange={() => handleSelectChart(chart._id)}
//                       />
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="font-medium" style={{ color: "#0d0d0d" }}>
//                         {chart.chartName}
//                       </div>
//                       <div className="text-xs" style={{ color: "#819fa7" }}>
//                         X: {chart.xAxis}, Y: {chart.yAxis}
//                       </div>
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="flex items-center gap-2">
//                         <span className="text-lg">
//                           {getChartTypeIcon(chart.chartType)}
//                         </span>
//                         <span style={{ color: "#819fa7" }}>
//                           {chart.chartType}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="font-medium" style={{ color: "#0d0d0d" }}>
//                         {chart.userId?.name || "N/A"}
//                       </div>
//                       <div className="text-xs" style={{ color: "#819fa7" }}>
//                         {chart.userId?.email}
//                       </div>
//                     </td>
//                     {/* <td className="py-3 px-4">
//                       <span style={{ color: "#819fa7" }}>{chart.fileName}</span>
//                     </td> */}
//                     <td className="py-3 px-4">
//                       <span style={{ color: "#819fa7" }}>
//                         {formatDate(chart.createdDate)}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => setSelectedChart(chart)}
//                           className="px-3 py-1 text-sm rounded-lg font-medium"
//                           style={{
//                             backgroundColor: "#5b6e74",
//                             color: "#f2f2f0",
//                           }}
//                         >
//                           View
//                         </button>
//                         <button
//                           onClick={() => handleDeleteChart(chart)}
//                           className="px-3 py-1 text-sm rounded-lg font-medium"
//                           style={{ backgroundColor: "#dc3545", color: "#fff" }}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div
//             className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <h3 className="text-lg font-bold mb-4" style={{ color: "#0d0d0d" }}>
//               Confirm Delete
//             </h3>
//             <p className="mb-6" style={{ color: "#819fa7" }}>
//               Are you sure you want to delete "{chartToDelete?.chartName}"? This
//               action cannot be undone.
//             </p>
//             <div className="flex gap-4 justify-end">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2 rounded-lg font-medium"
//                 style={{ backgroundColor: "#6c757d", color: "#fff" }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 rounded-lg font-medium"
//                 style={{ backgroundColor: "#dc3545", color: "#fff" }}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showBulkDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div
//             className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <h3 className="text-lg font-bold mb-4" style={{ color: "#0d0d0d" }}>
//               Confirm Bulk Delete
//             </h3>
//             <p className="mb-6" style={{ color: "#819fa7" }}>
//               Are you sure you want to delete {selectedCharts.length} selected
//               charts? This action cannot be undone.
//             </p>
//             <div className="flex gap-4 justify-end">
//               <button
//                 onClick={() => setShowBulkDeleteModal(false)}
//                 className="px-4 py-2 rounded-lg font-medium"
//                 style={{ backgroundColor: "#6c757d", color: "#fff" }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmBulkDelete}
//                 className="px-4 py-2 rounded-lg font-medium"
//                 style={{ backgroundColor: "#dc3545", color: "#fff" }}
//               >
//                 Delete All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {selectedChart && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div
//             className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-bold" style={{ color: "#0d0d0d" }}>
//                 Chart Details
//               </h3>
//               <button
//                 onClick={() => setSelectedChart(null)}
//                 className="text-2xl hover:opacity-70"
//                 style={{ color: "#819fa7" }}
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="space-y-4">
//               {[
//                 { label: "Chart Name", value: selectedChart.chartName },
//                 { label: "Chart Type", value: selectedChart.chartType },
//                 // { label: 'File Name', value: selectedChart.chartName },
//                 { label: "X-Axis", value: selectedChart.xAxis },
//                 { label: "Y-Axis", value: selectedChart.yAxis },
//                 {
//                   label: "Created By",
//                   value: selectedChart.userId?.name || "N/A",
//                 },
//                 {
//                   label: "Created Date",
//                   value: formatDate(selectedChart.createdDate),
//                 },
//               ].map((item, idx) => (
//                 <div key={idx}>
//                   <label
//                     className="block text-sm font-medium mb-1"
//                     style={{ color: "#819fa7" }}
//                   >
//                     {item.label}
//                   </label>
//                   <p style={{ color: "#0d0d0d" }}>{item.value}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="flex gap-4 justify-end mt-6">
//               <button
//                 onClick={() => setSelectedChart(null)}
//                 className="px-4 py-2 rounded-lg font-medium"
//                 style={{ backgroundColor: "#6c757d", color: "#fff" }}
//               >
//                 Close
//               </button>
//               <button
//                 onClick={() => {
//                   handleDeleteChart(selectedChart);
//                   setSelectedChart(null);
//                 }}
//                 className="px-4 py-2 rounded-lg font-medium"
//                 style={{ backgroundColor: "#dc3545", color: "#fff" }}
//               >
//                 Delete Chart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChartAnalysis;
