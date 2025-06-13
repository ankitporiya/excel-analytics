// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "../redux/userSlice";
import apiService from "../services/api";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await apiService.login({
        email: formData.email,
        password: formData.password,
      });

      dispatch(loginSuccess(response));

      // Navigate based on role
      if (response.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/main");
      }
    } catch (error) {
      dispatch(loginFailure(error.message || "Login failed"));
    }
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #f8fff8 0%, #e6f3e6 50%, #f0f8f0 100%)",
      }}
    >
      <div
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        style={{
          backgroundColor: "#f8fff8",
          boxShadow: "0 20px 40px rgba(34, 139, 34, 0.1)",
        }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold" style={{ color: "#228B22" }}>
            Welcome Back
          </h2>
          <p className="mt-2" style={{ color: "#228B22" }}>
            Sign in to your account
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 border border-red-400 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#228B22" }}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md"
              style={{
                borderColor: "#90EE90",
                focusRingColor: "#32CD32",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#32CD32";
                e.target.style.boxShadow = "0 0 0 3px rgba(50, 205, 50, 0.2)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#90EE90";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "translateY(0)";
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#228B22" }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md"
              style={{
                borderColor: "#90EE90",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#32CD32";
                e.target.style.boxShadow = "0 0 0 3px rgba(50, 205, 50, 0.2)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#90EE90";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "translateY(0)";
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#228B22" }}
            >
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 hover:shadow-md"
              style={{
                borderColor: "#90EE90",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#32CD32";
                e.target.style.boxShadow = "0 0 0 3px rgba(50, 205, 50, 0.2)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#90EE90";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            style={{ backgroundColor: loading ? "#90EE90" : "#228B22" }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = "#32CD32";
                e.target.style.transform = "translateY(-2px) scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = "#228B22";
                e.target.style.transform = "translateY(0) scale(1)";
              }
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p style={{ color: "#228B22" }}>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-semibold hover:underline"
              style={{ color: "#32CD32" }}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

/////////////////////without animation
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../redux/userSlice';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:5000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         localStorage.setItem('token', data.token);
//         dispatch(loginSuccess(data));
//         navigate('/dashboard');
//       } else {
//         alert(data.msg);
//       }
//     } catch (err) {
//       alert('Login failed');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin} className="p-4">
//       <h2 className="text-xl mb-4">Login</h2>
//       <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="block mb-2" />
//       <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="block mb-2" />
//       <button type="submit" className="bg-blue-500 text-white px-4 py-1">Login</button>
//     </form>
//   );
// };

// export default Login;

// // src/pages/Login.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   clearError,
// } from "../redux/userSlice";
// import apiService from "../services/api";

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.user);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "user",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(loginStart());

//     try {
//       const response = await apiService.login({
//         email: formData.email,
//         password: formData.password,
//       });

//       dispatch(loginSuccess(response));

//       // Navigate based on role
//       if (response.user.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/main");
//       }
//     } catch (error) {
//       dispatch(loginFailure(error.message || "Login failed"));
//     }
//   };

//   useEffect(() => {
//     dispatch(clearError());
//   }, [dispatch]);

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4"
//       style={{
//         background: "linear-gradient(135deg, #bde8f1 0%, #f2f2f0 100%)",
//       }}
//     >
//       <div
//         className="max-w-md w-full bg-white rounded-lg shadow-xl p-8"
//         style={{ backgroundColor: "#f2f2f0" }}
//       >
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold" style={{ color: "#0d0d0d" }}>
//             Welcome Back
//           </h2>
//           <p className="mt-2" style={{ color: "#819fa7" }}>
//             Sign in to your account
//           </p>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 rounded bg-red-100 border border-red-400 text-red-700">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label
//               className="block text-sm font-medium mb-2"
//               style={{ color: "#5b6e74" }}
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               style={{ borderColor: "#819fa7" }}
//             />
//           </div>

//           <div>
//             <label
//               className="block text-sm font-medium mb-2"
//               style={{ color: "#5b6e74" }}
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               style={{ borderColor: "#819fa7" }}
//             />
//           </div>

//           <div>
//             <label
//               className="block text-sm font-medium mb-2"
//               style={{ color: "#5b6e74" }}
//             >
//               Role
//             </label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               style={{ borderColor: "#819fa7" }}
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-300"
//             style={{ backgroundColor: loading ? "#819fa7" : "#5b6e74" }}
//             onMouseEnter={(e) =>
//               !loading && (e.target.style.backgroundColor = "#819fa7")
//             }
//             onMouseLeave={(e) =>
//               !loading && (e.target.style.backgroundColor = "#5b6e74")
//             }
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p style={{ color: "#819fa7" }}>
//             Don't have an account?{" "}
//             <button
//               onClick={() => navigate("/register")}
//               className="font-semibold hover:underline"
//               style={{ color: "#5b6e74" }}
//             >
//               Sign up
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
