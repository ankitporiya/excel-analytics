//with amination
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HistoryTable = ({ charts, onViewChart }) => {
  const navigate = useNavigate();

  if (!Array.isArray(charts)) {
    return <p className="text-center text-gray-600">No charts available.</p>;
  }

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
          <style jsx>{`
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
              </tr>
            </motion.thead>
            <tbody>
              {charts.map((chart, index) => (
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
                      className="text-[#228B22] hover:text-[#32CD32] font-semibold transition-colors duration-200 text-sm sm:text-base hover:underline focus:outline-none focus:ring-2 focus:ring-[#90EE90] rounded px-2 py-1"
                      onClick={() => onViewChart(chart)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HistoryTable;
