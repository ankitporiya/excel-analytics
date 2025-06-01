import React, { useState, useEffect } from 'react';
import { getStorageUsage } from '../utils/adminApi';

const StorageModal = ({ isOpen, onClose }) => {
  const [storageData, setStorageData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchStorageUsage();
    }
  }, [isOpen]);

  const fetchStorageUsage = async () => {
    setLoading(true);
    try {
      const data = await getStorageUsage();
      setStorageData(data);
    } catch (error) {
      console.error('Error fetching storage usage:', error);
      alert('Failed to fetch storage usage');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden" style={{ backgroundColor: "#f2f2f0" }}>
        <div className="p-6 border-b" style={{ borderColor: "#bde8f1" }}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold" style={{ color: "#0d0d0d" }}>Storage Usage</h2>
            <button
              onClick={onClose}
              className="text-2xl font-bold hover:opacity-70"
              style={{ color: "#5b6e74" }}
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="text-2xl" style={{ color: "#bde8f1" }}>⏳</div>
              <p style={{ color: "#819fa7" }}>Loading storage information...</p>
            </div>
          ) : storageData ? (
            <div className="space-y-6">
              {/* Storage Overview */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-4" style={{ backgroundColor: "#fff" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#819fa7" }}>
                        Total Storage Used
                      </p>
                      <p className="text-2xl font-bold" style={{ color: "#0d0d0d" }}>
                        {storageData.formattedSize}
                      </p>
                    </div>
                    <div className="text-3xl" style={{ color: "#bde8f1" }}>
                      💾
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4" style={{ backgroundColor: "#fff" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#819fa7" }}>
                        Total Files
                      </p>
                      <p className="text-2xl font-bold" style={{ color: "#0d0d0d" }}>
                        {storageData.fileCount}
                      </p>
                    </div>
                    <div className="text-3xl" style={{ color: "#bde8f1" }}>
                      📄
                    </div>
                  </div>
                </div>
              </div>

              {/* Storage Details */}
              <div className="bg-white rounded-lg shadow p-4" style={{ backgroundColor: "#fff" }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: "#0d0d0d" }}>
                  Storage Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: "#bde8f1" }}>
                    <span style={{ color: "#819fa7" }}>Storage Used (MB):</span>
                    <span className="font-semibold" style={{ color: "#0d0d0d" }}>
                      {storageData.totalSizeMB} MB
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: "#bde8f1" }}>
                    <span style={{ color: "#819fa7" }}>Storage Used (Bytes):</span>
                    <span className="font-semibold" style={{ color: "#0d0d0d" }}>
                      {storageData.totalSizeBytes.toLocaleString()} bytes
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span style={{ color: "#819fa7" }}>Average File Size:</span>
                    <span className="font-semibold" style={{ color: "#0d0d0d" }}>
                      {storageData.fileCount > 0 
                        ? Math.round(storageData.totalSizeMB / storageData.fileCount * 100) / 100 + ' MB'
                        : '0 MB'
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Storage Progress Bar */}
              <div className="bg-white rounded-lg shadow p-4" style={{ backgroundColor: "#fff" }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: "#0d0d0d" }}>
                  Storage Usage Visualization
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="h-4 rounded-full transition-all duration-500"
                    style={{ 
                      backgroundColor: "#5b6e74",
                      width: `${Math.min((storageData.totalSizeMB / 100) * 100, 100)}%` // Assuming 100MB as reference
                    }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm" style={{ color: "#819fa7" }}>0 MB</span>
                  <span className="text-sm font-medium" style={{ color: "#0d0d0d" }}>
                    {storageData.totalSizeMB} MB used
                  </span>
                </div>
              </div>

              {/* Refresh Button */}
              <div className="text-center">
                <button
                  onClick={fetchStorageUsage}
                  className="px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
                  style={{
                    backgroundColor: "#5b6e74",
                    color: "#f2f2f0",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#819fa7")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#5b6e74")
                  }
                >
                  Refresh Storage Info
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4" style={{ color: "#bde8f1" }}>💾</div>
              <p style={{ color: "#819fa7" }}>Unable to load storage information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorageModal;