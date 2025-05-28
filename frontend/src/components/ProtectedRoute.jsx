// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const token = useSelector((state) => state.user.token);
//   return token ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, token } = useSelector((state) => state.user);

  // Check if user is authenticated
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" />;
  }

  // Check admin access if required
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/main" />;
  }

  return children;
};

export default ProtectedRoute;
