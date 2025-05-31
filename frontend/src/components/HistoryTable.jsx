import React from "react";
import { useNavigate } from "react-router-dom";
const HistoryTable = ({ charts, onViewChart }) => {
  const navigate = useNavigate();
  if (!Array.isArray(charts)) {
    return <p className="text-center text-gray-600">No charts available.</p>;
  }

  return (
    <div className="overflow-x-auto px-6 mx-auto max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-[#5b6e74] text-white rounded-xl transition duration-300 hover:bg-[#819fa7]"
      >
        Go Back
      </button>

      <table className="min-w-full bg-transparent border border-black border-collapse" >
        <thead>
          <tr>
            <th className="px-4 py-2 border border-black">Chart Name</th>
            <th className="px-4 py-2 border border-black">Type</th>
            {/* <th className="px-4 py-2 border">File</th> */}
            <th className="px-4 py-2 border-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {charts.map((chart) => (
            <tr key={chart._id} className="text-center">
              <td className="border border-black px-4 py-2">{chart.chartName}</td>
              <td className="border border-black px-4 py-2">{chart.chartType}</td>
              {/* <td className="border px-4 py-2">{chart.fileName}</td> */}
              <td className="border border-black px-4 py-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => onViewChart(chart)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
