
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../utils/axios"; //  Use your Axios instance
import { getDecodedUser, logout } from "../auth/authUtils";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/auth/login", { username, password });
      const { accessToken, refreshToken } = res.data;

      if (!accessToken || !refreshToken) {
        toast.error("Login failed: missing tokens.");
        return;
      }

      //  Save tokens
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      //  Decode user info
      const user = getDecodedUser();
      if (!user || !user.id) {
        toast.error("Login failed: invalid token.");
        logout();
        return;
      }

      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.name);
      localStorage.setItem("userId", user.id);

      setUser({ name: user.name, role: user.role });
      toast.success("Login successful!");

      document.querySelector(".login-card")?.classList.add("fade-out");
      setTimeout(() => {
        navigate(user.role === "admin" ? "/dashboard/admin" : "/dashboard/home");
      }, 500);
    } catch (err) {
      console.error(" Login error:", err.response?.data || err.message);
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
        <form className="login-card" onSubmit={handleLogin}>
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

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <button type="button" className="google-button" onClick={handleGoogleLogin}>
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
        </form>
      </div>
    </>
  );
}

export default Login;