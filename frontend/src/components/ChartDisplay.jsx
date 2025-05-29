// components/ChartDisplay.jsx
import React from 'react';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, ArcElement, Tooltip, Legend);

const ChartDisplay = ({ chart }) => {
  const chartData = chart?.chartData || {};
  const chartType = chart?.chartType;

  if (!chartData || !chartType) return <div>No chart data available</div>;

  const components = {
    bar: Bar,
    line: Line,
    pie: Pie,
    scatter: Scatter
  };

  const ChartComponent = components[chartType] || Bar;

  return (
    <div className="w-full max-w-4xl mx-auto py-4">
      <h2 className="text-xl font-bold mb-2 text-center">{chart.chartName}</h2>
      <ChartComponent data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default ChartDisplay;