
import React, { useEffect, useState } from "react";
import api from "../auth/axiosInstance"; // ✅ Axios instance with interceptor
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

  const fetchLogs = async () => {
    try {
      const res = await api.get("/admin/logs"); // ✅ No manual token needed
      setLogs(res.data);
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
    try {
      await api.put(`/admin/logs/${id}/archive`);
      toast.success("Log archived");
      fetchLogs();
    } catch (err) {
      console.error("Archive error:", err.response?.data || err.message);
      toast.error("Failed to archive log.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this log?")) return;
    try {
      await api.delete(`/admin/logs/${id}`);
      toast.success("Log deleted");
      fetchLogs();
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      toast.error("Failed to delete log.");
    }
  };

  return (
    <div className="admin-logs">
      <h3>System Logs</h3>
      <p>This section displays system activity, login history, and trade logs.</p>

      {loading ? (
        <p>Loading logs...</p>
      ) : logs.length === 0 ? (
        <p>No logs available.</p>
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