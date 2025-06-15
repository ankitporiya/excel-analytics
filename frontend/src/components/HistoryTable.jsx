// //with amination
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const HistoryTable = ({ charts, onViewChart }) => {
//   const navigate = useNavigate();

//   if (!Array.isArray(charts)) {
//     return <p className="text-center text-gray-600">No charts available.</p>;
//   }

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const rowVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.4 },
//     },
//     hover: {
//       scale: 1.02,
//       backgroundColor: "#f0f8f0",
//       transition: { duration: 0.2 },
//     },
//   };

//   const buttonVariants = {
//     hover: {
//       scale: 1.05,
//       backgroundColor: "#32CD32",
//       transition: { duration: 0.2 },
//     },
//     tap: {
//       scale: 0.95,
//     },
//   };

//   const tableVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.5 },
//     },
//   };

//   return (
//     <motion.div
//       className="overflow-x-auto px-4 sm:px-6 mx-auto max-w-4xl"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <motion.button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-4 py-2 bg-[#228B22] text-white rounded-xl transition duration-300 hover:bg-[#32CD32] focus:bg-[#32CD32] focus:outline-none focus:ring-2 focus:ring-[#90EE90]"
//         variants={buttonVariants}
//         whileHover="hover"
//         whileTap="tap"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         Go Back
//       </motion.button>

//       <motion.div
//         className="bg-gradient-to-br from-[#f8fff8] via-[#e6f3e6] to-[#f0f8f0] rounded-lg shadow-lg overflow-hidden"
//         variants={tableVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <div
//           className="overflow-x-auto scrollbar-hide"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           <style>{`
//             div::-webkit-scrollbar {
//               display: none;
//             }
//           `}</style>
//           <table className="min-w-full bg-transparent border-collapse">
//             <motion.thead
//               className="bg-gradient-to-r from-[#228B22] to-[#32CD32]"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <tr>
//                 <th className="px-3 sm:px-4 py-3 border border-[#228B22] text-white font-semibold text-sm sm:text-base">
//                   Chart Name
//                 </th>
//                 <th className="px-3 sm:px-4 py-3 border border-[#228B22] text-white font-semibold text-sm sm:text-base">
//                   Type
//                 </th>
//                 <th className="px-3 sm:px-4 py-3 border border-[#228B22] text-white font-semibold text-sm sm:text-base">
//                   Actions
//                 </th>
//               </tr>
//             </motion.thead>
//             <tbody>
//               {charts.map((chart, index) => (
//                 <motion.tr
//                   key={chart._id}
//                   className="text-center border-b border-[#90EE90] hover:bg-[#f0f8f0] transition-colors duration-200"
//                   variants={rowVariants}
//                   whileHover="hover"
//                   initial="hidden"
//                   animate="visible"
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <td className="border border-[#90EE90] px-3 sm:px-4 py-3 text-gray-800 text-sm sm:text-base">
//                     {chart.chartName}
//                   </td>
//                   <td className="border border-[#90EE90] px-3 sm:px-4 py-3 text-gray-800 text-sm sm:text-base">
//                     {chart.chartType}
//                   </td>
//                   <td className="border border-[#90EE90] px-3 sm:px-4 py-3">
//                     <motion.button
//                       className="text-[#228B22] hover:text-[#32CD32] font-semibold transition-colors duration-200 text-sm sm:text-base hover:underline focus:outline-none focus:ring-2 focus:ring-[#90EE90] rounded px-2 py-1"
//                       onClick={() => onViewChart(chart)}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       View
//                     </motion.button>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default HistoryTable;





//with amination
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, AlertCircle } from "lucide-react";
import apiService from "../services/api";

const HistoryTable = ({ charts, onViewChart, onDeleteChart, onDeleteSuccess,loading = false }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [error, setError] = useState(null);
  const rowsPerPage = 10;

  if (!Array.isArray(charts)) {
    return <p className="text-center text-gray-600">No charts available.</p>;
  }

  // Calculate pagination
  const totalPages = Math.ceil(charts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentCharts = charts.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteChart = async (chart) => {
    // Debug: Check if apiService is available
    console.log('apiService:', apiService);
    console.log('apiService.deleteChart:', apiService?.deleteChart);
    
    if (!chart._id) {
      console.error('Chart ID is missing');
      setError('Chart ID is missing. Cannot delete chart.');
      return;
    }

    // Add confirmation dialog
    const isConfirmed = window.confirm(`Are you sure you want to delete "${chart.chartName}"? This action cannot be undone.`);
    if (!isConfirmed) {
      return;
    }

    try {
      setError(null); // Clear any previous errors
      setDeletingIds(prev => new Set(prev).add(chart._id)); // Track which chart is being deleted
      
      // Call the deleteChart API function
      await apiService.deleteChart(chart._id);
      
      // Call the parent component's onDeleteChart callback
      if (onDeleteChart && typeof onDeleteChart === 'function') {
        onDeleteChart(chart);
      }
      
      console.log(`Chart "${chart.chartName}" deleted successfully`);
      if (onDeleteSuccess) {
      onDeleteSuccess();  // <-- this refreshes the chart list
    }
    } catch (error) {
      console.error('Failed to delete chart:', error);
      
      // Set a user-friendly error message
      const errorMessage = error.message || 'Failed to delete chart. Please try again.';
      setError(errorMessage);
      
      // Optionally, you could show a toast notification here instead
      // toast.error(errorMessage);
      
    } finally {
      // Remove the chart ID from the deleting set
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(chart._id);
        return newSet;
      });
    }
  };

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

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    hover: {
      scale: 1.02,
      backgroundColor: "#f0f8f0",
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#32CD32",
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  const tableVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="overflow-x-auto px-4 sm:px-6 mx-auto max-w-4xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-[#228B22] text-white rounded-xl transition duration-300 hover:bg-[#32CD32] focus:bg-[#32CD32] focus:outline-none focus:ring-2 focus:ring-[#90EE90]"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Go Back
      </motion.button>

      {/* Error Message */}
      {error && (
        <motion.div
          className="mb-4 p-4 bg-red-100 border border-red-400 rounded-lg flex items-center space-x-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle className="text-red-600" size={20} />
          <span className="text-red-700">{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            ×
          </button>
        </motion.div>
      )}

      <motion.div
        className="bg-gradient-to-br from-[#f8fff8] via-[#e6f3e6] to-[#f0f8f0] rounded-lg shadow-lg overflow-hidden"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <table className="min-w-full bg-transparent border-collapse">
            <motion.thead
              className="bg-gradient-to-r from-[#228B22] to-[#32CD32]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <tr>
                <th className="px-3 sm:px-4 py-3 border border-[#228B22] text-white font-semibold text-sm sm:text-base">
                  Chart Name
                </th>
                <th className="px-3 sm:px-4 py-3 border border-[#228B22] text-white font-semibold text-sm sm:text-base">
                  Type
                </th>
                <th className="px-3 sm:px-4 py-3 border border-[#228B22] text-white font-semibold text-sm sm:text-base">
                  Actions
                </th>
                <th className="px-3 sm:px-4 py-3 border border-[#228B22] text-white font-semibold text-sm sm:text-base">
                  Delete
                </th>
              </tr>
            </motion.thead>
            <tbody>
              {currentCharts.map((chart, index) => {
                const isDeleting = deletingIds.has(chart._id);
                
                return (
                  <motion.tr
                    key={chart._id}
                    className="text-center border-b border-[#90EE90] hover:bg-[#f0f8f0] transition-colors duration-200"
                    variants={rowVariants}
                    whileHover="hover"
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="border border-[#90EE90] px-3 sm:px-4 py-3 text-gray-800 text-sm sm:text-base">
                      {chart.chartName}
                    </td>
                    <td className="border border-[#90EE90] px-3 sm:px-4 py-3 text-gray-800 text-sm sm:text-base">
                      {chart.chartType}
                    </td>
                    <td className="border border-[#90EE90] px-3 sm:px-4 py-3">
                      <motion.button
                        className="text-[#228B22] hover:text-[#32CD32] font-semibold transition-colors duration-200 text-sm sm:text-base hover:underline focus:outline-none focus:ring-2 focus:ring-[#90EE90] rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => onViewChart(chart)}
                        disabled={isDeleting}
                        whileHover={isDeleting ? {} : { scale: 1.05 }}
                        whileTap={isDeleting ? {} : { scale: 0.95 }}
                      >
                        View
                      </motion.button>
                    </td>
                    <td className="border border-[#90EE90] px-3 sm:px-4 py-3">
                      <motion.button
                        className="text-red-600 hover:text-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 rounded p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleDeleteChart(chart)}
                        disabled={loading || isDeleting}
                        whileHover={loading || isDeleting ? {} : { scale: 1.05 }}
                        whileTap={loading || isDeleting ? {} : { scale: 0.95 }}
                        title={isDeleting ? "Deleting..." : "Delete Chart"}
                      >
                        {isDeleting ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </motion.button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        <motion.div 
          className="flex justify-between items-center p-4 bg-gradient-to-r from-[#f8fff8] to-[#e6f3e6]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-xl font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#90EE90] ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                : 'bg-[#228B22] text-white hover:bg-[#32CD32]'
            }`}
            variants={buttonVariants}
            whileHover={currentPage === 1 ? {} : "hover"}
            whileTap={currentPage === 1 ? {} : "tap"}
          >
            Previous
          </motion.button>
          
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages} ({charts.length} total charts)
          </span>
          
          <motion.button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-xl font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#90EE90] ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                : 'bg-[#228B22] text-white hover:bg-[#32CD32]'
            }`}
            variants={buttonVariants}
            whileHover={currentPage === totalPages ? {} : "hover"}
            whileTap={currentPage === totalPages ? {} : "tap"}
          >
            Next
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HistoryTable;