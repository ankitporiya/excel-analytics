const User = require('../models/User');
const FileUpload = require('../models/FileUpload');
const Chart = require('../models/Chart');
const fs = require('fs');
const path = require('path');

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
  getStorageUsage
};