import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:3003";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const { name, email, password, mobile } = formData;

    if (!name || !email || !password || !/^\d{10}$/.test(mobile)) {
      setMessage("Please fill all fields correctly.");
      return;
    }

    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password,
          role: "user",
          name,
          mobile,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Signup successful! OTP sent to +91${mobile}`);
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card animated-signup">
        <h2 className="signup-title">Create Your Zerodha Account</h2>
        <p className="signup-subtitle">
          Start trading and investing with powerful platforms.
        </p>

        <input
          className="signup-input"
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          className="signup-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="signup-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          className="signup-input"
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          maxLength="10"
          value={formData.mobile}
          onChange={handleChange}
        />

        <button className="signup-button" onClick={handleSubmit}>
          Continue
        </button>

        {message && <div className="signup-message">{message}</div>}

        <div className="signup-footer">
          <p>Already have an account?</p>
          <button
            className="signup-login-link"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;