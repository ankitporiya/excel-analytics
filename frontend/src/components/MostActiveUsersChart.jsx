// import React, { useState } from 'react';

// const MostActiveUsersChart = ({ stats }) => {
//   const [hoveredUser, setHoveredUser] = useState(null);

//   // Color palette for the bars
//   const colors = [
//     '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
//     '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C',
//     '#8DD1E1', '#D084D0'
//   ];

//   if (!stats?.topUsers || stats.topUsers.length === 0) {
//     return (
//       <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
//         <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>
//           Most Active Users
//         </h2>
//         <div className="flex items-center justify-center h-64" style={{ color: "#819fa7" }}>
//           No user data available
//         </div>
//       </div>
//     );
//   }

//   // Prepare data
//   const userData = stats.topUsers.map((user, index) => ({
//     ...user,
//     color: colors[index % colors.length],
//     index
//   }));

//   const maxCharts = Math.max(...userData.map(user => user.chartCount));
//   const totalCharts = userData.reduce((sum, user) => sum + user.chartCount, 0);

//   // Get user initials for avatars
//   const getUserInitials = (name) => {
//     return name
//       .split(' ')
//       .map(word => word.charAt(0))
//       .join('')
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   return (
//     <div className="bg-white rounded-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
 
      
//       <div className="space-y-4">
//         {userData.map((user, index) => {
//           const percentage = (user.chartCount / maxCharts) * 100;
//           const isHovered = hoveredUser === index;

//           return (
//             <div
//               key={index}
//               className="relative cursor-pointer transition-all duration-300"
//               onMouseEnter={() => setHoveredUser(index)}
//               onMouseLeave={() => setHoveredUser(null)}
//               style={{
//                 transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
//               }}
//             >
//               {/* User info and bar container */}
//               <div className="flex items-center gap-4 mb-2">
//                 {/* Avatar */}
//                 <div 
//                   className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
//                   style={{ backgroundColor: user.color }}
//                 >
//                   {getUserInitials(user.userName)}
//                 </div>

//                 {/* User details */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between mb-1">
//                     <div>
//                       <h3 className="font-semibold truncate" style={{ color: "#0d0d0d" }}>
//                         {user.userName}
//                       </h3>
//                       <p className="text-xs truncate" style={{ color: "#819fa7" }}>
//                         {user.userEmail}
//                       </p>
//                     </div>
//                     <div className="text-right ml-4">
//                       <span className="font-bold text-lg" style={{ color: "#0d0d0d" }}>
//                         {user.chartCount}
//                       </span>
//                       <span className="text-sm ml-1" style={{ color: "#819fa7" }}>
//                         charts
//                       </span>
//                     </div>
//                   </div>

//                   {/* Progress bar */}
//                   <div className="relative">
//                     <div 
//                       className="h-3 rounded-full transition-all duration-500"
//                       style={{ backgroundColor: '#e5e7eb' }}
//                     >
//                       <div
//                         className="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
//                         style={{ 
//                           width: `${percentage}%`, 
//                           backgroundColor: user.color,
//                           boxShadow: isHovered ? `0 0 10px ${user.color}40` : 'none'
//                         }}
//                       >
//                         {/* Animated shine effect */}
//                         <div 
//                           className="absolute top-0 left-0 h-full w-full opacity-30"
//                           style={{
//                             background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
//                             animation: isHovered ? 'shine 1.5s ease-in-out infinite' : 'none'
//                           }}
//                         />
//                       </div>
//                     </div>

//                     {/* Percentage label */}
//                     <div 
//                       className="absolute left-0 bottom-0 transform translate-y-5 text-xs font-medium transition-opacity duration-300"
//                       style={{ 
//                         color: user.color,
//                         opacity: isHovered ? 1 : 0
//                       }}
//                     >
//                       {((user.chartCount / totalCharts) * 100).toFixed(1)}% of total
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Rank badge */}
//               <div 
//                 className="absolute -left-2 top-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-300"
//                 style={{ 
//                   backgroundColor: index < 3 ? '#FFD700' : '#C0C0C0',
//                   transform: isHovered ? 'scale(1.1)' : 'scale(1)',
//                   boxShadow: isHovered ? '0 2px 8px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.1)'
//                 }}
//               >
//                 {index + 1}
//               </div>

//               {/* Hover tooltip */}
//               {isHovered && (
//                 <div 
//                   className="absolute right-0 top-0 bg-white p-2 rounded-lg shadow-lg border z-10 pointer-events-none"
//                   style={{ 
//                     borderColor: '#bde8f1',
//                     transform: 'translateX(100%) translateX(8px)'
//                   }}
//                 >
//                   <div className="text-xs whitespace-nowrap">
//                     <div className="font-semibold" style={{ color: '#0d0d0d' }}>
//                       Rank #{index + 1}
//                     </div>
//                     <div style={{ color: '#819fa7' }}>
//                       {((user.chartCount / totalCharts) * 100).toFixed(1)}% of total
//                     </div>
//                     <div style={{ color: '#819fa7' }}>
//                       {user.chartCount} / {totalCharts} charts
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Summary Statistics */}
//       <div className="mt-8 pt-6 border-t" style={{ borderColor: '#bde8f1' }}>
//         <div className="grid grid-cols-3 gap-4 text-center">
//           <div>
//             <div className="text-xl font-bold" style={{ color: '#0d0d0d' }}>
//               {userData.length}
//             </div>
//             <div className="text-sm" style={{ color: '#819fa7' }}>
//               Active Users
//             </div>
//           </div>
//           <div>
//             <div className="text-xl font-bold" style={{ color: '#0d0d0d' }}>
//               {totalCharts}
//             </div>
//             <div className="text-sm" style={{ color: '#819fa7' }}>
//               Total Charts
//             </div>
//           </div>
//           <div>
//             <div className="text-xl font-bold" style={{ color: '#0d0d0d' }}>
//               {Math.round(totalCharts / userData.length)}
//             </div>
//             <div className="text-sm" style={{ color: '#819fa7' }}>
//               Avg per User
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CSS for animations */}
//       <style jsx>{`
//         @keyframes shine {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default MostActiveUsersChart;




import React, { useState } from 'react';

const MostActiveUsersChart = ({ stats }) => {
  const [hoveredUser, setHoveredUser] = useState(null);
  const [showAllModal, setShowAllModal] = useState(false);

  // Color palette for the bars
  const colors = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
    '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C',
    '#8DD1E1', '#D084D0'
  ];

  if (!stats?.topUsers || stats.topUsers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6" style={{ backgroundColor: "#f2f2f0" }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: "#0d0d0d" }}>
          Most Active Users
        </h2>
        <div className="flex items-center justify-center h-64" style={{ color: "#819fa7" }}>
          No user data available
        </div>
      </div>
    );
  }

  // Prepare data
  const userData = stats.topUsers.map((user, index) => ({
    ...user,
    color: colors[index % colors.length],
    index
  }));

  const maxCharts = Math.max(...userData.map(user => user.chartCount));
  const totalCharts = userData.reduce((sum, user) => sum + user.chartCount, 0);
  const displayedUsers = userData.slice(0, 4);
  const remainingUsers = userData.slice(4);

  // Get user initials for avatars
  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // User Row Component
  const UserRow = ({ user, index, isModal = false }) => {
    const percentage = (user.chartCount / maxCharts) * 100;
    const isHovered = hoveredUser === index;

    return (
      <div
        key={index}
        className="relative cursor-pointer transition-all duration-300"
        onMouseEnter={() => setHoveredUser(index)}
        onMouseLeave={() => setHoveredUser(null)}
        style={{
          transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
        }}
      >
        {/* User info and bar container */}
        <div className="flex items-center gap-4 mb-2">
          {/* Avatar */}
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: user.color }}
          >
            {getUserInitials(user.userName)}
          </div>

          {/* User details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div>
                <h3 className="font-semibold truncate" style={{ color: "#0d0d0d" }}>
                  {user.userName}
                </h3>
                <p className="text-xs truncate" style={{ color: "#819fa7" }}>
                  {user.userEmail}
                </p>
              </div>
              <div className="text-right ml-4">
                <span className="font-bold text-lg" style={{ color: "#0d0d0d" }}>
                  {user.chartCount}
                </span>
                <span className="text-sm ml-1" style={{ color: "#819fa7" }}>
                  charts
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative">
              <div 
                className="h-3 rounded-full transition-all duration-500"
                style={{ backgroundColor: '#e5e7eb' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                  style={{ 
                    width: `${percentage}%`, 
                    backgroundColor: user.color,
                    boxShadow: isHovered ? `0 0 10px ${user.color}40` : 'none'
                  }}
                >
                  {/* Animated shine effect */}
                  <div 
                    className="absolute top-0 left-0 h-full w-full opacity-30"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                      animation: isHovered ? 'shine 1.5s ease-in-out infinite' : 'none'
                    }}
                  />
                </div>
              </div>

              {/* Percentage label */}
              <div 
                className="absolute left-0 bottom-0 transform translate-y-5 text-xs font-medium transition-opacity duration-300"
                style={{ 
                  color: user.color,
                  opacity: isHovered ? 1 : 0
                }}
              >
                {((user.chartCount / totalCharts) * 100).toFixed(1)}% of total
              </div>
            </div>
          </div>
        </div>

        {/* Rank badge */}
        <div 
          className="absolute -left-2 top-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-300"
          style={{ 
            backgroundColor: index < 3 ? '#FFD700' : '#C0C0C0',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            boxShadow: isHovered ? '0 2px 8px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          {index + 1}
        </div>

        {/* Hover tooltip */}
        {isHovered && !isModal && (
          <div 
            className="absolute right-0 top-0 bg-white p-2 rounded-lg shadow-lg border z-10 pointer-events-none"
            style={{ 
              borderColor: '#bde8f1',
              transform: 'translateX(100%) translateX(8px)'
            }}
          >
            <div className="text-xs whitespace-nowrap">
              <div className="font-semibold" style={{ color: '#0d0d0d' }}>
                Rank #{index + 1}
              </div>
              <div style={{ color: '#819fa7' }}>
                {((user.chartCount / totalCharts) * 100).toFixed(1)}% of total
              </div>
              <div style={{ color: '#819fa7' }}>
                {user.chartCount} / {totalCharts} charts
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg p-6" style={{ backgroundColor: "#f0f8f0" }}>
        <div className="flex items-center justify-between mb-6">
          {/* <h2 className="text-xl font-bold" style={{ color: "#0d0d0d" }}>
            Most Active Users
          </h2> */}
          {remainingUsers.length > 0 && (
            <button
              onClick={() => setShowAllModal(true)}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ 
                backgroundColor: '#0088FE',
                color: 'white',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#0066CC';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#0088FE';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              View All ({userData.length})
            </button>
          )}
        </div>
        
        <div className="space-y-4">
          {displayedUsers.map((user, index) => (
            <UserRow key={index} user={user} index={index} />
          ))}
        </div>

        {/* Summary Statistics */}
        <div className="mt-8 pt-6 border-t" style={{ borderColor: '#bde8f1' }}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold" style={{ color: '#0d0d0d' }}>
                {userData.length}
              </div>
              <div className="text-sm" style={{ color: '#819fa7' }}>
                Active Users
              </div>
            </div>
            <div>
              <div className="text-xl font-bold" style={{ color: '#0d0d0d' }}>
                {totalCharts}
              </div>
              <div className="text-sm" style={{ color: '#819fa7' }}>
                Total Charts
              </div>
            </div>
            <div>
              <div className="text-xl font-bold" style={{ color: '#0d0d0d' }}>
                {Math.round(totalCharts / userData.length)}
              </div>
              <div className="text-sm" style={{ color: '#819fa7' }}>
                Avg per User
              </div>
            </div>
          </div>
        </div>

        {/* CSS for animations */}
        <style jsx>{`
          @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>

      {/* Modal */}
      {showAllModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAllModal(false)}
          
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            style={{ backgroundColor: "#f0f8f0" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header f0f8f0*/}
            <div className="top-0 bg-white p-6 border-b" style={{ backgroundColor: "#f0f8f0", borderColor: '#bde8f1' }}>
              <div className="flex items-center justify-between" >
                <h2 className="text-2xl font-bold" style={{ color: "#0d0d0d" }}>
                  All Active Users ({userData.length})
                </h2>
                <button
                  onClick={() => setShowAllModal(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                  style={{ backgroundColor: '#e5e7eb', color: '#6b7280' }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#d1d5db';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6" sstyle={{ backgroundColor: "#f0f8f0" }}>
              <div className="space-y-4" style={{ backgroundColor: "#f0f8f0" }}>
                {userData.map((user, index) => (
                  <UserRow key={index} user={user} index={index} isModal={true} />
                ))}
              </div>

              {/* Modal Summary */}
              <div className="mt-8 pt-6 border-t" style={{ borderColor: '#bde8f1' }}>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold" style={{ color: '#0d0d0d' }}>
                      {userData.length}
                    </div>
                    <div className="text-sm" style={{ color: '#819fa7' }}>
                      Total Users
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-bold" style={{ color: '#0d0d0d' }}>
                      {totalCharts}
                    </div>
                    <div className="text-sm" style={{ color: '#819fa7' }}>
                      Total Charts
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-bold" style={{ color: '#0d0d0d' }}>
                      {Math.round(totalCharts / userData.length)}
                    </div>
                    <div className="text-sm" style={{ color: '#819fa7' }}>
                      Avg per User
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MostActiveUsersChart;