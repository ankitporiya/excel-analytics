const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { upload, uploadExcelFile, getUserFiles, getFileData } = require('../controllers/fileController');

// Upload Excel file
router.post('/upload', auth, upload.single('excel'), uploadExcelFile);

// Get user's files
router.get('/', auth, getUserFiles);

// Get specific file data
router.get('/:fileId', auth, getFileData);

module.exports = router;