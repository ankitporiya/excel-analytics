// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserFiles, getFileData } from '../redux/fileSlice';
// import { createChart } from '../redux/chartSlice';
// import ChartDisplay from '../components/ChartDisplay';

// const ChartPage = () => {
//   const dispatch = useDispatch();
//   const { files: userFiles = [], currentFile, loading: fileLoading } = useSelector((state) => state.files || {});
//   const { loading: chartLoading, currentChart } = useSelector((state) => state.charts || {});

//   // State for chart creation workflow
//   const [selectedFileId, setSelectedFileId] = useState('');
//   const [chartConfig, setChartConfig] = useState({
//     chartName: '',
//     chartType: 'bar',
//     xAxis: '',
//     yAxis: ''
//   });
//   const [showChart, setShowChart] = useState(false);

//   // Load user files on component mount
//   useEffect(() => {
//     dispatch(getUserFiles());
//   }, [dispatch]);

//   // Load file data when a file is selected
//   useEffect(() => {
//     if (selectedFileId) {
//       dispatch(getFileData(selectedFileId));
//       setShowChart(false); // Hide previous chart when new file is selected
//       setChartConfig(prev => ({ ...prev, xAxis: '', yAxis: '' })); // Reset axis selection
//     }
//   }, [selectedFileId, dispatch]);

//   const chartTypes = [
//     { value: 'bar', label: 'Bar Chart', icon: '📊' },
//     { value: 'line', label: 'Line Chart', icon: '📈' },
//     { value: 'pie', label: 'Pie Chart', icon: '🥧' },
//     { value: 'scatter', label: 'Scatter Plot', icon: '⚡' },
//     { value: 'column3d', label: '3D Column Chart', icon: '📈' }
//   ];

//   const handleFileSelection = (e) => {
//     setSelectedFileId(e.target.value);
//   };

//   const handleConfigChange = (e) => {
//     setChartConfig({
//       ...chartConfig,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleCreateChart = async () => {
//     // Validation
//     if (!selectedFileId) {
//       alert('Please select a file first');
//       return;
//     }
//     if (!chartConfig.chartName.trim()) {
//       alert('Please enter a chart name');
//       return;
//     }
//     if (!chartConfig.xAxis || !chartConfig.yAxis) {
//       alert('Please select both X and Y axis');
//       return;
//     }

//     try {
//       const chartData = {
//         fileId: selectedFileId,
//         ...chartConfig
//       };

//       const result = await dispatch(createChart(chartData)).unwrap();
//       setShowChart(true);
//       alert('Chart created successfully!');
//     } catch (error) {
//       console.error('Error creating chart:', error);
//       alert('Failed to create chart. Please try again.');
//     }
//   };

//   const canCreateChart = selectedFileId &&
//                         chartConfig.chartName.trim() &&
//                         chartConfig.xAxis &&
//                         chartConfig.yAxis;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto space-y-8">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//           Excel Analytics - Chart Creator
//         </h1>

//         {/* Step 1: File Selection */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
//             <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">1</span>
//             Select Excel File
//           </h2>

//           {fileLoading ? (
//             <div className="text-center py-4">
//               <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//               <p className="mt-2 text-gray-600">Loading your files...</p>
//             </div>
//                       ) : (userFiles && userFiles.length === 0) ? (
//             <div className="text-center py-8 text-gray-500">
//               <p className="text-lg">No Excel files found.</p>
//               <p>Please upload some Excel files first to create charts.</p>
//             </div>
//           ) : (
//             <div>
//               <select
//                 value={selectedFileId}
//                 onChange={handleFileSelection}
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
//               >
//                 <option value="">-- Select an Excel File --</option>
//                 {userFiles && userFiles.map((file) => (
//                   <option key={file._id} value={file._id}>
//                     📄 {file.originalFileName} ({new Date(file.uploadDate).toLocaleDateString()})
//                   </option>
//                 ))}
//               </select>
//               {/* </select> */}

//               {selectedFileId && currentFile && (
//                 <div className="mt-4 p-4 bg-blue-50 rounded-lg">
//                   <p className="text-sm text-blue-700">
//                     <strong>Selected File:</strong> {currentFile.originalFileName}
//                   </p>
//                   <p className="text-sm text-blue-600">
//                     <strong>Columns Available:</strong> {currentFile.columns?.length || 0} columns
//                   </p>
//                   <p className="text-sm text-blue-600">
//                     <strong>Data Rows:</strong> {currentFile.data?.length || 0} rows
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Step 2: Chart Configuration */}
//         {selectedFileId && currentFile && (
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
//               <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">2</span>
//               Configure Your Chart
//             </h2>

//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Chart Name */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Chart Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="chartName"
//                   value={chartConfig.chartName}
//                   onChange={handleConfigChange}
//                   placeholder="Enter a name for your chart"
//                   className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
//                 />
//               </div>

//               {/* Chart Type */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Chart Type *
//                 </label>
//                 <select
//                   name="chartType"
//                   value={chartConfig.chartType}
//                   onChange={handleConfigChange}
//                   className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
//                 >
//                   {chartTypes.map((type) => (
//                     <option key={type.value} value={type.value}>
//                       {type.icon} {type.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* X Axis */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   X Axis (Categories) *
//                 </label>
//                 <select
//                   name="xAxis"
//                   value={chartConfig.xAxis}
//                   onChange={handleConfigChange}
//                   className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
//                 >
//                   <option value="">-- Select X Axis Column --</option>
//                   {currentFile.columns?.map((column) => (
//                     <option key={column} value={column}>
//                       {column}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Y Axis */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Y Axis (Values) *
//                 </label>
//                 <select
//                   name="yAxis"
//                   value={chartConfig.yAxis}
//                   onChange={handleConfigChange}
//                   className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
//                 >
//                   <option value="">-- Select Y Axis Column --</option>
//                   {currentFile.columns?.map((column) => (
//                     <option key={column} value={column}>
//                       {column}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Configuration Preview */}
//             {chartConfig.xAxis && chartConfig.yAxis && (
//               <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
//                 <h3 className="text-lg font-semibold text-green-800 mb-2">Chart Preview Configuration:</h3>
//                 <div className="grid md:grid-cols-2 gap-4 text-sm">
//                   <p><strong>Chart Name:</strong> {chartConfig.chartName || 'Unnamed Chart'}</p>
//                   <p><strong>Chart Type:</strong> {chartTypes.find(t => t.value === chartConfig.chartType)?.label}</p>
//                   <p><strong>X Axis:</strong> {chartConfig.xAxis}</p>
//                   <p><strong>Y Axis:</strong> {chartConfig.yAxis}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Step 3: Create Chart Button */}
//         {selectedFileId && currentFile && (
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
//               <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">3</span>
//               Generate Chart
//             </h2>

//             <div className="text-center">
//               <button
//                 onClick={handleCreateChart}
//                 disabled={!canCreateChart || chartLoading}
//                 className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 ${
//                   canCreateChart && !chartLoading
//                     ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 {chartLoading ? (
//                   <span className="flex items-center">
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                     Creating Chart...
//                   </span>
//                 ) : (
//                   <span className="flex items-center">
//                     🎨 Create Chart
//                   </span>
//                 )}
//               </button>

//               {!canCreateChart && (
//                 <p className="mt-3 text-sm text-gray-500">
//                   Please complete all required fields above to create your chart
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Step 4: Display Chart */}
//         {showChart && currentChart && (
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
//               <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">4</span>
//               Your Chart
//             </h2>

//             <div className="border-2 border-gray-200 rounded-lg p-4">
//               <ChartDisplay chart={currentChart} />
//             </div>

//             <div className="mt-4 flex justify-center space-x-4">
//               <button
//                 onClick={() => setShowChart(false)}
//                 className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
//               >
//                 Hide Chart
//               </button>
//               <button
//                 onClick={() => {
//                   setChartConfig({
//                     chartName: '',
//                     chartType: 'bar',
//                     xAxis: '',
//                     yAxis: ''
//                   });
//                   setShowChart(false);
//                 }}
//                 className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//               >
//                 Create Another Chart
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChartPage;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFiles, getFileData } from "../redux/fileSlice";
import { createChart } from "../redux/chartSlice";
import ChartDisplay from "../components/ChartDisplay";
import { useNavigate } from "react-router-dom";

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
    }
  }, [selectedFileId, dispatch]);

  const chartTypes = [
    { value: "bar", label: "Bar Chart", icon: "📊" },
    { value: "line", label: "Line Chart", icon: "📈" },
    { value: "pie", label: "Pie Chart", icon: "🥧" },
    { value: "scatter", label: "Scatter Plot", icon: "⚡" },
    { value: "column3d", label: "3D Column Chart", icon: "📈" },
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

      // Create download link
      const link = document.createElement("a");
      link.download = `${chartConfig.chartName || "chart"}-${
        new Date().toISOString().split("T")[0]
      }.${format}`;

      if (format === "png") {
        link.href = canvas.toDataURL("image/png");
      } else if (format === "jpeg") {
        link.href = canvas.toDataURL("image/jpeg", 0.9);
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

  return (
    <div
      className="min-h-screen bg-gray-50 p-6"
      style={{
        background: "linear-gradient(to bottom right, #bde8f1, #ffffff)",
      }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Excel Analytics - Chart Creator
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-[#5b6e74] text-white rounded-xl transition duration-300 hover:bg-[#819fa7]"
        >
          Go Back
        </button>

        {/* Step 1: File Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
            <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
              1
            </span>
            Select Excel File
          </h2>

          {fileLoading ? (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Loading your files...</p>
            </div>
          ) : userFiles && userFiles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">No Excel files found.</p>
              <p>Please upload some Excel files first to create charts.</p>
            </div>
          ) : (
            <div>
              <select
                value={selectedFileId}
                onChange={handleFileSelection}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
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
              {/* </select> */}

              {selectedFileId && currentFile && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Selected File:</strong>{" "}
                    {currentFile.originalFileName}
                  </p>
                  <p className="text-sm text-blue-600">
                    <strong>Columns Available:</strong>{" "}
                    {currentFile.columns?.length || 0} columns
                  </p>
                  <p className="text-sm text-blue-600">
                    <strong>Data Rows:</strong> {currentFile.data?.length || 0}{" "}
                    rows
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Step 2: Chart Configuration */}
        {selectedFileId && currentFile && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                2
              </span>
              Configure Your Chart
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
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
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
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
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
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
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
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
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
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
            {chartConfig.xAxis && chartConfig.yAxis && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Chart Preview Configuration:
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <p>
                    <strong>Chart Name:</strong>{" "}
                    {chartConfig.chartName || "Unnamed Chart"}
                  </p>
                  <p>
                    <strong>Chart Type:</strong>{" "}
                    {
                      chartTypes.find((t) => t.value === chartConfig.chartType)
                        ?.label
                    }
                  </p>
                  <p>
                    <strong>X Axis:</strong> {chartConfig.xAxis}
                  </p>
                  <p>
                    <strong>Y Axis:</strong> {chartConfig.yAxis}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Create Chart Button */}
        {selectedFileId && currentFile && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
              <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                3
              </span>
              Generate Chart
            </h2>

            <div className="text-center">
              <button
                onClick={handleCreateChart}
                disabled={!canCreateChart || chartLoading}
                className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 ${
                  canCreateChart && !chartLoading
                    ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {chartLoading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Chart...
                  </span>
                ) : (
                  <span className="flex items-center">🎨 Create Chart</span>
                )}
              </button>

              {!canCreateChart && (
                <p className="mt-3 text-sm text-gray-500">
                  Please complete all required fields above to create your chart
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Display Chart */}
        {showChart && currentChart && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
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

            <div className="mt-6 flex justify-center space-x-4 flex-wrap gap-2">
              <button
                onClick={() => downloadChart("png")}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
              >
                <span>📥</span>
                <span>Download PNG</span>
              </button>

              <button
                onClick={() => downloadChart("jpeg")}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <span>📥</span>
                <span>Download JPEG</span>
              </button>

              <button
                onClick={() => downloadChartData()}
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
              >
                <span>📊</span>
                <span>Download Data (CSV)</span>
              </button>

              <button
                onClick={() => setShowChart(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Hide Chart
              </button>

              <button
                onClick={() => {
                  setChartConfig({
                    chartName: "",
                    chartType: "bar",
                    xAxis: "",
                    yAxis: "",
                  });
                  setShowChart(false);
                }}
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Create Another Chart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartPage;
