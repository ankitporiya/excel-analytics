// import React from "react";

// const RecentActivityList = ({ charts }) => {
//   if (!Array.isArray(charts) || charts.length === 0) {
//     return <p className="text-center text-gray-600">No recent activity.</p>;
//   }

//   // Sort by createdAt descending and take last 4
//   const lastFourCharts = [...charts]
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .slice(0, 4);

//   return (
//     <div className="overflow-x-auto px-6 mx-auto max-w-4xl">
//       <table className="min-w-full bg-transparent border border-black border-collapse">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border border-black">Chart Name</th>
//             <th className="px-4 py-2 border border-black">Type</th>
//           </tr>
//         </thead>
//         <tbody>
//           {lastFourCharts.map((chart) => (
//             <tr key={chart._id} className="text-center">
//               <td className="border border-black px-4 py-2">{chart.chartName}</td>
//               <td className="border border-black px-4 py-2">{chart.chartType}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RecentActivityList;
