const multer = require('multer');
const XLSX = require('xlsx');
const FileUpload = require('../models/FileUpload');
const path = require('path');

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.xlsx', '.xls'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Only Excel files (.xlsx, .xls) are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Upload and parse Excel file
const uploadExcelFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Parse Excel file
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    if (jsonData.length === 0) {
      return res.status(400).json({ message: 'Excel file is empty' });
    }

    // Get column names
    const columns = Object.keys(jsonData[0]);

    // Save to database
    const fileUpload = new FileUpload({
      userId: req.user.id,
      originalFileName: req.file.originalname,
      fileSize: req.file.size,
      data: jsonData,
      columns: columns,
      status: 'completed'
    });

    await fileUpload.save();

    res.status(201).json({
      message: 'File uploaded successfully',
      file: {
        id: fileUpload._id,
        originalFileName: fileUpload.originalFileName,
        columns: columns,
        rowCount: jsonData.length,
        uploadDate: fileUpload.uploadDate
      }
    });

  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'Error processing file', error: error.message });
  }
};

// Get user's uploaded files
const getUserFiles = async (req, res) => {
  try {
    const files = await FileUpload.find({ userId: req.user.id })
      .sort({ uploadDate: -1 })
      .select('originalFileName fileSize uploadDate status columns');

    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Error fetching files' });
  }
};

// Get file data for chart creation
const getFileData = async (req, res) => {
  try {
    const { fileId } = req.params;
    
    const file = await FileUpload.findOne({ 
      _id: fileId, 
      userId: req.user.id 
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.json({
      id: file._id,
      originalFileName: file.originalFileName,
      columns: file.columns,
      data: file.data.slice(0, 100), // Send first 100 rows for preview
      totalRows: file.data.length
    });

  } catch (error) {
    console.error('Error fetching file data:', error);
    res.status(500).json({ message: 'Error fetching file data' });
  }
};

module.exports = {
  upload,
  uploadExcelFile,
  getUserFiles,
  getFileData
};