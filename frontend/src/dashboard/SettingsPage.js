import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";


const SettingsPage = () => {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [newPassword, setNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [syncInterval, setSyncInterval] = useState(5); // in minutes

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setAvatar(preview);
      //  Upload logic here
    }
  };

  const handlePasswordChange = () => {
    //  Password update logic here
    alert("Password updated!");
    setShowModal(false);
  };

  const handleSaveSettings = () => {
    //  Save sync settings
    alert("Settings saved!");
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <p>Manage your account preferences and system configurations.</p>

      {/*  Avatar Upload */}
      <div className="settings-section">
        <label>Avatar Upload:</label>
        <div className="avatar-upload">
          <img src={avatar || "/media/images/ankush.jpg"} alt="Avatar" className="avatar-preview" />
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>
      </div>

      {/*  Password Change */}
      <div className="settings-section">
        <label>Change Password:</label>
        <button onClick={() => setShowModal(true)}>Update Password</button>
      </div>

      {/*  System Health Toggle */}
      <div className="settings-section">
        <label>System Health Monitoring:</label>
        <input
          type="checkbox"
          checked={syncEnabled}
          onChange={() => setSyncEnabled(!syncEnabled)}
        />
      </div>

      {/*  Sync Interval */}
      {syncEnabled && (
        <div className="settings-section">
          <label>Sync Interval (mins):</label>
          <input
            type="number"
            value={syncInterval}
            onChange={(e) => setSyncInterval(e.target.value)}
            min={1}
            max={60}
          />
        </div>
      )}

      {/*  Role-based Settings */}
      {user?.role === "admin" && (
        <div className="settings-section admin-only">
          <label>Admin Controls:</label>
          <button onClick={() => alert("Admin-only action triggered!")}>
            Run System Audit
          </button>
        </div>
      )}

      <button className="save-button" onClick={handleSaveSettings}>
        Save All Settings
      </button>

      {/*  Password Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Change Password</h3>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handlePasswordChange}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;