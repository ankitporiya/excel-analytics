// components/FileUpload.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // ⬅️ Add this
import { uploadFile, clearError, clearUploadSuccess } from '../redux/fileSlice';


const FileUpload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, uploadSuccess } = useSelector((state) => state.files);

  const navigate = useNavigate(); // ← THIS IS REQUIRED

  const handleFileSelect = (file) => {
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setSelectedFile(file);
      dispatch(clearError());
    } else {
      alert('Please select a valid Excel file (.xlsx or .xls)');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('excel', selectedFile);

    try {
      await dispatch(uploadFile(formData)).unwrap();
      setSelectedFile(null);
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  React.useEffect(() => {
    if (uploadSuccess) {
      setTimeout(() => {
        dispatch(clearUploadSuccess());
      }, 3000);
    }
  }, [uploadSuccess, dispatch]);

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="space-y-4">
          <div className="text-4xl">📊</div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              Drop your Excel file here or click to browse
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports .xlsx and .xls files (max 10MB)
            </p>
          </div>
          
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => handleFileSelect(e.target.files[0])}
            className="hidden"
            id="file-upload"
          />
          
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors"
          >
            Choose File
          </label>
        </div>
      </div>

      {/* Selected File */}
      {selectedFile && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-700">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          
          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-3 w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
      )}

      {/* Success Message */}
      {uploadSuccess && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          File uploaded successfully! 🎉
        </div>
      )}

      <div className="mt-6 flex justify-center">
  <button
    onClick={() => navigate(-1)}
    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
  >
    Go Back
  </button>
</div>


      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;