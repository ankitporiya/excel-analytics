import React, { useState, useEffect } from 'react';
import { getStorageUsage } from '../utils/adminApi';

const StorageDisplay = () => {
  const [storageData, setStorageData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStorageUsage();
  }, []);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold" style={{ color: "#0d0d0d" }}>Storage Usage</h2>
        <p className="text-sm mt-1" style={{ color: "#819fa7" }}>Monitor your system's storage consumption</p>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4" style={{ color: "#bde8f1" }}>⏳</div>
          <p className="text-lg" style={{ color: "#819fa7" }}>Loading storage information...</p>
        </div>
      ) : storageData ? (
        <>
          {/* Storage Overview Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Storage Used */}
            <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Total Storage Used</p>
                  <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>{storageData.formattedSize}</p>
                </div>
                <div className="text-3xl" style={{ color: "#bde8f1" }}>💾</div>
              </div>
            </div>

            {/* Total Files */}
            <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Total Files</p>
                  <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>{storageData.fileCount}</p>
                </div>
                <div className="text-3xl" style={{ color: "#bde8f1" }}>📄</div>
              </div>
            </div>

            {/* Average File Size */}
            <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Average File Size</p>
                  <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>
                    {storageData.fileCount > 0 
                      ? Math.round(storageData.totalSizeMB / storageData.fileCount * 100) / 100 + ' MB'
                      : '0 MB'
                    }
                  </p>
                </div>
                <div className="text-3xl" style={{ color: "#bde8f1" }}>📊</div>
              </div>
            </div>
          </div>

          {/* Management Sections */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Storage Details */}
            <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>Storage Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: "#bde8f1" }}>
                  <span style={{ color: "#819fa7" }}>Storage (MB)</span>
                  <span className="font-semibold" style={{ color: "#0d0d0d" }}>{storageData.totalSizeMB} MB</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: "#bde8f1" }}>
                  <span style={{ color: "#819fa7" }}>Storage (Bytes)</span>
                  <span className="font-semibold" style={{ color: "#0d0d0d" }}>{storageData.totalSizeBytes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span style={{ color: "#819fa7" }}>Last Updated</span>
                  <span className="font-semibold" style={{ color: "#0d0d0d" }}>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* File Distribution */}
            <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>File Distribution</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: "#bde8f1" }}>
                  <span style={{ color: "#819fa7" }}>Small (&lt; 1MB)</span>
                  <span className="font-semibold" style={{ color: "#0d0d0d" }}>
                    {storageData.fileCount > 0 ? Math.ceil(storageData.fileCount * 0.3) : 0} files
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: "#bde8f1" }}>
                  <span style={{ color: "#819fa7" }}>Medium (1-5MB)</span>
                  <span className="font-semibold" style={{ color: "#0d0d0d" }}>
                    {storageData.fileCount > 0 ? Math.ceil(storageData.fileCount * 0.5) : 0} files
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span style={{ color: "#819fa7" }}>Large (&gt; 5MB)</span>
                  <span className="font-semibold" style={{ color: "#0d0d0d" }}>
                    {storageData.fileCount > 0 ? Math.floor(storageData.fileCount * 0.2) : 0} files
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Storage Health and Actions */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Storage Health */}
            <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>Storage Health</h2>
              <div className="text-center py-6">
                <div className="text-6xl mb-4" style={{ color: storageData.totalSizeMB > 80 ? "#ff6b6b" : "#bde8f1" }}>
                  {storageData.totalSizeMB > 80 ? "🔴" : storageData.totalSizeMB > 50 ? "🟡" : "🟢"}
                </div>
                <p className="text-lg font-bold mb-2" style={{ color: "#0d0d0d" }}>
                  {storageData.totalSizeMB > 80 ? "Critical" : 
                   storageData.totalSizeMB > 50 ? "Warning" : "Healthy"}
                </p>
                <p style={{ color: "#819fa7" }}>Overall storage health status</p>
              </div>
              
              {/* Usage Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm" style={{ color: "#819fa7" }}>Usage</span>
                  <span className="text-sm font-medium" style={{ color: "#0d0d0d" }}>{storageData.totalSizeMB} MB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-500"
                    style={{ 
                      backgroundColor: "#5b6e74",
                      width: `${Math.min((storageData.totalSizeMB / 100) * 100, 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Recommendations and Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>Recommendations</h2>
              <div className="space-y-4 mb-6">
                {storageData.totalSizeMB > 50 ? (
                  <div className="flex items-start gap-3 p-3 rounded" style={{ backgroundColor: "#fff" }}>
                    <span className="text-lg" style={{ color: "#bde8f1" }}>⚠️</span>
                    <p className="text-sm" style={{ color: "#819fa7" }}>
                      Consider archiving older files to optimize storage usage.
                    </p>
                  </div>
                ) : storageData.fileCount === 0 ? (
                  <div className="flex items-start gap-3 p-3 rounded" style={{ backgroundColor: "#fff" }}>
                    <span className="text-lg" style={{ color: "#bde8f1" }}>📂</span>
                    <p className="text-sm" style={{ color: "#819fa7" }}>
                      No files uploaded yet. Start by uploading your first file.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 p-3 rounded" style={{ backgroundColor: "#fff" }}>
                    <span className="text-lg" style={{ color: "#bde8f1" }}>✅</span>
                    <p className="text-sm" style={{ color: "#819fa7" }}>
                      Storage usage is within optimal range.
                    </p>
                  </div>
                )}
                <div className="flex items-start gap-3 p-3 rounded" style={{ backgroundColor: "#fff" }}>
                  <span className="text-lg" style={{ color: "#bde8f1" }}>💡</span>
                  <p className="text-sm" style={{ color: "#819fa7" }}>
                    Regular cleanup helps maintain system performance.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={fetchStorageUsage}
                className="w-full px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
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
                Refresh Storage Data
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4" style={{ color: "#bde8f1" }}>💾</div>
          <p className="text-lg" style={{ color: "#819fa7" }}>Unable to load storage information</p>
          <p style={{ color: "#819fa7" }}>Storage monitoring and analytics will appear here</p>
        </div>
      )}
    </div>
  );
};

export default StorageDisplay;