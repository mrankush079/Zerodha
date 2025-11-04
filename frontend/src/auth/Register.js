

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios"; //  Use centralized Axios instance
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      toast.success(" Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(" Registration error:", err.response?.data || err.message);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Registration failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="register-card animated-card">
        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">Join Zerodha today</p>

        <input
          className="register-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="register-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="register-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="register-button" onClick={handleRegister} disabled={loading}>
          {loading ? <span className="spinner" /> : "Register"}
        </button>

        <div className="login-link" onClick={() => navigate("/login")}>
          Already have an account? Login
        </div>
      </div>
    </div>
  );
}

export default Register;