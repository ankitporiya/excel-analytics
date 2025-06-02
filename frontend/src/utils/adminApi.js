const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Get all files
export const getAllFiles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/files`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};

// Delete file
export const deleteFile = async (fileId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/files/${fileId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete file');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Get storage usage
export const getStorageUsage = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/storage`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch storage usage');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching storage usage:', error);
    throw error;
  }
};



// //////////////////////////////////////////////////////////////////////
// export const getChartStats = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/admin/charts/stats`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`, // ✅ Important
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch chart stats: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching chart stats:', error);
//     throw error;
//   }
// };

// export const getAllCharts = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/admin/charts`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch charts: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching charts:', error);
//     throw error;
//   }
// };

// export const deleteChart = async (chartId) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/admin/charts/${chartId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to delete chart: ${response.status}`);
//     }

//     // Return true for successful deletion, or the response data if API returns content
//     const contentType = response.headers.get('content-type');
//     if (contentType && contentType.includes('application/json')) {
//       return await response.json();
//     }
    
//     return true;
//   } catch (error) {
//     console.error('Error deleting chart:', error);
//     throw error;
//   }
// };