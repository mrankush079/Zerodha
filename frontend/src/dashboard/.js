import React from "react";
import { PeopleAlt, ListAlt, BarChart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <section className="admin-panel">
      <h2>Admin Controls</h2>
      <div className="admin-buttons">
        <button onClick={() => navigate("/dashboard/admin/users")}>
          <PeopleAlt className="icon" />
          Manage Users
        </button>
        <button onClick={() => navigate("/dashboard/admin/logs")}>
          <ListAlt className="icon" />
          View Logs
        </button>
        <button onClick={() => navigate("/dashboard/admin/analytics")}>
          <BarChart className="icon" />
          Analytics
        </button>
      </div>
    </section>
  );
};

export default AdminPanel;








