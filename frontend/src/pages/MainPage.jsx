// // src/pages/MainPage.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/userSlice";
// // import store from './redux/store';

// const MainPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.user);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   return (
//     <div
//       className="min-h-screen"
//       style={{
//         background: "linear-gradient(135deg, #bde8f1 0%, #f2f2f0 100%)",
//       }}
//     >
//       {/* Header */}
//       <header
//         className="bg-white shadow-sm"
//         style={{ backgroundColor: "#f2f2f0" }}
//       >
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold" style={{ color: "#0d0d0d" }}>
//               Excel Analytics - User Dashboard
//             </h1>
//             <div className="flex items-center space-x-4">
//               <div className="text-right">
//                 <p className="font-semibold" style={{ color: "#0d0d0d" }}>
//                   {user?.name}
//                 </p>
//                 <p className="text-sm" style={{ color: "#819fa7" }}>
//                   User
//                 </p>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
//                 style={{
//                   backgroundColor: "#5b6e74",
//                   color: "#f2f2f0",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.target.style.backgroundColor = "#819fa7")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.target.style.backgroundColor = "#5b6e74")
//                 }
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Upload Excel File Card */}
//           <div
//             className="bg-white rounded-lg shadow-lg p-6"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <div className="text-center">
//               <div className="text-4xl mb-4">📊</div>
//               <h3
//                 className="text-xl font-semibold mb-2"
//                 style={{ color: "#0d0d0d" }}
//               >
//                 Upload Excel File
//               </h3>
//               <p className="mb-4" style={{ color: "#819fa7" }}>
//                 Upload your Excel files for analysis
//               </p>
//               <button
//                 className="w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-300"
//                 style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
//                 onMouseEnter={(e) =>
//                   (e.target.style.backgroundColor = "#819fa7")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.target.style.backgroundColor = "#5b6e74")
//                 }
//               >
//                 Upload File
//               </button>
//             </div>
//           </div>

//           {/* Data Visualization Card */}
//           <div
//             className="bg-white rounded-lg shadow-lg p-6"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <div className="text-center">
//               <div className="text-4xl mb-4">📈</div>
//               <h3
//                 className="text-xl font-semibold mb-2"
//                 style={{ color: "#0d0d0d" }}
//               >
//                 Create Charts
//               </h3>
//               <p className="mb-4" style={{ color: "#819fa7" }}>
//                 Visualize your data with interactive charts
//               </p>
//               <button
//                 className="w-full py-2 px-4 rounded-lg font-semibold border-2 transition-colors duration-300"
//                 style={{ borderColor: "#5b6e74", color: "#5b6e74" }}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = "#5b6e74";
//                   e.target.style.color = "#f2f2f0";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = "transparent";
//                   e.target.style.color = "#5b6e74";
//                 }}
//               >
//                 Create Chart
//               </button>
//             </div>
//           </div>

//           {/* Analysis History Card */}
//           <div
//             className="bg-white rounded-lg shadow-lg p-6"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <div className="text-center">
//               <div className="text-4xl mb-4">📋</div>
//               <h3
//                 className="text-xl font-semibold mb-2"
//                 style={{ color: "#0d0d0d" }}
//               >
//                 Analysis History
//               </h3>
//               <p className="mb-4" style={{ color: "#819fa7" }}>
//                 View your previous analyses
//               </p>
//               <button
//                 className="w-full py-2 px-4 rounded-lg font-semibold border-2 transition-colors duration-300"
//                 style={{ borderColor: "#5b6e74", color: "#5b6e74" }}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = "#5b6e74";
//                   e.target.style.color = "#f2f2f0";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = "transparent";
//                   e.target.style.color = "#5b6e74";
//                 }}
//               >
//                 View History
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold mb-6" style={{ color: "#0d0d0d" }}>
//             Recent Activity
//           </h2>
//           <div
//             className="bg-white rounded-lg shadow-lg p-6"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <div className="text-center py-8">
//               <div className="text-6xl mb-4" style={{ color: "#bde8f1" }}>
//                 📄
//               </div>
//               <p className="text-lg" style={{ color: "#819fa7" }}>
//                 No recent activity
//               </p>
//               <p style={{ color: "#819fa7" }}>
//                 Upload your first Excel file to get started
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MainPage;










// // src/pages/MainPage.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/userSlice";

// const MainPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.user);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   return (
//     <div
//       className="min-h-screen"
//       style={{
//         background: "linear-gradient(135deg, #bde8f1 0%, #f2f2f0 100%)",
//       }}
//     >
//       {/* Header */}
//       <header
//         className="bg-white shadow-sm"
//         style={{ backgroundColor: "#f2f2f0" }}
//       >
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold" style={{ color: "#0d0d0d" }}>
//               Excel Analytics - User Dashboard
//             </h1>
//             <div className="flex items-center space-x-4">
//               <div className="text-right">
//                 <p className="font-semibold" style={{ color: "#0d0d0d" }}>
//                   {user?.name}
//                 </p>
//                 <p className="text-sm" style={{ color: "#819fa7" }}>
//                   User
//                 </p>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
//                 style={{
//                   backgroundColor: "#5b6e74",
//                   color: "#f2f2f0",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.target.style.backgroundColor = "#819fa7")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.target.style.backgroundColor = "#5b6e74")
//                 }
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto my-center px-4 py-8">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Upload Excel File Card */}
//           <div
//             className="bg-white rounded-lg shadow-lg p-6"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <div className="text-center">
//               <div className="text-4xl mb-4">📊</div>
//               <h3
//                 className="text-xl font-semibold mb-2"
//                 style={{ color: "#0d0d0d" }}
//               >
//                 Upload Excel File
//               </h3>
//               <p className="mb-4" style={{ color: "#819fa7" }}>
//                 Upload your Excel files for analysis
//               </p>
//               <button
//                 onClick={() => navigate("/upload")}
//                 className="w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-300"
//                 style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
//                 onMouseEnter={(e) =>
//                   (e.target.style.backgroundColor = "#819fa7")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.target.style.backgroundColor = "#5b6e74")
//                 }
//               >
//                 Upload File
//               </button>
//             </div>
//           </div>

//           {/* Data Visualization Card */}
//           <div
//             className="bg-white rounded-lg shadow-lg p-6"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <div className="text-center">
//               <div className="text-4xl mb-4">📈</div>
//               <h3
//                 className="text-xl font-semibold mb-2"
//                 style={{ color: "#0d0d0d" }}
//               >
//                 Create Charts
//               </h3>
//               <p className="mb-4" style={{ color: "#819fa7" }}>
//                 Visualize your data with interactive charts
//               </p>
//               <button
//                 onClick={() => navigate("/charts")}
//                 className="w-full py-2 px-4 rounded-lg font-semibold border-2 transition-colors duration-300"
//                 style={{ borderColor: "#5b6e74", color: "#5b6e74" }}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = "#5b6e74";
//                   e.target.style.color = "#f2f2f0";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = "transparent";
//                   e.target.style.color = "#5b6e74";
//                 }}
//               >
//                 Create Chart
//               </button>
//             </div>
//           </div>

//           {/* Analysis History Card */}
//           <div
//             className="bg-white rounded-lg shadow-lg p-6"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <div className="text-center">
//               <div className="text-4xl mb-4">📋</div>
//               <h3
//                 className="text-xl font-semibold mb-2"
//                 style={{ color: "#0d0d0d" }}
//               >
//                 Analysis History
//               </h3>
//               <p className="mb-4" style={{ color: "#819fa7" }}>
//                 View your previous analyses
//               </p>
//               <button
//                 onClick={() => navigate("/history")}
//                 className="w-full py-2 px-4 rounded-lg font-semibold border-2 transition-colors duration-300"
//                 style={{ borderColor: "#5b6e74", color: "#5b6e74" }}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = "#5b6e74";
//                   e.target.style.color = "#f2f2f0";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = "transparent";
//                   e.target.style.color = "#5b6e74";
//                 }}
//               >
//                 View History
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 space-y-6">
//           <h1 className="text-3xl font-bold text-center text-[#5b6e74]">
//             {" "}
//             Welcome to Excel Analytics Platform
//           </h1>
//           <p className="text-lg text-gray-700 text-center">
//             Unlock insights from your Excel files with powerful data
//             visualization and analytics tools.
//           </p>

//           <div className="space-y-4">
//             <h2 className="text-2xl font-semibold text-[#5b6e74]">
//               📈 What You Can Do
//             </h2>
//             <ul className="list-disc list-inside space-y-2 text-gray-700">
//               <li>
//                 🔐 <strong>Secure Login:</strong> Register and access your
//                 personalized dashboard.
//               </li>
//               <li>
//                 📤 <strong>Upload Excel Files:</strong> Easily upload{" "}
//                 <code>.xls</code> or <code>.xlsx</code> files.
//               </li>
//               <li>
//                 📊 <strong>Visualize Data:</strong> Generate interactive 2D & 3D
//                 charts.
//               </li>
//               <li>
//                 ⚙️ <strong>Dynamic Axes Selection:</strong> Choose columns as X
//                 & Y axes on the fly.
//               </li>
//               <li>
//                 🧠 <strong>Smart Insights (AI):</strong> Get automated summaries
//                 and suggestions (optional).
//               </li>
//               <li>
//                 🕓 <strong>Track History:</strong> View all your uploads and
//                 analysis history.
//               </li>
//               <li>
//                 📥 <strong>Download Charts:</strong> Export charts as PNG or
//                 PDF.
//               </li>
//             </ul>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MainPage;








//with amination
// src/pages/MainPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { motion } from "framer-motion";

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const welcomeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #f8fff8 0%, #e6f3e6 50%, #f0f8f0 100%)",
      }}
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg"
        style={{ 
          backgroundColor: "#f0f8f0",
          boxShadow: "0 4px 12px rgba(34, 139, 34, 0.4)"
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.h1 
              className="text-xl sm:text-2xl font-bold text-center sm:text-left" 
              style={{ color: "#228B22" }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Excel Analytics - User Dashboard
            </motion.h1>
            <div className="flex items-center space-x-4">
              <div className="text-center sm:text-right">
                <p className="font-semibold" style={{ color: "#228B22" }}>
                  {user?.name}
                </p>
                <p className="text-sm" style={{ color: "#228B22" }}>
                  User
                </p>
              </div>
              <motion.button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
                style={{
                  backgroundColor: "#228B22",
                  color: "#f0f8f0",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#32CD32")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#228B22")
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto my-center px-4 py-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Upload Excel File Card */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f0f8f0" }}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(34, 139, 34, 0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <motion.div 
                className="text-4xl mb-4"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                📊
              </motion.div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#228B22" }}
              >
                Upload Excel File
              </h3>
              <p className="mb-4" style={{ color: "#228B22" }}>
                Upload your Excel files for analysis
              </p>
              <motion.button
                onClick={() => navigate("/upload")}
                className="w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-300"
                style={{ backgroundColor: "#228B22", color: "#f0f8f0" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#32CD32")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#228B22")
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Upload File
              </motion.button>
            </div>
          </motion.div>

          {/* Data Visualization Card */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f0f8f0" }}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(34, 139, 34, 0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <motion.div 
                className="text-4xl mb-4"
                animate={{ 
                  y: [0, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                📈
              </motion.div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#228B22" }}
              >
                Create Charts
              </h3>
              <p className="mb-4" style={{ color: "#228B22" }}>
                Visualize your data with interactive charts
              </p>
              <motion.button
                onClick={() => navigate("/charts")}
                className="w-full py-2 px-4 rounded-lg font-semibold border-2 transition-colors duration-300"
                style={{ borderColor: "#228B22", color: "#228B22" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#228B22";
                  e.target.style.color = "#f0f8f0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#228B22";
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Create Chart
              </motion.button>
            </div>
          </motion.div>

          {/* Analysis History Card */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f0f8f0" }}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(34, 139, 34, 0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <motion.div 
                className="text-4xl mb-4"
                animate={{ 
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              >
                📋
              </motion.div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#228B22" }}
              >
                Analysis History
              </h3>
              <p className="mb-4" style={{ color: "#228B22" }}>
                View your previous analyses
              </p>
              <motion.button
                onClick={() => navigate("/history")}
                className="w-full py-2 px-4 rounded-lg font-semibold border-2 transition-colors duration-300"
                style={{ borderColor: "#228B22", color: "#228B22" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#228B22";
                  e.target.style.color = "#f0f8f0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#228B22";
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                View History
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8 mt-10 space-y-6"
          style={{ backgroundColor: "#f8fff8" }}
          variants={welcomeVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-2xl sm:text-3xl font-bold text-center"
            style={{ color: "#228B22" }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Welcome to Excel Analytics Platform
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg text-center px-2"
            style={{ color: "#2d5a3d" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Unlock insights from your Excel files with powerful data
            visualization and analytics tools.
          </motion.p>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold" style={{ color: "#228B22" }}>
              📈 What You Can Do
            </h2>
            <motion.ul 
              className="list-disc list-inside space-y-2 text-sm sm:text-base"
              style={{ color: "#2d5a3d" }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.li variants={cardVariants}>
                🔐 <strong>Secure Login:</strong> Register and access your
                personalized dashboard.
              </motion.li>
              <motion.li variants={cardVariants}>
                📤 <strong>Upload Excel Files:</strong> Easily upload{" "}
                <code className="bg-green-100 px-1 rounded">.xls</code> or <code className="bg-green-100 px-1 rounded">.xlsx</code> files.
              </motion.li>
              <motion.li variants={cardVariants}>
                📊 <strong>Visualize Data:</strong> Generate interactive 2D & 3D
                charts.
              </motion.li>
              <motion.li variants={cardVariants}>
                ⚙️ <strong>Dynamic Axes Selection:</strong> Choose columns as X
                & Y axes on the fly.
              </motion.li>
              <motion.li variants={cardVariants}>
                🧠 <strong>Smart Insights (AI):</strong> Get automated summaries
                and suggestions (optional).
              </motion.li>
              <motion.li variants={cardVariants}>
                🕓 <strong>Track History:</strong> View all your uploads and
                analysis history.
              </motion.li>
              <motion.li variants={cardVariants}>
                📥 <strong>Download Charts:</strong> Export charts as PNG or
                PDF.
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default MainPage;