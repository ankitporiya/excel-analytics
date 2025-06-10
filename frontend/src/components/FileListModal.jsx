import React, { useState, useEffect } from "react";
import { getAllFiles, deleteFile } from "../utils/adminApi";

const FileListModal = ({ isOpen, onClose, onFileDeleted }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchFiles();
    }
  }, [isOpen]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const fileData = await getAllFiles();
      setFiles(fileData);
    } catch (error) {
      console.error("Error fetching files:", error);
      alert("Failed to fetch files");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = async (fileId, fileName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete file "${fileName}"? This will also delete all associated charts.`
      )
    ) {
      return;
    }

    setDeleting(fileId);
    try {
      await deleteFile(fileId);
      setFiles(files.filter((file) => file._id !== fileId));
      onFileDeleted();
      alert("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file");
    } finally {
      setDeleting(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[80vh] overflow-hidden"
        style={{ backgroundColor: "#f0f8f0" }}
      >
        <div className="p-6 border-b" style={{ borderColor: "#bde8f1" }}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold" style={{ color: "#0d0d0d" }}>
              File Management
            </h2>
            <button
              onClick={onClose}
              className="text-2xl font-bold hover:opacity-70"
              style={{ color: "#5b6e74" }}
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="text-center py-8">
              <div className="text-2xl" style={{ color: "#bde8f1" }}>
                ⏳
              </div>
              <p style={{ color: "#819fa7" }}>Loading files...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4" style={{ color: "#bde8f1" }}>
                📁
              </div>
              <p style={{ color: "#819fa7" }}>No files found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: "#bde8f1" }}>
                    <th
                      className="text-left py-3 px-4 font-semibold"
                      style={{ color: "#0d0d0d" }}
                    >
                      File Name
                    </th>
                    <th
                      className="text-left py-3 px-4 font-semibold"
                      style={{ color: "#0d0d0d" }}
                    >
                      User
                    </th>
                    <th
                      className="text-left py-3 px-4 font-semibold"
                      style={{ color: "#0d0d0d" }}
                    >
                      Size
                    </th>
                    <th
                      className="text-left py-3 px-4 font-semibold"
                      style={{ color: "#0d0d0d" }}
                    >
                      Uploaded
                    </th>
                    <th
                      className="text-left py-3 px-4 font-semibold"
                      style={{ color: "#0d0d0d" }}
                    >
                      Status
                    </th>
                    <th
                      className="text-left py-3 px-4 font-semibold"
                      style={{ color: "#0d0d0d" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr
                      key={file._id}
                      className="border-b"
                      style={{ borderColor: "#bde8f1" }}
                    >
                      <td className="py-3 px-4" style={{ color: "#0d0d0d" }}>
                        <div className="flex items-center">
                          <span className="mr-2">📄</span>
                          {file.fileName || file.originalFileName}
                        </div>
                      </td>
                      <td className="py-3 px-4" style={{ color: "#819fa7" }}>
                        {file.user
                          ? file.user.name || file.user.email
                          : file.userId
                          ? file.userId.name || file.userId.email
                          : "Unknown"}
                      </td>
                      <td className="py-3 px-4" style={{ color: "#819fa7" }}>
                        {formatFileSize(file.fileSize || file.size)}
                      </td>
                      <td className="py-3 px-4" style={{ color: "#819fa7" }}>
                        {new Date(
                          file.uploadDate || file.uploadedAt
                        ).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4" style={{ color: "#819fa7" }}>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            file.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : file.status === "processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : file.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {file.status || "Unknown"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() =>
                            handleDeleteFile(
                              file._id,
                              file.fileName || file.originalFileName
                            )
                          }
                          disabled={deleting === file._id}
                          className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300 disabled:opacity-50"
                          style={{
                            backgroundColor:
                              deleting === file._id ? "#ccc" : "#dc3545",
                            color: "#fff",
                          }}
                          onMouseEnter={(e) => {
                            if (deleting !== file._id) {
                              e.target.style.backgroundColor = "#c82333";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (deleting !== file._id) {
                              e.target.style.backgroundColor = "#dc3545";
                            }
                          }}
                        >
                          {deleting === file._id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileListModal;
