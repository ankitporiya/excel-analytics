// import React, { useState, useEffect } from 'react';
// import { getChartStats, getAllCharts, deleteChart } from '../utils/adminApi';

// const ChartAnalysis = () => {
//   const [stats, setStats] = useState(null);
//   const [charts, setCharts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedChart, setSelectedChart] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [chartToDelete, setChartToDelete] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [statsResponse, chartsResponse] = await Promise.all([
//         getChartStats(),
//         getAllCharts()
//       ]);
//       setStats(statsResponse);
//       setCharts(chartsResponse);
//     } catch (error) {
//       console.error('Error fetching chart data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteChart = async (chart) => {
//     setChartToDelete(chart);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await deleteChart(chartToDelete._id);
//       setCharts(charts.filter(chart => chart._id !== chartToDelete._id));
//       setShowDeleteModal(false);
//       setChartToDelete(null);
//       fetchData(); // Refresh stats
//     } catch (error) {
//       console.error('Error deleting chart:', error);
//       alert('Failed to delete chart');
//     }
//   };

//   const getChartTypeIcon = (type) => {
//     const icons = {
//       bar: '📊',
//       line: '📈',
//       pie: '🥧',
//       scatter: '🔸',
//       column3d: '📊'
//     };
//     return icons[type] || '📊';
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center py-8">
//           <div className="text-6xl mb-4" style={{ color: "#bde8f1" }}>📊</div>
//           <p className="text-lg" style={{ color: "#819fa7" }}>Loading chart analysis...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold" style={{ color: "#0d0d0d" }}>Chart Analysis</h2>
//         <p className="text-sm mt-1" style={{ color: "#819fa7" }}>Monitor and analyze chart creation and usage</p>
//       </div>

//       {/* Statistics Cards */}
//       {stats && (
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Total Charts</p>
//                 <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>{stats.totalCharts}</p>
//               </div>
//               <div className="text-3xl" style={{ color: "#bde8f1" }}>📊</div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Recent Charts</p>
//                 <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>{stats.recentCharts}</p>
//                 <p className="text-xs" style={{ color: "#819fa7" }}>Last 30 days</p>
//               </div>
//               <div className="text-3xl" style={{ color: "#bde8f1" }}>📈</div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Chart Types</p>
//                 <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>{stats.chartsByType.length}</p>
//               </div>
//               <div className="text-3xl" style={{ color: "#bde8f1" }}>🎨</div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Active Users</p>
//                 <p className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>{stats.topUsers.length}</p>
//               </div>
//               <div className="text-3xl" style={{ color: "#bde8f1" }}>👥</div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Chart Type Distribution and Top Users */}
//       <div className="grid lg:grid-cols-2 gap-8 mb-8">
//         {/* Chart Types */}
//         <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
//           <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>Charts by Type</h2>
//           <div className="space-y-4">
//             {stats?.chartsByType.map((type, index) => (
//               <div key={index} className="flex justify-between items-center py-3 border-b" style={{ borderColor: "#bde8f1" }}>
//                 <div className="flex items-center gap-2">
//                   <span className="text-lg">{getChartTypeIcon(type._id)}</span>
//                   <span style={{ color: "#819fa7" }}>{type._id.charAt(0).toUpperCase() + type._id.slice(1)}</span>
//                 </div>
//                 <span className="font-semibold" style={{ color: "#0d0d0d" }}>{type.count}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Top Users */}
//         <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
//           <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>Most Active Users</h2>
//           <div className="space-y-4">
//             {stats?.topUsers.map((user, index) => (
//               <div key={index} className="flex justify-between items-center py-3 border-b" style={{ borderColor: "#bde8f1" }}>
//                 <div>
//                   <span className="font-medium" style={{ color: "#0d0d0d" }}>{user.userName}</span>
//                   <p className="text-xs" style={{ color: "#819fa7" }}>{user.userEmail}</p>
//                 </div>
//                 <span className="font-semibold" style={{ color: "#0d0d0d" }}>{user.chartCount} charts</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Charts List */}
//       <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
//         <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>All Charts</h2>
        
//         {charts.length === 0 ? (
//           <div className="text-center py-8">
//             <div className="text-6xl mb-4" style={{ color: "#bde8f1" }}>📊</div>
//             <p className="text-lg" style={{ color: "#819fa7" }}>No charts found</p>
//             <p style={{ color: "#819fa7" }}>Charts will appear here when users create them</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b" style={{ borderColor: "#bde8f1" }}>
//                   <th className="text-left py-3 px-4" style={{ color: "#0d0d0d" }}>Chart Name</th>
//                   <th className="text-left py-3 px-4" style={{ color: "#0d0d0d" }}>Type</th>
//                   <th className="text-left py-3 px-4" style={{ color: "#0d0d0d" }}>User</th>
//                   <th className="text-left py-3 px-4" style={{ color: "#0d0d0d" }}>File</th>
//                   <th className="text-left py-3 px-4" style={{ color: "#0d0d0d" }}>Created</th>
//                   <th className="text-left py-3 px-4" style={{ color: "#0d0d0d" }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {charts.map((chart) => (
//                   <tr key={chart._id} className="border-b hover:bg-white transition-colors" style={{ borderColor: "#bde8f1" }}>
//                     <td className="py-3 px-4">
//                       <div className="font-medium" style={{ color: "#0d0d0d" }}>{chart.chartName}</div>
//                       <div className="text-xs" style={{ color: "#819fa7" }}>
//                         X: {chart.xAxis}, Y: {chart.yAxis}
//                       </div>
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="flex items-center gap-2">
//                         <span className="text-lg">{getChartTypeIcon(chart.chartType)}</span>
//                         <span style={{ color: "#819fa7" }}>{chart.chartType}</span>
//                       </div>
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="font-medium" style={{ color: "#0d0d0d" }}>{chart.userId?.name}</div>
//                       <div className="text-xs" style={{ color: "#819fa7" }}>{chart.userId?.email}</div>
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="font-medium" style={{ color: "#0d0d0d" }}>{chart.fileId?.originalName}</div>
//                       <div className="text-xs" style={{ color: "#819fa7" }}>
//                         {chart.fileId?.uploadDate ? formatDate(chart.fileId.uploadDate) : 'N/A'}
//                       </div>
//                     </td>
//                     <td className="py-3 px-4" style={{ color: "#819fa7" }}>
//                       {formatDate(chart.createdDate)}
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => setSelectedChart(chart)}
//                           className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
//                           style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
//                           onMouseEnter={(e) => (e.target.style.backgroundColor = "#819fa7")}
//                           onMouseLeave={(e) => (e.target.style.backgroundColor = "#5b6e74")}
//                         >
//                           View
//                         </button>
//                         <button
//                           onClick={() => handleDeleteChart(chart)}
//                           className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300"
//                           style={{ backgroundColor: "#dc3545", color: "#fff" }}
//                           onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
//                           onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Chart Details Modal */}
//       {selectedChart && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4" style={{ backgroundColor: "#f2f2f0" }}>
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold" style={{ color: "#0d0d0d" }}>Chart Details</h3>
//               <button
//                 onClick={() => setSelectedChart(null)}
//                 className="text-2xl" style={{ color: "#819fa7" }}
//               >
//                 ×
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Chart Name</p>
//                   <p className="font-semibold" style={{ color: "#0d0d0d" }}>{selectedChart.chartName}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Chart Type</p>
//                   <p className="font-semibold" style={{ color: "#0d0d0d" }}>{selectedChart.chartType}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium" style={{ color: "#819fa7" }}>X-Axis</p>
//                   <p className="font-semibold" style={{ color: "#0d0d0d" }}>{selectedChart.xAxis}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Y-Axis</p>
//                   <p className="font-semibold" style={{ color: "#0d0d0d" }}>{selectedChart.yAxis}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Created By</p>
//                   <p className="font-semibold" style={{ color: "#0d0d0d" }}>{selectedChart.userId?.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium" style={{ color: "#819fa7" }}>Created Date</p>
//                   <p className="font-semibold" style={{ color: "#0d0d0d" }}>{formatDate(selectedChart.createdDate)}</p>
//                 </div>
//               </div>
              
//               <div>
//                 <p className="text-sm font-medium mb-2" style={{ color: "#819fa7" }}>Source File</p>
//                 <p className="font-semibold" style={{ color: "#0d0d0d" }}>{selectedChart.fileId?.originalName}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" style={{ backgroundColor: "#f2f2f0" }}>
//             <h3 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>Confirm Delete</h3>
//             <p className="mb-6" style={{ color: "#819fa7" }}>
//               Are you sure you want to delete the chart "{chartToDelete?.chartName}"? This action cannot be undone.
//             </p>
//             <div className="flex gap-4">
//               <button
//                 onClick={confirmDelete}
//                 className="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
//                 style={{ backgroundColor: "#dc3545", color: "#fff" }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#c82333")}
//                 onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
//                 style={{ backgroundColor: "#5b6e74", color: "#f2f2f0" }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = "#819fa7")}
//                 onMouseLeave={(e) => (e.target.style.backgroundColor = "#5b6e74")}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChartAnalysis;