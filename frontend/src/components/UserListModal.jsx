import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../utils/adminApi';

const UserListModal = ({ isOpen, onClose, onUserDeleted }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userData = await getAllUsers();
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete user "${userName}"? This will also delete all their files and charts.`)) {
      return;
    }

    setDeleting(userId);
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
      onUserDeleted();
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    } finally {
      setDeleting(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden" style={{ backgroundColor: "#f2f2f0" }}>
        <div className="p-6 border-b" style={{ borderColor: "#bde8f1" }}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold" style={{ color: "#0d0d0d" }}>User Management</h2>
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
              <div className="text-2xl" style={{ color: "#bde8f1" }}>⏳</div>
              <p style={{ color: "#819fa7" }}>Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4" style={{ color: "#bde8f1" }}>👥</div>
              <p style={{ color: "#819fa7" }}>No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: "#bde8f1" }}>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: "#0d0d0d" }}>Name</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: "#0d0d0d" }}>Email</th>
                    {/* <th className="text-left py-3 px-4 font-semibold" style={{ color: "#0d0d0d" }}>Joined</th>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: "#0d0d0d" }}>Last Login</th> */}
                    <th className="text-right py-3 px-4 font-semibold" style={{ color: "#0d0d0d" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b" style={{ borderColor: "#bde8f1" }}>
                      <td className="py-3 px-4" style={{ color: "#0d0d0d" }}>{user.name}</td>
                      <td className="py-3 px-4" style={{ color: "#819fa7" }}>{user.email}</td>
                      {/* <td className="py-3 px-4" style={{ color: "#819fa7" }}>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4" style={{ color: "#819fa7" }}>
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                      </td> */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(user._id, user.name)}
                          disabled={deleting === user._id}
                          className="px-3 py-1 rounded text-sm font-medium transition-colors duration-300 disabled:opacity-50"
                          style={{ 
                            backgroundColor: deleting === user._id ? "#ccc" : "#dc3545", 
                            color: "#fff" 
                          }}
                          onMouseEnter={(e) => {
                            if (deleting !== user._id) {
                              e.target.style.backgroundColor = "#c82333";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (deleting !== user._id) {
                              e.target.style.backgroundColor = "#dc3545";
                            }
                          }}
                        >
                          {deleting === user._id ? 'Deleting...' : 'Delete'}
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

export default UserListModal;