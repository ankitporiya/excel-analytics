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
