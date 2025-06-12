// components/ChartDisplay3D.jsx
import React, { useRef, useEffect } from "react";
import * as Plotly from 'plotly';

const ChartDisplay3D = ({ chart }) => {
  const chartRef = useRef(null);
  const plotlyDivRef = useRef(null);

  useEffect(() => {
    if (!chart || !chart.chartData || !chart.chartType || !plotlyDivRef.current) {
      return;
    }

    const renderChart = () => {
      const chartData = chart.chartData;
      const chartType = chart.chartType;

      let data = [];
      let layout = {
        title: {
          text: chart.chartName || "3D Chart",
          font: { size: 18 }
        },
        scene: {
          xaxis: {
            title: chart.xAxis || "X Axis",
            titlefont: { size: 14 }
          },
          yaxis: {
            title: chart.yAxis || "Y Axis",
            titlefont: { size: 14 }
          },
          zaxis: {
            title: chart.zAxis || "Z Axis",
            titlefont: { size: 14 }
          },
          camera: {
            eye: { x: 1.2, y: 1.2, z: 1.2 }
          }
        },
        margin: { l: 0, r: 0, b: 0, t: 50 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        autosize: true
      };

      const config = {
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
        responsive: true
      };

      switch (chartType) {
        case 'bar3d':
          data = chartData.datasets.map((dataset, index) => ({
            type: 'bar',
            x: chartData.labels,
            y: dataset.data,
            name: dataset.label,
            marker: {
              color: generateColors(chartData.labels.length, index),
              opacity: 0.8
            }
          }));
          // For 3D bar, we'll use a different approach
          if (chartData.datasets.length === 1) {
            data = [{
              type: 'mesh3d',
              x: chartData.labels.map((_, i) => i),
              y: chartData.datasets[0].data,
              z: chartData.datasets[0].data.map((_, i) => 0),
              intensity: chartData.datasets[0].data,
              colorscale: 'Viridis',
              opacity: 0.8,
              name: chartData.datasets[0].label
            }];
          }
          break;

        case 'surface3d':
          // Create surface plot data
          const xValues = chartData.labels;
          const yValues = chartData.datasets.map(d => d.label);
          const zValues = chartData.datasets.map(dataset => 
            xValues.map((_, i) => dataset.data[i] || 0)
          );
          
          data = [{
            type: 'surface',
            x: xValues,
            y: yValues,
            z: zValues,
            colorscale: 'Viridis',
            opacity: 0.9,
            name: 'Surface'
          }];
          break;

        case 'scatter3d':
          data = chartData.datasets.map((dataset, index) => ({
            type: 'scatter3d',
            mode: 'markers',
            x: chartData.labels.map((_, i) => i),
            y: dataset.data,
            z: dataset.data.map((val, i) => i), // Use index as Z for demo
            name: dataset.label,
            marker: {
              size: 5,
              color: generateColors(dataset.data.length, index),
              opacity: 0.8,
              line: {
                color: 'rgb(204, 204, 204)',
                width: 1
              }
            }
          }));
          break;

        case 'line3d':
          data = chartData.datasets.map((dataset, index) => ({
            type: 'scatter3d',
            mode: 'lines+markers',
            x: chartData.labels.map((_, i) => i),
            y: dataset.data,
            z: dataset.data.map((val, i) => Math.sin(i * 0.5)), // Add some Z variation
            name: dataset.label,
            line: {
              color: generateLineColor(index),
              width: 4
            },
            marker: {
              size: 3,
              color: generateLineColor(index),
              opacity: 0.8
            }
          }));
          break;

        case 'column3d':
          // Create 3D column chart using bar3d
          data = [{
            type: 'bar',
            x: chartData.labels,
            y: chartData.datasets[0].data,
            name: chartData.datasets[0].label,
            marker: {
              color: generateColors(chartData.labels.length, 0),
              opacity: 0.8,
              line: {
                color: 'rgb(8,48,107)',
                width: 1.5
              }
            }
          }];

          // Override layout for 3D effect
          layout = {
            ...layout,
            scene: undefined, // Remove scene for regular bar chart
            xaxis: {
              title: chart.xAxis || "X Axis"
            },
            yaxis: {
              title: chart.yAxis || "Y Axis"
            }
          };
          break;

        case 'pie3d':
          data = [{
            type: 'pie',
            labels: chartData.labels,
            values: chartData.datasets[0].data,
            name: chartData.datasets[0].label,
            hole: 0.3,
            marker: {
              colors: generatePieColors(chartData.labels.length),
              line: {
                color: '#FFFFFF',
                width: 2
              }
            },
            textinfo: 'label+percent',
            textposition: 'outside',
            automargin: true
          }];
          
          layout = {
            title: {
              text: chart.chartName || "3D Pie Chart",
              font: { size: 18 }
            },
            showlegend: true,
            margin: { l: 50, r: 50, b: 50, t: 50 },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            autosize: true
          };
          break;

        default:
          // Default to 3D scatter
          data = [{
            type: 'scatter3d',
            mode: 'markers',
            x: chartData.labels.map((_, i) => i),
            y: chartData.datasets[0].data,
            z: chartData.datasets[0].data.map((val, i) => i),
            name: chartData.datasets[0].label,
            marker: {
              size: 5,
              color: chartData.datasets[0].data,
              colorscale: 'Viridis',
              opacity: 0.8
            }
          }];
      }

      Plotly.newPlot(plotlyDivRef.current, data, layout, config);
    };

    renderChart();

    // Cleanup function
    return () => {
      if (plotlyDivRef.current) {
        Plotly.purge(plotlyDivRef.current);
      }
    };
  }, [chart]);

  if (!chart || !chart.chartData || !chart.chartType) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-4xl mb-2">📈</div>
          <p className="text-gray-500">No 3D chart data available</p>
          <p className="text-sm text-gray-400">Create a 3D chart to see it here</p>
        </div>
      </div>
    );
  }

  const chartData = chart.chartData;

  return (
    <div className="w-full">
      {/* Chart Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-semibold text-gray-600">Chart Type:</span>
            <p className="text-gray-800 capitalize">{chart.chartType}</p>
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
        id="chart-container-3d"
        className="relative bg-white p-4 rounded-lg shadow-sm"
        style={{ height: "600px" }}
      >
        <div
          ref={plotlyDivRef}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Chart Statistics */}
      <div className="mt-4 p-3 bg-purple-50 rounded-lg">
        <h4 className="font-semibold text-purple-800 mb-2">3D Chart Stats</h4>
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
                <span className="font-semibold text-purple-600">
                  {dataset.label}:
                </span>
                <div className="text-xs text-purple-800">
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

      {/* 3D Controls Info */}
      <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
        <h4 className="font-semibold text-indigo-800 mb-2">🎮 3D Controls</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-indigo-700">
          <div>
            <strong>Rotate:</strong> Click and drag
          </div>
          <div>
            <strong>Zoom:</strong> Scroll wheel
          </div>
          <div>
            <strong>Pan:</strong> Shift + click and drag
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for generating colors
const generateColors = (count, datasetIndex = 0) => {
  const colorSets = [
    ['#3B82F6', '#1E40AF', '#1D4ED8', '#2563EB', '#3B82F6'],
    ['#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D'],
    ['#10B981', '#059669', '#047857', '#065F46', '#064E3B'],
    ['#F59E0B', '#D97706', '#B45309', '#92400E', '#78350F'],
    ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#553C9A'],
    ['#06B6D4', '#0891B2', '#0E7490', '#155E75', '#164E63']
  ];
  
  const colors = colorSets[datasetIndex % colorSets.length];
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

const generatePieColors = (count) => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
    '#EE5A24', '#0097E6', '#8C7AE6', '#2ED573', '#FFC312'
  ];
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

const generateLineColor = (datasetIndex = 0) => {
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'
  ];
  return colors[datasetIndex % colors.length];
};

export default ChartDisplay3D;