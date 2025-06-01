// Admin Panel
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../redux/userSlice"; // Adjust path if your folder structure is different

const AdminPanel = () => {
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
              Excel Analytics - Admin Panel
            </h1>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold" style={{ color: "#0d0d0d" }}>
                  {user?.name}
                </p>
                <p className="text-sm font-medium" style={{ color: "#5b6e74" }}>
                  Administrator
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
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f2f2f0" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#819fa7" }}>
                  Total Users
                </p>
                <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>
                  0
                </p>
              </div>
              <div className="text-3xl" style={{ color: "#bde8f1" }}>
                👥
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f2f2f0" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#819fa7" }}>
                  Files Uploaded
                </p>
                <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>
                  0
                </p>
              </div>
              <div className="text-3xl" style={{ color: "#bde8f1" }}>
                📁
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f2f2f0" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#819fa7" }}>
                  Charts Created
                </p>
                <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>
                  0
                </p>
              </div>
              <div className="text-3xl" style={{ color: "#bde8f1" }}>
                📊
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f2f2f0" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#819fa7" }}>
                  Active Sessions
                </p>
                <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>
                  1
                </p>
              </div>
              <div className="text-3xl" style={{ color: "#bde8f1" }}>
                ⚡
              </div>
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* User Management */}
          <div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f2f2f0" }}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>
              User Management
            </h2>
            <div className="space-y-4">
              <div
                className="flex justify-between items-center py-3 border-b"
                style={{ borderColor: "#bde8f1" }}
              >
                <span style={{ color: "#819fa7" }}>All Users</span>
                <button
                  className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
                  style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#819fa7")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#5b6e74")
                  }
                >
                  View
                </button>
              </div>
              <div
                className="flex justify-between items-center py-3 border-b"
                style={{ borderColor: "#bde8f1" }}
              >
                <span style={{ color: "#819fa7" }}>Recent Registrations</span>
                <button
                  className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
                  style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#819fa7")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#5b6e74")
                  }
                >
                  View
                </button>
              </div>
              <div className="flex justify-between items-center py-3">
                <span style={{ color: "#819fa7" }}>User Activity</span>
                <button
                  className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
                  style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#819fa7")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#5b6e74")
                  }
                >
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f2f2f0" }}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>
              Data Management
            </h2>
            <div className="space-y-4">
              <div
                className="flex justify-between items-center py-3 border-b"
                style={{ borderColor: "#bde8f1" }}
              >
                <span style={{ color: "#819fa7" }}>All Uploaded Files</span>
                <button
                  className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
                  style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#819fa7")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#5b6e74")
                  }
                >
                  Manage
                </button>
              </div>
              <div
                className="flex justify-between items-center py-3 border-b"
                style={{ borderColor: "#bde8f1" }}
              >
                <span style={{ color: "#819fa7" }}>Storage Usage</span>
                <button
                  className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
                  style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#819fa7")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#5b6e74")
                  }
                >
                  Monitor
                </button>
              </div>
              <div className="flex justify-between items-center py-3">
                <span style={{ color: "#819fa7" }}>System Analytics</span>
                <button
                  className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
                  style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#819fa7")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#5b6e74")
                  }
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#0d0d0d" }}>
            System Activity
          </h2>
          <div
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: "#f2f2f0" }}
          >
            <div className="text-center py-8">
              <div className="text-6xl mb-4" style={{ color: "#bde8f1" }}>
                📊
              </div>
              <p className="text-lg" style={{ color: "#819fa7" }}>
                No recent system activity
              </p>
              <p style={{ color: "#819fa7" }}>
                System monitoring and analytics will appear here
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default AdminPanel;










// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { logout } from "../redux/userSlice";

// const AdminPanel = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.user);

//   // State for dashboard data
//   const [dashboardData, setDashboardData] = useState({
//     totalUsers: 0,
//     filesUploaded: 0,
//     chartsCreated: 0,
//     activeSessions: 0
//   });
  
//   const [users, setUsers] = useState([]);
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [storageInfo, setStorageInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // API base URL - adjust according to your backend
//   // const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
//   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';


//   // API helper function
//   const apiCall = async (endpoint, options = {}) => {
//     try {
//       const token = localStorage.getItem('authToken') || user?.token;
//       const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//           ...options.headers
//         },
//         ...options
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           dispatch(logout());
//           navigate('/');
//           throw new Error('Unauthorized access');
//         }
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('API call failed:', error);
//       throw error;
//     }
//   };

//   // Fetch dashboard statistics
//   const fetchDashboardStats = async () => {
//     try {
//       const stats = await apiCall('/admin/dashboard-stats');
//       setDashboardData({
//         totalUsers: stats.totalUsers || 0,
//         filesUploaded: stats.filesUploaded || 0,
//         chartsCreated: stats.chartsCreated || 0,
//         activeSessions: stats.activeSessions || 0
//       });
//     } catch (error) {
//       console.error('Failed to fetch dashboard stats:', error);
//       setError('Failed to load dashboard statistics');
//     }
//   };

//   // Fetch recent users
//   const fetchRecentUsers = async () => {
//     try {
//       const usersData = await apiCall('/admin/users?limit=5&sort=recent');
//       setUsers(usersData.users || []);
//     } catch (error) {
//       console.error('Failed to fetch users:', error);
//     }
//   };

//   // Fetch system activity
//   const fetchSystemActivity = async () => {
//     try {
//       const activity = await apiCall('/admin/system-activity?limit=10');
//       setRecentActivity(activity.activities || []);
//     } catch (error) {
//       console.error('Failed to fetch system activity:', error);
//     }
//   };

//   // Fetch storage information
//   const fetchStorageInfo = async () => {
//     try {
//       const storage = await apiCall('/admin/storage-info');
//       setStorageInfo(storage);
//     } catch (error) {
//       console.error('Failed to fetch storage info:', error);
//     }
//   };

//   // Load all data
//   const loadDashboardData = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       await Promise.all([
//         fetchDashboardStats(),
//         fetchRecentUsers(),
//         fetchSystemActivity(),
//         fetchStorageInfo()
//       ]);
//     } catch (error) {
//       setError('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Navigation handlers
//   const handleViewAllUsers = async () => {
//     try {
//       const allUsers = await apiCall('/admin/users');
//       // You can either navigate to a new route or show a modal
//       console.log('All users:', allUsers);
//       // navigate('/admin/users');
//     } catch (error) {
//       setError('Failed to load users');
//     }
//   };

//   const handleViewUserActivity = async () => {
//     try {
//       const activity = await apiCall('/admin/user-activity');
//       console.log('User activity:', activity);
//       // navigate('/admin/user-activity');
//     } catch (error) {
//       setError('Failed to load user activity');
//     }
//   };

//   const handleManageFiles = async () => {
//     try {
//       const files = await apiCall('/admin/files');
//       console.log('All files:', files);
//       // navigate('/admin/files');
//     } catch (error) {
//       setError('Failed to load files');
//     }
//   };

//   const handleMonitorStorage = async () => {
//     try {
//       const detailedStorage = await apiCall('/admin/storage-detailed');
//       console.log('Storage details:', detailedStorage);
//       // navigate('/admin/storage');
//     } catch (error) {
//       setError('Failed to load storage details');
//     }
//   };

//   const handleViewAnalytics = async () => {
//     try {
//       const analytics = await apiCall('/admin/analytics');
//       console.log('System analytics:', analytics);
//       // navigate('/admin/analytics');
//     } catch (error) {
//       setError('Failed to load analytics');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await apiCall('/auth/logout', { method: 'POST' });
//     } catch (error) {
//       console.error('Logout API call failed:', error);
//     } finally {
//       dispatch(logout());
//       navigate("/");
//     }
//   };

//   const formatBytes = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Load data on component mount
//   useEffect(() => {
//     loadDashboardData();
    
//     // Set up auto-refresh every 30 seconds
//     const interval = setInterval(fetchDashboardStats, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   if (loading && dashboardData.totalUsers === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{
//         background: "linear-gradient(135deg, #bde8f1 0%, #f2f2f0 100%)",
//       }}>
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: "#5b6e74" }}></div>
//           <p style={{ color: "#5b6e74" }}>Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

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
//               Excel Analytics - Admin Panel
//             </h1>
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={loadDashboardData}
//                 className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
//                 style={{ backgroundColor: "#bde8f1", color: "#5b6e74" }}
//                 disabled={loading}
//               >
//                 {loading ? "Refreshing..." : "Refresh"}
//               </button>
//               <div className="text-right">
//                 <p className="font-semibold" style={{ color: "#0d0d0d" }}>
//                   {user?.name}
//                 </p>
//                 <p className="text-sm font-medium" style={{ color: "#5b6e74" }}>
//                   Administrator
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

//       {/* Error Banner */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 mt-4 rounded">
//           <div className="flex justify-between items-center">
//             <span>{error}</span>
//             <button
//               onClick={() => setError(null)}
//               className="ml-4 text-red-500 hover:text-red-700"
//             >
//               ×
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         {/* Stats Cards */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div
//             className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium" style={{ color: "#819fa7" }}>
//                   Total Users
//                 </p>
//                 <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>
//                   {dashboardData.totalUsers.toLocaleString()}
//                 </p>
//               </div>
//               <div className="text-3xl" style={{ color: "#bde8f1" }}>
//                 👥
//               </div>
//             </div>
//           </div>

//           <div
//             className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium" style={{ color: "#819fa7" }}>
//                   Files Uploaded
//                 </p>
//                 <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>
//                   {dashboardData.filesUploaded.toLocaleString()}
//                 </p>
//               </div>
//               <div className="text-3xl" style={{ color: "#bde8f1" }}>
//                 📁
//               </div>
//             </div>
//           </div>

//           <div
//             className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium" style={{ color: "#819fa7" }}>
//                   Charts Created
//                 </p>
//                 <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>
//                   {dashboardData.chartsCreated.toLocaleString()}
//                 </p>
//               </div>
//               <div className="text-3xl" style={{ color: "#bde8f1" }}>
//                 📊
//               </div>
//             </div>
//           </div>

//           <div
//             className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium" style={{ color: "#819fa7" }}>
//                   Active Sessions
//                 </p>
//                 <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>
//                   {dashboardData.activeSessions}
//                 </p>
//               </div>
//               <div className="text-3xl" style={{ color: "#bde8f1" }}>
//                 ⚡
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Storage Info Card */}
//         {storageInfo && (
//           <div className="mb-8">
//             <div
//               className="bg-white rounded-lg shadow-lg p-6"
//               style={{ backgroundColor: "#f2f2f0" }}
//             >
//               <h3 className="text-lg font-bold mb-3" style={{ color: "#0d0d0d" }}>
//                 Storage Usage
//               </h3>
//               <div className="flex justify-between items-center mb-2">
//                 <span style={{ color: "#819fa7" }}>
//                   {formatBytes(storageInfo.used)} of {formatBytes(storageInfo.total)} used
//                 </span>
//                 <span style={{ color: "#5b6e74" }}>
//                   {Math.round((storageInfo.used / storageInfo.total) * 100)}%
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="h-2 rounded-full"
//                   style={{
//                     backgroundColor: "#5b6e74",
//                     width: `${Math.min((storageInfo.used / storageInfo.total) * 100, 100)}%`
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Management Sections */}
//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* User Management */}
//           <div
//             className="bg-white rounded-lg shadow-lg p-6"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>
//               User Management
//             </h2>
//             <div className="space-y-4">
//               <div
//                 className="flex justify-between items-center py-3 border-b"
//                 style={{ borderColor: "#bde8f1" }}
//               >
//                 <span style={{ color: "#819fa7" }}>All Users</span>
//                 <button
//                   onClick={handleViewAllUsers}
//                   className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
//                   style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
//                   onMouseEnter={(e) =>
//                     (e.target.style.backgroundColor = "#819fa7")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.target.style.backgroundColor = "#5b6e74")
//                   }
//                 >
//                   View
//                 </button>
//               </div>
//               <div
//                 className="flex justify-between items-center py-3 border-b"
//                 style={{ borderColor: "#bde8f1" }}
//               >
//                 <span style={{ color: "#819fa7" }}>Recent Registrations</span>
//                 <button
//                   onClick={fetchRecentUsers}
//                   className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
//                   style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
//                   onMouseEnter={(e) =>
//                     (e.target.style.backgroundColor = "#819fa7")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.target.style.backgroundColor = "#5b6e74")
//                   }
//                 >
//                   View
//                 </button>
//               </div>
//               <div className="flex justify-between items-center py-3">
//                 <span style={{ color: "#819fa7" }}>User Activity</span>
//                 <button
//                   onClick={handleViewUserActivity}
//                   className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
//                   style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
//                   onMouseEnter={(e) =>
//                     (e.target.style.backgroundColor = "#819fa7")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.target.style.backgroundColor = "#5b6e74")
//                   }
//                 >
//                   View
//                 </button>
//               </div>
//             </div>

//             {/* Recent Users Display */}
//             {users.length > 0 && (
//               <div className="mt-6">
//                 <h3 className="text-sm font-medium mb-3" style={{ color: "#5b6e74" }}>
//                   Recent Users
//                 </h3>
//                 <div className="space-y-2">
//                   {users.slice(0, 3).map((user, index) => (
//                     <div
//                       key={user.id || index}
//                       className="flex justify-between items-center text-sm"
//                     >
//                       <span style={{ color: "#819fa7" }}>{user.name}</span>
//                       <span style={{ color: "#5b6e74" }}>
//                         {formatDate(user.createdAt)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Data Management */}
//           <div
//             className="bg-white rounded-lg shadow-lg p-6"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>
//               Data Management
//             </h2>
//             <div className="space-y-4">
//               <div
//                 className="flex justify-between items-center py-3 border-b"
//                 style={{ borderColor: "#bde8f1" }}
//               >
//                 <span style={{ color: "#819fa7" }}>All Uploaded Files</span>
//                 <button
//                   onClick={handleManageFiles}
//                   className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
//                   style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
//                   onMouseEnter={(e) =>
//                     (e.target.style.backgroundColor = "#819fa7")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.target.style.backgroundColor = "#5b6e74")
//                   }
//                 >
//                   Manage
//                 </button>
//               </div>
//               <div
//                 className="flex justify-between items-center py-3 border-b"
//                 style={{ borderColor: "#bde8f1" }}
//               >
//                 <span style={{ color: "#819fa7" }}>Storage Usage</span>
//                 <button
//                   onClick={handleMonitorStorage}
//                   className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
//                   style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
//                   onMouseEnter={(e) =>
//                     (e.target.style.backgroundColor = "#819fa7")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.target.style.backgroundColor = "#5b6e74")
//                   }
//                 >
//                   Monitor
//                 </button>
//               </div>
//               <div className="flex justify-between items-center py-3">
//                 <span style={{ color: "#819fa7" }}>System Analytics</span>
//                 <button
//                   onClick={handleViewAnalytics}
//                   className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
//                   style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
//                   onMouseEnter={(e) =>
//                     (e.target.style.backgroundColor = "#819fa7")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.target.style.backgroundColor = "#5b6e74")
//                   }
//                 >
//                   View
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Recent Activities */}
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold mb-6" style={{ color: "#0d0d0d" }}>
//             System Activity
//           </h2>
//           <div
//             className="bg-white rounded-lg shadow-lg p-6"
//             style={{ backgroundColor: "#f2f2f0" }}
//           >
//             {recentActivity.length > 0 ? (
//               <div className="space-y-4">
//                 {recentActivity.map((activity, index) => (
//                   <div
//                     key={activity.id || index}
//                     className="flex justify-between items-center py-3 border-b"
//                     style={{ borderColor: "#bde8f1" }}
//                   >
//                     <div>
//                       <p style={{ color: "#0d0d0d" }}>{activity.description}</p>
//                       <p className="text-sm" style={{ color: "#819fa7" }}>
//                         {activity.user} • {formatDate(activity.timestamp)}
//                       </p>
//                     </div>
//                     <span
//                       className={`px-2 py-1 rounded text-xs font-medium ${
//                         activity.type === 'error' 
//                           ? 'bg-red-100 text-red-800'
//                           : activity.type === 'warning'
//                           ? 'bg-yellow-100 text-yellow-800'
//                           : 'bg-green-100 text-green-800'
//                       }`}
//                     >
//                       {activity.type}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <div className="text-6xl mb-4" style={{ color: "#bde8f1" }}>
//                   📊
//                 </div>
//                 <p className="text-lg" style={{ color: "#819fa7" }}>
//                   No recent system activity
//                 </p>
//                 <p style={{ color: "#819fa7" }}>
//                   System monitoring and analytics will appear here
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminPanel;