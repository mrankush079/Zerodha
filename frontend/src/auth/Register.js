// src/auth/Register.js

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import "./Register.css"; // Optional styling

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const API = process.env.REACT_APP_API_URL;
      await axios.post(`${API}/auth/register`, {
        username,
        email,
        password,
      });

      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Registration failed. Please try again.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
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

        {message && <div className="register-message">{message}</div>}
      </div>
    </div>
  );
}

export default Register;