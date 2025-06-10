// with Animation?
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCharts } from "../redux/chartSlice";
import HistoryTable from "../components/HistoryTable";
import ChartDisplay from "../components/ChartDisplay";
import { motion } from "framer-motion";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const { charts } = useSelector((state) => state.charts);
  const [selectedChart, setSelectedChart] = useState(null);

  useEffect(() => {
    dispatch(getUserCharts());
  }, [dispatch]);

  const downloadChart = (format = "png") => {
    try {
      const chartContainer = document.getElementById("chart-container");
      if (!chartContainer) {
        alert("Chart not found!");
        return;
      }

      const canvas = chartContainer.querySelector("canvas");
      if (!canvas) {
        alert("Chart canvas not found! Make sure the chart is fully loaded.");
        return;
      }

      const link = document.createElement("a");
      link.download = `${selectedChart?.chartName || "chart"}-${
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.div
      className="p-4 sm:p-6 min-h-screen bg-gradient-to-br from-[#f8fff8] via-[#e6f3e6] to-[#f0f8f0]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8"
        variants={itemVariants}
        style={{ color: "#228B22" }}
      >
        Your Chart History
      </motion.h1>

      <motion.div
        className="mx-auto px-2 sm:px-4 flex flex-col lg:flex-row gap-6 sm:gap-8 w-full"
        variants={itemVariants}
      >
        <motion.div className="flex-1" variants={itemVariants}>
          <HistoryTable charts={charts} onViewChart={setSelectedChart} />
        </motion.div>

        <motion.div className="flex-1" variants={itemVariants}>
          {selectedChart && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ChartDisplay chart={selectedChart} />
            </motion.div>
          )}

          {selectedChart && (
            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button
                onClick={() => downloadChart("png")}
                className="px-6 py-2 bg-[#228B22] text-white rounded-lg hover:bg-[#32CD32] focus:bg-[#32CD32] focus:outline-none focus:ring-2 focus:ring-[#90EE90] transition-colors flex items-center justify-center space-x-2"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span>📥</span>
                <span>Download PNG</span>
              </motion.button>

              <motion.button
                onClick={() => downloadChart("jpeg")}
                className="px-6 py-2 bg-[#228B22] text-white rounded-lg hover:bg-[#32CD32] focus:bg-[#32CD32] focus:outline-none focus:ring-2 focus:ring-[#90EE90] transition-colors flex items-center justify-center space-x-2"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span>📥</span>
                <span>Download JPEG</span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HistoryPage;

///////without animation
// // pages/HistoryPage.jsx
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserCharts } from "../redux/chartSlice";
// import HistoryTable from "../components/HistoryTable";
// import ChartDisplay from "../components/ChartDisplay";

// const HistoryPage = () => {
//   const dispatch = useDispatch();
//   const { charts } = useSelector((state) => state.charts);
//   const [selectedChart, setSelectedChart] = useState(null);

//   useEffect(() => {
//     dispatch(getUserCharts());
//   }, [dispatch]);

//   return (
//     <div
//       className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-gray-100"
//       style={{
//         background: "linear-gradient(to bottom right, #bde8f1, #ffffff)",
//       }}
//     >
//       <div className="max-w-5xl mx-auto px-4">
//       <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Your Chart History</h1>
//       <HistoryTable charts={charts} onViewChart={setSelectedChart} />
//       {selectedChart && <ChartDisplay chart={selectedChart} />}
//     </div>
//     </div>
//   );
// };

// export default HistoryPage;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserCharts } from "../redux/chartSlice";
// import HistoryTable from "../components/HistoryTable";
// import ChartDisplay from "../components/ChartDisplay";

// const HistoryPage = () => {
//   const dispatch = useDispatch();
//   const { charts } = useSelector((state) => state.charts);
//   const [selectedChart, setSelectedChart] = useState(null);

//   useEffect(() => {
//     dispatch(getUserCharts());
//   }, [dispatch]);

//   // move downloadChart inside component to access selectedChart
//   const downloadChart = (format = "png") => {
//     try {
//       const chartContainer = document.getElementById("chart-container");
//       if (!chartContainer) {
//         alert("Chart not found!");
//         return;
//       }

//       const canvas = chartContainer.querySelector("canvas");
//       if (!canvas) {
//         alert("Chart canvas not found! Make sure the chart is fully loaded.");
//         return;
//       }

//       const link = document.createElement("a");
//       link.download = `${selectedChart?.chartName || "chart"}-${
//         new Date().toISOString().split("T")[0]
//       }.${format}`;

//       if (format === "png") {
//         link.href = canvas.toDataURL("image/png");
//       } else if (format === "jpeg") {
//         link.href = canvas.toDataURL("image/jpeg", 0.9);
//       }

//       link.click();
//     } catch (error) {
//       console.error("Download failed:", error);
//       alert("Failed to download chart. Please try again.");
//     }
//   };

//   return (
//     <div
//       className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-gray-100"
//       style={{
//         background: "linear-gradient(to bottom right, #bde8f1, #ffffff)",
//       }}
//     >
//       <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//         Your Chart History
//       </h1>
//       <div className="mx-auto px-4 flex gap-8 w-full">
//         <div className="flex-1">
//           <HistoryTable charts={charts} onViewChart={setSelectedChart} />
//         </div>
//         <div className="flex-1">
//           {selectedChart && <ChartDisplay chart={selectedChart} />}

//           <div className="flex space-x-4 mt-4">
//             <button
//               onClick={() => downloadChart("png")}
//               className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
//             >
//               <span>📥</span>
//               <span>Download PNG</span>
//             </button>

//             <button
//               onClick={() => downloadChart("jpeg")}
//               className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
//             >
//               <span>📥</span>
//               <span>Download JPEG</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HistoryPage;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserCharts } from "../redux/chartSlice";
// import HistoryTable from "../components/HistoryTable";
// import ChartDisplay from "../components/ChartDisplay";

// const HistoryPage = () => {
//   const dispatch = useDispatch();
//   const { charts } = useSelector((state) => state.charts);
//   const [selectedChart, setSelectedChart] = useState(null);

//   useEffect(() => {
//     dispatch(getUserCharts());
//   }, [dispatch]);

//   const downloadChart = (format = "png") => {
//     try {
//       const chartContainer = document.getElementById("chart-container");
//       if (!chartContainer) {
//         alert("Chart not found!");
//         return;
//       }

//       const canvas = chartContainer.querySelector("canvas");
//       if (!canvas) {
//         alert("Chart canvas not found! Make sure the chart is fully loaded.");
//         return;
//       }

//       const link = document.createElement("a");
//       link.download = `${selectedChart?.chartName || "chart"}-${
//         new Date().toISOString().split("T")[0]
//       }.${format}`;

//       if (format === "png") {
//         link.href = canvas.toDataURL("image/png");
//       } else if (format === "jpeg") {
//         link.href = canvas.toDataURL("image/jpeg", 0.9);
//       }

//       link.click();
//     } catch (error) {
//       console.error("Download failed:", error);
//       alert("Failed to download chart. Please try again.");
//     }
//   };

//   return (
//     <div
//       className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-gray-100"
//       style={{
//         background: "linear-gradient(to bottom right, #bde8f1, #ffffff)",
//       }}
//     >
//       <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//         Your Chart History
//       </h1>
//       <div className="mx-auto px-4 flex flex-col lg:flex-row gap-8 w-full">
//         <div className="flex-1">
//           <HistoryTable charts={charts} onViewChart={setSelectedChart} />
//         </div>
//         <div className="flex-1">
//           {selectedChart && <ChartDisplay chart={selectedChart} />}

//           <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
//             <button
//               onClick={() => downloadChart("png")}
//               className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
//             >
//               <span>📥</span>
//               <span>Download PNG</span>
//             </button>

//             <button
//               onClick={() => downloadChart("jpeg")}
//               className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
//             >
//               <span>📥</span>
//               <span>Download JPEG</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HistoryPage;
