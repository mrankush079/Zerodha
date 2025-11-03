
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const { setUser } = useAuth();
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!username || !password) {
//       toast.error("Please enter both username and password.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const API = process.env.REACT_APP_API_URL || "http://localhost:3002";
//       const res = await axios.post(`${API}/auth/login`, { username, password });

//       const { accessToken, refreshToken, role, name, userId } = res.data;

//       console.log("Login response:", res.data); // ✅ Debug log

//       if (!userId || userId === "undefined") {
//         toast.error("Login failed: user ID missing.");
//         setLoading(false);
//         return;
//       }

//       // ✅ Save tokens and user info
//       localStorage.setItem("token", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);
//       localStorage.setItem("role", role);
//       localStorage.setItem("name", name);
//       localStorage.setItem("userId", userId);

//       setUser({ name, role });
//       toast.success("Login successful!");

//       document.querySelector(".login-card")?.classList.add("fade-out");
//       setTimeout(() => {
//         navigate(role === "admin" ? "/dashboard/admin" : "/dashboard/home");
//       }, 500);
//     } catch (err) {
//       const errorMsg =
//         err.response?.data?.message ||
//         err.response?.data ||
//         "Login failed. Please try again.";
//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     toast.info("Google login coming soon!");
//   };

//   return (
//     <>
//       <ToastContainer position="top-center" autoClose={3000} />
//       <div className="login-wrapper">
//         <div className="login-card">
//           <img
//             src="https://zerodha.com/static/images/logo.svg"
//             alt="Zerodha Logo"
//             className="login-logo"
//           />
//           <h2 className="login-title">Login</h2>
//           <p className="login-subtitle">Welcome back! Please enter your credentials.</p>

//           <div className="floating-group">
//             <input
//               id="username"
//               className="floating-input"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder=" "
//               required
//             />
//             <label htmlFor="username">Username</label>
//           </div>

//           <div className="floating-group">
//             <input
//               id="password"
//               className="floating-input"
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder=" "
//               required
//             />
//             <label htmlFor="password">Password</label>
//             <span
//               className="toggle-password"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "🙈 Hide" : "👁️ Show"}
//             </span>
//           </div>

//           <button className="login-button" onClick={handleLogin} disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <button className="google-button" onClick={handleGoogleLogin}>
//             <img
//               src="https://developers.google.com/identity/images/g-logo.png"
//               alt="Google"
//               className="google-icon"
//             />
//             Continue with Google
//           </button>

//           <div className="forgot-link" onClick={() => navigate("/forgot-password")}>
//             Forgot password?
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

















import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const API = process.env.REACT_APP_API_URL || "http://localhost:3002";
      const res = await axios.post(`${API}/auth/login`, { username, password });

      const { accessToken, refreshToken, role, name, userId } = res.data;

      if (!userId || userId === "undefined") {
        toast.error("Login failed: user ID missing.");
        setLoading(false);
        return;
      }

      // ✅ Save tokens and user info
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("userId", userId);

      setUser({ name, role });
      toast.success("Login successful!");

      document.querySelector(".login-card")?.classList.add("fade-out");
      setTimeout(() => {
        navigate(role === "admin" ? "/dashboard/admin" : "/dashboard/home");
      }, 500);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Login failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google login coming soon!");
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="login-wrapper">
        <div className="login-card">
          <img
            src="https://zerodha.com/static/images/logo.svg"
            alt="Zerodha Logo"
            className="login-logo"
          />
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">Welcome back! Please enter your credentials.</p>

          <div className="floating-group">
            <input
              id="username"
              className="floating-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="username">Username</label>
          </div>

          <div className="floating-group">
            <input
              id="password"
              className="floating-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="password">Password</label>
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈 Hide" : "👁️ Show"}
            </span>
          </div>

          <button className="login-button" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <button className="google-button" onClick={handleGoogleLogin}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="google-icon"
            />
            Continue with Google
          </button>

          <div className="forgot-link" onClick={() => navigate("/forgot-password")}>
            Forgot password?
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;