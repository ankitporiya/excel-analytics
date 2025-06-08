// // components/FileUpload.jsx
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'; // ⬅️ Add this
// import { uploadFile, clearError, clearUploadSuccess } from '../redux/fileSlice';


// const FileUpload = ({ onUploadSuccess }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [dragOver, setDragOver] = useState(false);
//   const dispatch = useDispatch();
//   const { loading, error, uploadSuccess } = useSelector((state) => state.files);

//   const navigate = useNavigate(); // ← THIS IS REQUIRED

//   const handleFileSelect = (file) => {
//     if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
//       setSelectedFile(file);
//       dispatch(clearError());
//     } else {
//       alert('Please select a valid Excel file (.xlsx or .xls)');
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//     const file = e.dataTransfer.files[0];
//     handleFileSelect(file);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragOver(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     const formData = new FormData();
//     formData.append('excel', selectedFile);

//     try {
//       await dispatch(uploadFile(formData)).unwrap();
//       setSelectedFile(null);
//       if (onUploadSuccess) onUploadSuccess();
//     } catch (error) {
//       console.error('Upload failed:', error);
//     }
//   };

//   React.useEffect(() => {
//     if (uploadSuccess) {
//       setTimeout(() => {
//         dispatch(clearUploadSuccess());
//       }, 3000);
//     }
//   }, [uploadSuccess, dispatch]);

//   return (
//     <div className="w-full">
//       {/* Upload Area */}
//       <div
//         className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
//           dragOver 
//             ? 'border-blue-400 bg-blue-50' 
//             : 'border-gray-300 hover:border-gray-400'
//         }`}
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//       >
//         <div className="space-y-4">
//           <div className="text-4xl">📊</div>
//           <div>
//             <p className="text-lg font-medium text-gray-700">
//               Drop your Excel file here or click to browse
//             </p>
//             <p className="text-sm text-gray-500 mt-1">
//               Supports .xlsx and .xls files (max 10MB)
//             </p>
//           </div>
          
//           <input
//             type="file"
//             accept=".xlsx,.xls"
//             onChange={(e) => handleFileSelect(e.target.files[0])}
//             className="hidden"
//             id="file-upload"
//           />
          
//           <label
//             htmlFor="file-upload"
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors"
//           >
//             Choose File
//           </label>
//         </div>
//       </div>

//       {/* Selected File */}
//       {selectedFile && (
//         <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="font-medium text-gray-700">{selectedFile.name}</p>
//               <p className="text-sm text-gray-500">
//                 {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
//               </p>
//             </div>
//             <button
//               onClick={() => setSelectedFile(null)}
//               className="text-red-500 hover:text-red-700"
//             >
//               Remove
//             </button>
//           </div>
          
//           <button
//             onClick={handleUpload}
//             disabled={loading}
//             className="mt-3 w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             {loading ? 'Uploading...' : 'Upload File'}
//           </button>
//         </div>
//       )}

//       {/* Success Message */}
//       {uploadSuccess && (
//         <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
//           File uploaded successfully! 🎉
//         </div>
//       )}

//       <div className="mt-6 flex justify-center">
//   <button
//     onClick={() => navigate(-1)}
//     className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//   >
//     Go Back
//   </button>
// </div>


//       {/* Error Message */}
//       {error && (
//         <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;























// // components/FileUpload.jsx
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { uploadFile, clearError, clearUploadSuccess } from '../redux/fileSlice';

// const FileUpload = ({ onUploadSuccess }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [dragOver, setDragOver] = useState(false);
//   const dispatch = useDispatch();
//   const { loading, error, uploadSuccess } = useSelector((state) => state.files);
//   const navigate = useNavigate();

//   const handleFileSelect = (file) => {
//     if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
//       setSelectedFile(file);
//       dispatch(clearError());
//     } else {
//       alert('Please select a valid Excel file (.xlsx or .xls)');
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//     const file = e.dataTransfer.files[0];
//     handleFileSelect(file);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragOver(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     const formData = new FormData();
//     formData.append('excel', selectedFile);

//     try {
//       await dispatch(uploadFile(formData)).unwrap();
//       setSelectedFile(null);
//       if (onUploadSuccess) onUploadSuccess();
//     } catch (error) {
//       console.error('Upload failed:', error);
//     }
//   };

//   useEffect(() => {
//     if (uploadSuccess) {
//       setTimeout(() => {
//         dispatch(clearUploadSuccess());
//       }, 3000);
//     }
//   }, [uploadSuccess, dispatch]);

//   return (
//     <div
//       className="flex justify-center items-center min-h-screen"
//       style={{
//         background: 'linear-gradient(to bottom right, #bde8f1, #ffffff)',
//       }}
//     >
//       <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-[#f2f2f0]">
//         <div
//           className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
//             dragOver
//               ? 'border-[#5b6e74] bg-[#e0f7fc]'
//               : 'border-[#819fa7] hover:border-[#5b6e74]'
//           }`}
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//         >
//           <div className="space-y-4">
//             <div className="text-4xl">📊</div>
//             <div>
//               <p className="text-lg font-medium text-[#0d0d0d]">
//                 Drop your Excel file here or click to browse
//               </p>
//               <p className="text-sm text-[#5b6e74] mt-1">
//                 Supports .xlsx and .xls files (max 10MB)
//               </p>
//             </div>

//             <input
//               type="file"
//               accept=".xlsx,.xls"
//               onChange={(e) => handleFileSelect(e.target.files[0])}
//               className="hidden"
//               id="file-upload"
//             />

//             <label
//               htmlFor="file-upload"
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#5b6e74] hover:bg-[#819fa7] cursor-pointer transition-colors"
//             >
//               Choose File
//             </label>
//           </div>
//         </div>

//         {selectedFile && (
//           <div className="mt-4 p-4 bg-[#eaf4f6] rounded-lg">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="font-medium text-[#0d0d0d]">{selectedFile.name}</p>
//                 <p className="text-sm text-[#5b6e74]">
//                   {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSelectedFile(null)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 Remove
//               </button>
//             </div>

//             <button
//               onClick={handleUpload}
//               disabled={loading}
//               className="mt-3 w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               {loading ? 'Uploading...' : 'Upload File'}
//             </button>
//           </div>
//         )}

//         {uploadSuccess && (
//           <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
//             File uploaded successfully! 🎉
//           </div>
//         )}

//         <div className="mt-6 flex justify-center">
//           <button
//             onClick={() => navigate(-1)}
//             className="py-2 px-4 bg-[#5b6e74] text-white rounded-lg hover:bg-[#819fa7] transition-colors"
//           >
//             Go Back
//           </button>
//         </div>

//         {error && (
//           <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FileUpload;















// with animation
// components/FileUpload.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadFile, clearError, clearUploadSuccess } from '../redux/fileSlice';

const FileUpload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, uploadSuccess } = useSelector((state) => state.files);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (uploadSuccess) {
      setTimeout(() => {
        dispatch(clearUploadSuccess());
      }, 3000);
    }
  }, [uploadSuccess, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1]
      }}
      className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(to bottom right, #f8fff8, #e6f3e6)',
      }}
    >
      <motion.div 
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.2,
          ease: [0.25, 0.8, 0.25, 1]
        }}
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg p-6 rounded-lg shadow-lg bg-[#f0f8f0]"
      >
        <motion.div
          animate={{
            borderColor: dragOver ? '#32CD32' : '#228B22',
            backgroundColor: dragOver ? '#90EE90' : 'transparent',
            scale: dragOver ? 1.02 : 1
          }}
          transition={{ 
            duration: 0.4,
            ease: [0.25, 0.8, 0.25, 1]
          }}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
            dragOver
              ? 'border-[#32CD32] bg-[#90EE90]'
              : 'border-[#228B22] hover:border-[#32CD32]'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="space-y-4">
            <motion.div 
              animate={{ 
                scale: dragOver ? 1.15 : 1,
                rotate: dragOver ? [0, -3, 3, 0] : 0,
                y: dragOver ? -2 : 0
              }}
              transition={{ 
                duration: 0.4,
                ease: [0.25, 0.8, 0.25, 1],
                rotate: { 
                  duration: 0.6,
                  ease: "easeInOut"
                }
              }}
              className="text-3xl sm:text-4xl"
            >
              📊
            </motion.div>
            <div>
              <p className="text-base sm:text-lg font-medium text-[#0d0d0d]">
                Drop your Excel file here or click to browse
              </p>
              <p className="text-xs sm:text-sm text-[#228B22] mt-1">
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

            <motion.label
              whileHover={{ 
                scale: 1.05,
                y: -1
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
                mass: 0.8
              }}
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#228B22] hover:bg-[#32CD32] cursor-pointer transition-colors"
            >
              Choose File
            </motion.label>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ 
                duration: 0.5,
                ease: [0.25, 0.8, 0.25, 1]
              }}
              className="mt-4 p-4 bg-[#e6f3e6] rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
                <div className="text-center sm:text-left">
                  <p className="font-medium text-[#0d0d0d] text-sm sm:text-base break-all">{selectedFile.name}</p>
                  <p className="text-xs sm:text-sm text-[#228B22]">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <motion.button
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 1
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  onClick={() => setSelectedFile(null)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </motion.button>
              </div>

              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  y: -1
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                onClick={handleUpload}
                disabled={loading}
                className="mt-3 w-full py-2 px-4 bg-[#228B22] text-white rounded-lg hover:bg-[#32CD32] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
              >
                {loading ? (
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Uploading...
                  </motion.span>
                ) : (
                  'Upload File'
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {uploadSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.9 }}
              transition={{ 
                duration: 0.5,
                ease: [0.25, 0.8, 0.25, 1]
              }}
              className="mt-4 p-4 bg-[#90EE90] border border-[#32CD32] text-[#228B22] rounded-lg text-sm sm:text-base"
            >
              <motion.span
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              >
                File uploaded successfully! 🎉
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex justify-center">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
              mass: 0.8
            }}
            onClick={() => navigate(-1)}
            className="py-2 px-4 bg-[#228B22] text-white rounded-lg hover:bg-[#32CD32] transition-colors text-sm sm:text-base"
          >
            Go Back
          </motion.button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.9 }}
              transition={{ 
                duration: 0.5,
                ease: [0.25, 0.8, 0.25, 1]
              }}
              className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm sm:text-base"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default FileUpload;