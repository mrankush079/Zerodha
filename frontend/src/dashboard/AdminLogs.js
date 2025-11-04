

import React, { useEffect, useState } from "react";
import api from "../auth/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import {
  AccessTime,
  Person,
  BugReport,
  Archive,
  Delete,
} from "@mui/icons-material";

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock log data for testing
  const mockLogs = [
    {
      _id: "log1",
      type: "LOGIN",
      user: "ankush@admin",
      time: new Date().toISOString(),
      message: "User logged in successfully",
    },
    {
      _id: "log2",
      type: "TRADE",
      user: "ankush@admin",
      symbol: "TCS",
      qty: 10,
      time: new Date().toISOString(),
      message: "Executed buy order",
    },
    {
      _id: "log3",
      type: "ERROR",
      user: "ankush@admin",
      time: new Date().toISOString(),
      message: "Failed to fetch holdings",
    },
  ];

  const fetchLogs = async () => {
    try {
      //  Replace API call with mock data
      setLogs(mockLogs);
    } catch (err) {
      console.error("Log fetch error:", err.response?.data || err.message);
      toast.error("Failed to load system logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const renderIcon = (type) => {
    switch (type) {
      case "LOGIN":
        return <Person className="log-icon login" />;
      case "TRADE":
        return <AccessTime className="log-icon trade" />;
      case "ERROR":
        return <BugReport className="log-icon error" />;
      default:
        return <span className="log-icon">🔔</span>;
    }
  };

  const handleArchive = async (id) => {
    toast.success(`Log ${id} archived`);
    // Simulate archive by filtering out the log
    setLogs((prev) => prev.filter((log) => log._id !== id));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this log?")) return;
    toast.success(`Log ${id} deleted`);
    // Simulate delete by filtering out the log
    setLogs((prev) => prev.filter((log) => log._id !== id));
  };

  return (
    <div className="admin-logs">
      <h3>System Logs</h3>
      <p>This section displays system activity, login history, and trade logs.</p>

      {loading ? (
        <p>Loading logs...</p>
      ) : logs.length === 0 ? (
        <div className="empty-logs">
          <i className="fas fa-info-circle"></i>
          <p>No logs available at the moment.</p>
        </div>
      ) : (
        <ul className="log-list">
          {logs.map((log, i) => (
            <li key={i} className={`log-item ${log.type?.toLowerCase()}`}>
              {renderIcon(log.type)}
              <div className="log-details">
                <strong>{log.type}</strong>{" "}
                {log.user && <span className="log-user">by {log.user}</span>}
                {log.symbol && <span className="log-symbol">• {log.symbol}</span>}
                {log.qty && <span className="log-qty">• Qty: {log.qty}</span>}
                {log.message && <span className="log-msg">• {log.message}</span>}
                <div className="log-time">
                  {new Date(log.time).toLocaleString()}
                </div>
              </div>
              <div className="log-actions">
                <button onClick={() => handleArchive(log._id)} title="Archive">
                  <Archive />
                </button>
                <button onClick={() => handleDelete(log._id)} title="Delete">
                  <Delete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AdminLogs;