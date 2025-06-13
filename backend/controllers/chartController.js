// const Chart = require('../models/Chart');
// const FileUpload = require('../models/FileUpload');

// // Create a new chart
// const createChart = async (req, res) => {
//   try {
//     const { fileId, chartName, chartType, xAxis, yAxis } = req.body;

//     // Validate input
//     if (!fileId || !chartName || !chartType || !xAxis || !yAxis) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Get file data
//     const file = await FileUpload.findOne({ 
//       _id: fileId, 
//       userId: req.user.id 
//     });

//     if (!file) {
//       return res.status(404).json({ message: 'File not found' });
//     }

//     // Validate axes exist in data
//     if (!file.columns.includes(xAxis) || !file.columns.includes(yAxis)) {
//       return res.status(400).json({ message: 'Invalid axis selection' });
//     }

//     // Process data for chart
//     const chartData = processChartData(file.data, xAxis, yAxis, chartType);

//     // Save chart
//     const chart = new Chart({
//       userId: req.user.id,
//       fileId: fileId,
//       chartName,
//       chartType,
//       xAxis,
//       yAxis,
//       chartData
//     });

//     await chart.save();

//     res.status(201).json({
//       message: 'Chart created successfully',
//       chart: {
//         id: chart._id,
//         chartName: chart.chartName,
//         chartType: chart.chartType,
//         xAxis: chart.xAxis,
//         yAxis: chart.yAxis,
//         chartData: chart.chartData,
//         createdDate: chart.createdDate
//       }
//     });

//   } catch (error) {
//     console.error('Chart creation error:', error);
//     res.status(500).json({ message: 'Error creating chart' });
//   }
// };

// // Get user's charts
// const getUserCharts = async (req, res) => {
//   try {
//     const charts = await Chart.find({ userId: req.user.id })
//       .populate('fileId', 'originalFileName')
//       .sort({ createdDate: -1 });

//     res.json(charts);
//   } catch (error) {
//     console.error('Error fetching charts:', error);
//     res.status(500).json({ message: 'Error fetching charts' });
//   }
// };

// // Get specific chart
// const getChart = async (req, res) => {
//   try {
//     const { chartId } = req.params;
    
//     const chart = await Chart.findOne({ 
//       _id: chartId, 
//       userId: req.user.id 
//     }).populate('fileId', 'originalFileName');

//     if (!chart) {
//       return res.status(404).json({ message: 'Chart not found' });
//     }

//     res.json(chart);
//   } catch (error) {
//     console.error('Error fetching chart:', error);
//     res.status(500).json({ message: 'Error fetching chart' });
//   }
// };

// // Helper function to process chart data
// const processChartData = (data, xAxis, yAxis, chartType) => {
//   const labels = [];
//   const values = [];

//   // Handle different chart types
//   if (chartType === 'pie') {
//     // For pie chart, aggregate data by x-axis values
//     const aggregated = {};
//     data.forEach(row => {
//       const xValue = row[xAxis];
//       const yValue = parseFloat(row[yAxis]) || 0;
      
//       if (aggregated[xValue]) {
//         aggregated[xValue] += yValue;
//       } else {
//         aggregated[xValue] = yValue;
//       }
//     });

//     Object.entries(aggregated).forEach(([key, value]) => {
//       labels.push(key);
//       values.push(value);
//     });
//   } else {
//     // For other chart types
//     data.forEach(row => {
//       labels.push(row[xAxis]);
//       values.push(parseFloat(row[yAxis]) || 0);
//     });
//   }

//   return {
//     labels: labels.slice(0, 50), // Limit to 50 data points
//     datasets: [{
//       label: yAxis,
//       data: values.slice(0, 50),
//       backgroundColor: generateColors(Math.min(labels.length, 50)),
//       borderColor: '#5b6e74',
//       borderWidth: 2
//     }]
//   };
// };

// // Generate colors for chart
// const generateColors = (count) => {
//   const colors = [
//     '#5b6e74', '#819fa7', '#bde8f1', '#f2f2f0',
//     '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
//     '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
//   ];
  
//   return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
// };

// module.exports = {
//   createChart,
//   getUserCharts,
//   getChart
// };
/////////////////////////////////////////////////////////
const Chart = require('../models/Chart');
const FileUpload = require('../models/FileUpload');

// Create a new chart
const createChart = async (req, res) => {
  try {
    const { fileId, chartName, chartType, xAxis, yAxis, zAxis } = req.body;

    // Validate input
    if (!fileId || !chartName || !chartType || !xAxis || !yAxis) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Get file data
    const file = await FileUpload.findOne({ 
      _id: fileId, 
      userId: req.user.id 
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Validate axes exist in data
    if (!file.columns.includes(xAxis) || !file.columns.includes(yAxis)) {
      return res.status(400).json({ message: 'Invalid axis selection - columns not found in file' });
    }

    // For 3D charts, validate zAxis if provided
    if (zAxis && !file.columns.includes(zAxis)) {
      return res.status(400).json({ message: 'Invalid Z-axis selection - column not found in file' });
    }

    // Process data for chart
    const chartData = processChartData(file.data, xAxis, yAxis, zAxis, chartType);

    // Save chart
    const chart = new Chart({
      userId: req.user.id,
      fileId: fileId,
      chartName,
      chartType,
      xAxis,
      yAxis,
      zAxis: zAxis || null,
      chartData
    });

    await chart.save();

    res.status(201).json({
      message: 'Chart created successfully',
      chart: {
        id: chart._id,
        chartName: chart.chartName,
        chartType: chart.chartType,
        xAxis: chart.xAxis,
        yAxis: chart.yAxis,
        zAxis: chart.zAxis,
        chartData: chart.chartData,
        createdDate: chart.createdDate
      }
    });

  } catch (error) {
    console.error('Chart creation error:', error);
    res.status(500).json({ 
      message: 'Error creating chart', 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
};

// Get user's charts
const getUserCharts = async (req, res) => {
  try {
    const charts = await Chart.find({ userId: req.user.id })
      .populate('fileId', 'originalFileName')
      .sort({ createdDate: -1 });

    res.json(charts);
  } catch (error) {
    console.error('Error fetching charts:', error);
    res.status(500).json({ message: 'Error fetching charts' });
  }
};

// Get specific chart
const getChart = async (req, res) => {
  try {
    const { chartId } = req.params;
    
    const chart = await Chart.findOne({ 
      _id: chartId, 
      userId: req.user.id 
    }).populate('fileId', 'originalFileName');

    if (!chart) {
      return res.status(404).json({ message: 'Chart not found' });
    }

    res.json(chart);
  } catch (error) {
    console.error('Error fetching chart:', error);
    res.status(500).json({ message: 'Error fetching chart' });
  }
};

// Helper function to process chart data
const processChartData = (data, xAxis, yAxis, zAxis, chartType) => {
  const labels = [];
  const values = [];
  const zValues = [];

  // Handle different chart types
  if (chartType === 'pie' || chartType === 'pie3d') {
    // For pie chart, aggregate data by x-axis values
    const aggregated = {};
    data.forEach(row => {
      const xValue = row[xAxis];
      const yValue = parseFloat(row[yAxis]) || 0;
      
      if (aggregated[xValue]) {
        aggregated[xValue] += yValue;
      } else {
        aggregated[xValue] = yValue;
      }
    });

    Object.entries(aggregated).forEach(([key, value]) => {
      labels.push(key);
      values.push(value);
    });
  } else {
    // For other chart types (including 3D)
    data.forEach(row => {
      labels.push(row[xAxis]);
      values.push(parseFloat(row[yAxis]) || 0);
      
      // Add Z-axis data if available
      if (zAxis && row[zAxis] !== undefined) {
        zValues.push(parseFloat(row[zAxis]) || 0);
      }
    });
  }

  // Build the chart data structure
  const chartData = {
    labels: labels.slice(0, 100), // Limit to 100 data points for performance
    datasets: [{
      label: yAxis,
      data: values.slice(0, 100),
      backgroundColor: generateColors(Math.min(labels.length, 100)),
      borderColor: '#5b6e74',
      borderWidth: 2
    }]
  };

  // Add Z-axis data for 3D charts
  if (zAxis && zValues.length > 0) {
    chartData.datasets[0].zData = zValues.slice(0, 100);
  }

  return chartData;
};

// Generate colors for chart
const generateColors = (count) => {
  const colors = [
    '#5b6e74', '#819fa7', '#bde8f1', '#f2f2f0',
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF',
    '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'
  ];
  
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

module.exports = {
  createChart,
  getUserCharts,
  getChart
};