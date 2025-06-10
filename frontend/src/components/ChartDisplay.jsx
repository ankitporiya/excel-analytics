// components/ChartDisplay.jsx
import React, { useRef, useEffect } from "react";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const ChartDisplay = ({ chart }) => {
  const chartRef = useRef(null);

  if (!chart || !chart.chartData || !chart.chartType) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-gray-500">No chart data available</p>
          <p className="text-sm text-gray-400">Create a chart to see it here</p>
        </div>
      </div>
    );
  }

  const chartData = chart.chartData;
  const chartType = chart.chartType;

  // Chart components mapping
  const components = {
    bar: Bar,
    line: Line,
    pie: Pie,
    scatter: Scatter,
    column3d: Bar, // Fallback to regular bar for 3D column
  };

  const ChartComponent = components[chartType] || Bar;

  // Chart options with better styling and download support
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    plugins: {
      title: {
        display: true,
        text: chart.chartName || "Chart",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: 20,
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: function (context) {
            return context[0].label;
          },
          label: function (context) {
            const label = context.dataset.label || "";
            const value =
              typeof context.parsed.y !== "undefined"
                ? context.parsed.y
                : context.parsed;
            return `${label}: ${
              typeof value === "number" ? value.toLocaleString() : value
            }`;
          },
        },
      },
    },
    scales:
      chartType !== "pie"
        ? {
            x: {
              display: true,
              title: {
                display: true,
                text: chart.xAxis || "X Axis",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
              grid: {
                display: true,
                color: "rgba(0,0,0,0.1)",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: chart.yAxis || "Y Axis",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
              grid: {
                display: true,
                color: "rgba(0,0,0,0.1)",
              },
              beginAtZero: true,
            },
          }
        : undefined,
  };

  // Enhanced chart data with better colors and styling
  const enhancedChartData = {
    ...chartData,
    datasets: chartData.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor:
        chartType === "pie"
          ? generatePieColors(chartData.labels.length)
          : generateBarColors(chartData.labels.length, index),
      borderColor:
        chartType === "line"
          ? generateLineColors(index)
          : chartType === "pie"
          ? undefined
          : "rgba(54, 162, 235, 0.8)",
      borderWidth: chartType === "pie" ? 2 : chartType === "line" ? 3 : 1,
      tension: chartType === "line" ? 0.4 : undefined,
      fill: chartType === "line" ? false : undefined,
      pointBackgroundColor:
        chartType === "line" ? generateLineColors(index) : undefined,
      pointBorderColor: chartType === "line" ? "#fff" : undefined,
      pointBorderWidth: chartType === "line" ? 2 : undefined,
      pointRadius: chartType === "line" ? 5 : undefined,
      pointHoverRadius: chartType === "line" ? 7 : undefined,
    })),
  };

  return (
    <div className="w-full">
      {/* Chart Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-semibold text-gray-600">Chart Type:</span>
            <p className="text-gray-800 capitalize">{chartType}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-600">X Axis:</span>
            <p className="text-gray-800">{chart.xAxis}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Y Axis:</span>
            <p className="text-gray-800">{chart.yAxis}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Data Points:</span>
            <p className="text-gray-800">{chartData.labels?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div
        id="chart-container"
        className="relative bg-white p-4 rounded-lg shadow-sm"
        style={{ height: "500px" }}
      >
        <ChartComponent
          ref={chartRef}
          data={enhancedChartData}
          options={chartOptions}
        />
      </div>

      {/* Chart Statistics */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Quick Stats</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {chartData.datasets.map((dataset, index) => {
            const values = dataset.data.filter(
              (val) => typeof val === "number"
            );
            const sum = values.reduce((a, b) => a + b, 0);
            const avg = values.length > 0 ? sum / values.length : 0;
            const max = Math.max(...values);
            const min = Math.min(...values);

            return (
              <div key={index}>
                <span className="font-semibold text-blue-600">
                  {dataset.label}:
                </span>
                <div className="text-xs text-blue-800">
                  <p>Total: {sum.toLocaleString()}</p>
                  <p>Average: {avg.toFixed(2)}</p>
                  <p>Max: {max.toLocaleString()}</p>
                  <p>Min: {min.toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Helper functions for generating colors
const generatePieColors = (count) => {
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FF6384",
    "#C9CBCF",
    "#4BC0C0",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#9966FF",
    "#FF9F40",
    "#C9CBCF",
  ];
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

const generateBarColors = (count, datasetIndex = 0) => {
  const colorSets = [
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
  ];
  return Array(count).fill(colorSets[datasetIndex % colorSets.length]);
};

const generateLineColors = (datasetIndex = 0) => {
  const colors = [
    "rgb(54, 162, 235)",
    "rgb(255, 99, 132)",
    "rgb(255, 206, 86)",
    "rgb(75, 192, 192)",
    "rgb(153, 102, 255)",
    "rgb(255, 159, 64)",
  ];
  return colors[datasetIndex % colors.length];
};

export default ChartDisplay;
