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







import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCharts } from "../redux/chartSlice";
import HistoryTable from "../components/HistoryTable";
import ChartDisplay from "../components/ChartDisplay";

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

  return (
    <div
      className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-gray-100"
      style={{
        background: "linear-gradient(to bottom right, #bde8f1, #ffffff)",
      }}
    >
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Your Chart History
      </h1>
      <div className="mx-auto px-4 flex flex-col lg:flex-row gap-8 w-full">
        <div className="flex-1">
          <HistoryTable charts={charts} onViewChart={setSelectedChart} />
        </div>
        <div className="flex-1">
          {selectedChart && <ChartDisplay chart={selectedChart} />}

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
            <button
              onClick={() => downloadChart("png")}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>📥</span>
              <span>Download PNG</span>
            </button>

            <button
              onClick={() => downloadChart("jpeg")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>📥</span>
              <span>Download JPEG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
