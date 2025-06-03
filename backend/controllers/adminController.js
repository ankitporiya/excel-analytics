const User = require('../models/User');
const FileUpload = require('../models/FileUpload');
const Chart = require('../models/Chart');
const fs = require('fs');
const path = require('path');



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// const Chart = require('../models/chart');
// const User = require('../models/User');
// const FileUpload = require('../models/FileUpload');

// Get comprehensive chart statistics
const getChartStats = async (req, res) => {
  try {
    // Total charts count
    const totalCharts = await Chart.countDocuments();

    // Recent charts (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentCharts = await Chart.countDocuments({
      createdDate: { $gte: thirtyDaysAgo }
    });

    // Charts grouped by type
    const chartsByType = await Chart.aggregate([
      {
        $group: {
          _id: '$chartType',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Top users by chart count
    const topUsers = await Chart.aggregate([
      {
        $group: {
          _id: '$userId',
          chartCount: { $sum: 1 }
        }
      },
      {
        $sort: { chartCount: -1 }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      {
        $unwind: '$userInfo'
      },
      {
        $project: {
          _id: 1,
          chartCount: 1,
          userName: '$userInfo.name',
          userEmail: '$userInfo.email'
        }
      }
    ]);

    // Charts created over time (last 7 days)
    const chartTrends = await Chart.aggregate([
      {
        $match: {
          createdDate: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdDate'
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    const stats = {
      totalCharts,
      recentCharts,
      chartsByType,
      topUsers,
      chartTrends
    };

    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error fetching chart stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch chart statistics',
      error: error.message
    });
  }
};

// Get all charts with pagination and filtering
const getAllCharts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      chartType,
      userId,
      sortBy = 'createdDate',
      sortOrder = 'desc',
      search
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (chartType && chartType !== 'all') {
      filter.chartType = chartType;
    }
    
    if (userId) {
      filter.userId = userId;
    }

    if (search) {
      filter.$or = [
        { chartName: { $regex: search, $options: 'i' } },
        { xAxis: { $regex: search, $options: 'i' } },
        { yAxis: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get charts with user and file information
    const charts = await Chart.find(filter)
      .populate('userId', 'name email')
      .populate('fileId', 'originalName uploadDate fileType fileSize')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const totalCharts = await Chart.countDocuments(filter);
    const totalPages = Math.ceil(totalCharts / parseInt(limit));

    res.status(200).json({
      success: true,
      data: {
        charts,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCharts,
          hasNext: parseInt(page) < totalPages,
          hasPrev: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    console.error('Error fetching charts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch charts',
      error: error.message
    });
  }
};

// Get chart by ID with full details
const getChartById = async (req, res) => {
  try {
    const { chartId } = req.params;

    const chart = await Chart.findById(chartId)
      .populate('userId', 'name email createdAt')
      .populate('fileId', 'originalName uploadDate fileType fileSize filePath')
      .lean();

    if (!chart) {
      return res.status(404).json({
        success: false,
        message: 'Chart not found'
      });
    }

    res.status(200).json({
      success: true,
      data: chart
    });

  } catch (error) {
    console.error('Error fetching chart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch chart details',
      error: error.message
    });
  }
};

// Delete chart by ID
const deleteChart = async (req, res) => {
  try {
    const { chartId } = req.params;

    // Check if chart exists
    const chart = await Chart.findById(chartId);
    if (!chart) {
      return res.status(404).json({
        success: false,
        message: 'Chart not found'
      });
    }

    // Delete the chart
    await Chart.findByIdAndDelete(chartId);

    res.status(200).json({
      success: true,
      message: 'Chart deleted successfully',
      data: { deletedChartId: chartId }
    });

  } catch (error) {
    console.error('Error deleting chart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete chart',
      error: error.message
    });
  }
};

// Bulk delete charts
const bulkDeleteCharts = async (req, res) => {
  try {
    const { chartIds } = req.body;

    if (!chartIds || !Array.isArray(chartIds) || chartIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid chart IDs array'
      });
    }

    // Delete multiple charts
    const result = await Chart.deleteMany({
      _id: { $in: chartIds }
    });

    res.status(200).json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} charts`,
      data: { deletedCount: result.deletedCount }
    });

  } catch (error) {
    console.error('Error bulk deleting charts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete charts',
      error: error.message
    });
  }
};

// Get dashboard overview
const getDashboardOverview = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [
      totalCharts,
      totalUsers,
      chartsToday,
      chartsThisWeek,
      chartsThisMonth,
      recentActivity
    ] = await Promise.all([
      Chart.countDocuments(),
      User.countDocuments(),
      Chart.countDocuments({ createdDate: { $gte: startOfDay } }),
      Chart.countDocuments({ createdDate: { $gte: startOfWeek } }),
      Chart.countDocuments({ createdDate: { $gte: startOfMonth } }),
      Chart.find()
        .populate('userId', 'name email')
        .populate('fileId', 'originalName')
        .sort({ createdDate: -1 })
        .limit(10)
        .lean()
    ]);

    const overview = {
      totalCharts,
      totalUsers,
      chartsToday,
      chartsThisWeek,
      chartsThisMonth,
      recentActivity
    };

    res.status(200).json({
      success: true,
      data: overview
    });

  } catch (error) {
    console.error('Error fetching dashboard overview:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard overview',
      error: error.message
    });
  }
};







// // // Replace your exportCharts function with this debug version temporarily
// const exportCharts = async (req, res) => {
//   try {
//     const { format = 'json', chartIds } = req.query;
    
//     // Build filter based on chartIds if provided
//     let filter = {};
//     if (chartIds && chartIds.trim()) {
//       const ids = chartIds.split(',').map(id => id.trim()).filter(id => id);
      
//       // Validate ObjectIds
//       const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
//       const invalidIds = ids.filter(id => !mongoose.Types.ObjectId.isValid(id));
      
//       if (invalidIds.length > 0) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid chart IDs provided',
//           invalidIds
//         });
//       }
      
//       if (validIds.length > 0) {
//         filter._id = { $in: validIds };
//       }
//     }
    
//     // Query charts with populated references
//     let charts;
//     try {
//       charts = await Chart.find(filter)
//         .populate('userId', 'name email')
//         .populate('fileId', 'originalName fileName fileType')
//         .lean();
//     } catch (populateError) {
//       // If populate fails, try without it
//       console.warn('Populate failed, fetching without references:', populateError.message);
//       charts = await Chart.find(filter).lean();
//     }
    
//     if (format === 'csv') {
//       // Generate CSV format
//       if (charts.length === 0) {
//         return res.status(200).json({
//           success: true,
//           message: 'No charts found for export',
//           totalCharts: 0
//         });
//       }
      
//       const csvData = charts.map(chart => ({
//         id: chart._id.toString(),
//         chartName: chart.chartName || 'Untitled',
//         chartType: chart.chartType,
//         xAxis: chart.xAxis,
//         yAxis: chart.yAxis,
//         createdDate: chart.createdDate ? new Date(chart.createdDate).toISOString() : '',
//         userId: chart.userId?._id?.toString() || chart.userId?.toString() || '',
//         userName: chart.userId?.name || 'Unknown',
//         userEmail: chart.userId?.email || 'Unknown',
//         fileId: chart.fileId?._id?.toString() || chart.fileId?.toString() || '',
//         fileName: chart.fileId?.originalName || chart.fileId?.fileName || 'Unknown',
//         fileType: chart.fileId?.fileType || 'Unknown'
//       }));
      
//       // Convert to CSV string
//       const headers = Object.keys(csvData[0]);
//       const csvRows = [
//         headers.join(','),
//         ...csvData.map(row => 
//           headers.map(header => {
//             const value = row[header];
//             // Escape commas and quotes in CSV values
//             if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
//               return `"${value.replace(/"/g, '""')}"`;
//             }
//             return value;
//           }).join(',')
//         )
//       ];
      
//       const csvString = csvRows.join('\n');
      
//       res.setHeader('Content-Type', 'text/csv');
//       res.setHeader('Content-Disposition', 'attachment; filename=charts_export.csv');
//       return res.status(200).send(csvString);
//     }
    
//     // Default JSON response
//     res.status(200).json({
//       success: true,
//       data: charts,
//       exportDate: new Date(),
//       totalCharts: charts.length,
//       format,
//       appliedFilter: Object.keys(filter).length > 0 ? filter : null
//     });
    
//   } catch (error) {
//     console.error('Export charts error:', error);
    
//     // Handle specific MongoDB errors
//     if (error.name === 'CastError') {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid ID format provided',
//         error: error.message
//       });
//     }
    
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({
//         success: false,
//         message: 'Data validation error',
//         error: error.message
//       });
//     }
    
//     // Generic server error
//     res.status(500).json({
//       success: false,
//       message: 'Failed to export charts',
//       error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
//     });
//   }
// };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });
    const totalFiles = await FileUpload.countDocuments();
    const totalCharts = await Chart.countDocuments();
    
    // Count active sessions (users who logged in within last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const activeSessions = await User.countDocuments({
      lastLogin: { $gte: yesterday }
    });

    res.json({
      totalUsers,
      totalFiles,
      totalCharts,
      activeSessions
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } })
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// // Delete user
// const deleteUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
    
//     // Delete user's files from database and filesystem
//     const userFiles = await FileUpload.find({ userId });
//     for (const file of userFiles) {
//       const filePath = path.join(__dirname, '../uploads', file.filename);
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//       }
//     }
    
//     // Delete user's charts
//     await Chart.deleteMany({ userId });
    
//     // Delete user's file records
//     await FileUpload.deleteMany({ userId });
    
//     // Delete user
//     await User.findByIdAndDelete(userId);
    
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete user's charts
    const deletedCharts = await Chart.deleteMany({ userId });
    console.log(`Deleted ${deletedCharts.deletedCount} charts for user ${userId}`);
    
    // Delete user's file records (no physical files to delete since data is stored in DB)
    const deletedFiles = await FileUpload.deleteMany({ userId });
    console.log(`Deleted ${deletedFiles.deletedCount} file records for user ${userId}`);
    
    // Delete user
    await User.findByIdAndDelete(userId);
    
    res.json({ 
      message: 'User deleted successfully',
      deletedCharts: deletedCharts.deletedCount,
      deletedFiles: deletedFiles.deletedCount
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// // Get all files
// const getAllFiles = async (req, res) => {
//   try {
//     const files = await FileUpload.find()
//       .populate('userId', 'name email')
//       .sort({ uploadedAt: -1 });
    
//     res.json(files);
//   } catch (error) {
//     console.error('Error fetching files:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// Get all files
const getAllFiles = async (req, res) => {
  try {
    const files = await FileUpload.find()
      .populate('userId', 'name email')
      .sort({ uploadDate: -1 }); // Changed from uploadedAt to uploadDate
    
    // Format the response to include the specific fields you want
    const formattedFiles = files.map(file => ({
      _id: file._id,
      fileName: file.originalFileName,
      fileSize: file.fileSize,
      uploadDate: file.uploadDate,
      status: file.status,
      columns: file.columns,
      user: file.userId, // This will contain populated user data (name, email)
      dataRowCount: file.data ? file.data.length : 0 // Optional: show how many rows of data
    }));
    
    res.json(formattedFiles);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// // Delete file
// const deleteFile = async (req, res) => {
//   try {
//     const { fileId } = req.params;
    
//     const file = await FileUpload.findById(fileId);
//     if (!file) {
//       return res.status(404).json({ message: 'File not found' });
//     }
    
//     // Delete file from filesystem
//     const filePath = path.join(__dirname, '../uploads', file.filename);
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }
    
//     // Delete charts associated with this file
//     await Chart.deleteMany({ fileId });
    
//     // Delete file record
//     await FileUpload.findByIdAndDelete(fileId);
    
//     res.json({ message: 'File deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting file:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



// Delete file
const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    
    // Validate fileId
    if (!fileId) {
      return res.status(400).json({ message: 'File ID is required' });
    }
    
    const file = await FileUpload.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    // No physical file to delete - data is stored in MongoDB
    // Remove all the filesystem operations since they don't apply
    
    // Delete charts associated with this file
    const deletedCharts = await Chart.deleteMany({ fileId });
    console.log(`Deleted ${deletedCharts.deletedCount} charts for file ${fileId}`);
    
    // Delete file record from database
    await FileUpload.findByIdAndDelete(fileId);
    
    res.json({ 
      message: 'File deleted successfully',
      fileName: file.originalFileName,
      deletedCharts: deletedCharts.deletedCount
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// // Get storage usage
// const getStorageUsage = async (req, res) => {
//   try {
//     const uploadsDir = path.join(__dirname, '../uploads');
    
//     let totalSize = 0;
//     let fileCount = 0;
    
//     if (fs.existsSync(uploadsDir)) {
//       const files = fs.readdirSync(uploadsDir);
      
//       for (const file of files) {
//         const filePath = path.join(uploadsDir, file);
//         const stats = fs.statSync(filePath);
//         if (stats.isFile()) {
//           totalSize += stats.size;
//           fileCount++;
//         }
//       }
//     }
    
//     // Convert bytes to MB
//     const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
    
//     res.json({
//       totalSizeMB: parseFloat(totalSizeMB),
//       totalSizeBytes: totalSize,
//       fileCount,
//       formattedSize: formatBytes(totalSize)
//     });
//   } catch (error) {
//     console.error('Error getting storage usage:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Helper function to format bytes
// const formatBytes = (bytes) => {
//   if (bytes === 0) return '0 Bytes';
//   const k = 1024;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// };


// Get storage usage
const getStorageUsage = async (req, res) => {
  try {
    // Get all file records from database
    const files = await FileUpload.find();
    
    let totalSize = 0;
    let fileCount = files.length;
    
    // Calculate total size from fileSize field in database
    for (const file of files) {
      if (file.fileSize) {
        totalSize += file.fileSize;
      }
    }
    
    // Convert bytes to MB
    const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
    
    res.json({
      totalSizeMB: parseFloat(totalSizeMB),
      totalSizeBytes: totalSize,
      fileCount,
      formattedSize: formatBytes(totalSize)
    });
  } catch (error) {
    console.error('Error getting storage usage:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to format bytes
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllFiles,
  deleteFile,
  getStorageUsage,


  getChartStats,
  getAllCharts,
  getChartById,
  deleteChart,
  bulkDeleteCharts,
  getDashboardOverview,
  // exportCharts
};