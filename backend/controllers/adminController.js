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

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Delete user's files from database and filesystem
    const userFiles = await FileUpload.find({ userId });
    for (const file of userFiles) {
      const filePath = path.join(__dirname, '../uploads', file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    // Delete user's charts
    await Chart.deleteMany({ userId });
    
    // Delete user's file records
    await FileUpload.deleteMany({ userId });
    
    // Delete user
    await User.findByIdAndDelete(userId);
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all files
const getAllFiles = async (req, res) => {
  try {
    const files = await FileUpload.find()
      .populate('userId', 'name email')
      .sort({ uploadedAt: -1 });
    
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete file
const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    
    const file = await FileUpload.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    // Delete file from filesystem
    const filePath = path.join(__dirname, '../uploads', file.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // Delete charts associated with this file
    await Chart.deleteMany({ fileId });
    
    // Delete file record
    await FileUpload.findByIdAndDelete(fileId);
    
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get storage usage
const getStorageUsage = async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../uploads');
    
    let totalSize = 0;
    let fileCount = 0;
    
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      
      for (const file of files) {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          totalSize += stats.size;
          fileCount++;
        }
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