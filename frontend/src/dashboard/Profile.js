import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Profile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL || "http://localhost:3003";
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId || userId === "undefined") {
      toast.error("User ID missing. Please log in again.");
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API}/user/${userId}`);
        setUser(res.data);
        setForm(res.data);
      } catch (err) {
        toast.error("Failed to load profile.");
        console.error("Profile fetch error:", err.message);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${API}/user/${userId}`, form);
      setUser(res.data);
      setEditing(false);
      toast.success("Profile updated.");
    } catch (err) {
      toast.error("Update failed.");
      console.error("Profile update error:", err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged out.");
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <h3 className="title">Profile</h3>

      <div className="profile-card">
        <img
          src={user.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt="Avatar"
          className="profile-avatar"
        />

        <div className="profile-info">
          <label>Name:</label>
          {editing ? (
            <input
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          ) : (
            <p>{user.name}</p>
          )}

          <label>Username:</label>
          <p>{user.username}</p>

          <label>Role:</label>
          <p>{user.role}</p>

          <label>Mobile:</label>
          {editing ? (
            <input
              value={form.mobile || ""}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            />
          ) : (
            <p>{user.mobile || "—"}</p>
          )}

          <label>Avatar URL:</label>
          {editing ? (
            <input
              value={form.avatar || ""}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            />
          ) : (
            <p>{user.avatar || "—"}</p>
          )}
        </div>

        <div className="profile-actions">
          {editing ? (
            <>
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditing(true)}>Edit Profile</button>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* ✅ Portfolio Summary Card */}
      <div className="portfolio-card">
        <h4>Portfolio Summary</h4>
        <div className="portfolio-stats">
          <div className="stat-box">
            <label>Total Investment</label>
            <p>₹{user.totalInvestment || "0.00"}</p>
          </div>
          <div className="stat-box">
            <label>Current Value</label>
            <p>₹{user.currentValue || "0.00"}</p>
          </div>
          <div className="stat-box">
            <label>Profit / Loss</label>
            <p className={user.pnl >= 0 ? "profit" : "loss"}>
              ₹{user.pnl || "0.00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;