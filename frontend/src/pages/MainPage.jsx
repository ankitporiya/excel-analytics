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

















// src/pages/MainPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #bde8f1 0%, #f2f2f0 100%)",
      }}
    >
      {/* Header */}
      <header
        className="bg-white shadow-sm"
        style={{ backgroundColor: "#f2f2f0" }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold" style={{ color: "#0d0d0d" }}>
              Excel Analytics - User Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold" style={{ color: "#0d0d0d" }}>
                  {user?.name}
                </p>
                <p className="text-sm" style={{ color: "#819fa7" }}>
                  User
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
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
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upload Excel File Card */}
          <div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f2f2f0" }}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0d0d0d" }}
              >
                Upload Excel File
              </h3>
              <p className="mb-4" style={{ color: "#819fa7" }}>
                Upload your Excel files for analysis
              </p>
              <button
                onClick={() => navigate("/upload")}
                className="w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-300"
                style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#819fa7")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#5b6e74")
                }
              >
                Upload File
              </button>
            </div>
          </div>

          {/* Data Visualization Card */}
          <div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f2f2f0" }}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0d0d0d" }}
              >
                Create Charts
              </h3>
              <p className="mb-4" style={{ color: "#819fa7" }}>
                Visualize your data with interactive charts
              </p>
              <button
                onClick={() => navigate("/charts")}
                className="w-full py-2 px-4 rounded-lg font-semibold border-2 transition-colors duration-300"
                style={{ borderColor: "#5b6e74", color: "#5b6e74" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#5b6e74";
                  e.target.style.color = "#f2f2f0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#5b6e74";
                }}
              >
                Create Chart
              </button>
            </div>
          </div>

          {/* Analysis History Card */}
          <div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f2f2f0" }}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#0d0d0d" }}
              >
                Analysis History
              </h3>
              <p className="mb-4" style={{ color: "#819fa7" }}>
                View your previous analyses
              </p>
              <button
                onClick={() => navigate("/history")}
                className="w-full py-2 px-4 rounded-lg font-semibold border-2 transition-colors duration-300"
                style={{ borderColor: "#5b6e74", color: "#5b6e74" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#5b6e74";
                  e.target.style.color = "#f2f2f0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#5b6e74";
                }}
              >
                View History
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#0d0d0d" }}>
            Recent Activity
          </h2>
          <div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f2f2f0" }}
          >
            <div className="text-center py-8">
              <div className="text-6xl mb-4" style={{ color: "#bde8f1" }}>
                📄
              </div>
              <p className="text-lg" style={{ color: "#819fa7" }}>
                No recent activity
              </p>
              <p style={{ color: "#819fa7" }}>
                Upload your first Excel file to get started
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
