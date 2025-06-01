const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

// Admin dashboard stats
router.get('/stats', auth, isAdmin, adminController.getDashboardStats);

// User management
router.get('/users', auth, isAdmin, adminController.getAllUsers);
router.delete('/users/:userId', auth, isAdmin, adminController.deleteUser);

// File management
router.get('/files', auth, isAdmin, adminController.getAllFiles);
router.delete('/files/:fileId', auth, isAdmin, adminController.deleteFile);

// Storage usage
router.get('/storage', auth, isAdmin, adminController.getStorageUsage);

module.exports = router;