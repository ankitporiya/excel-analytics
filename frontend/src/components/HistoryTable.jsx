import React from 'react';

const HistoryTable = ({ charts, onViewChart }) => {
  if (!Array.isArray(charts)) {
    return <p className="text-center text-gray-600">No charts available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Chart Name</th>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">File</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {charts.map((chart) => (
            <tr key={chart._id} className="text-center">
              <td className="border px-4 py-2">{chart.chartName}</td>
              <td className="border px-4 py-2">{chart.chartType}</td>
              <td className="border px-4 py-2">{chart.fileName}</td>
              <td className="border px-4 py-2">
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
