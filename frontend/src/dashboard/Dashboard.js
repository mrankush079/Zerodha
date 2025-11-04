import { useState } from "react";
import { getUserRole } from "../auth/authUtils";
import DashboardNavbar from "./DashboardNavbar";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "./spinner"; // Optional loading spinner

const Dashboard = () => {
  const role = getUserRole();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect if role is missing (invalid token or session expired)
  if (!role) {
    navigate("/login");
    return (
      <div className="dashboard-loading">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="dashboard-container">
      {/* ✅ Sidebar with toggle */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <Sidebar />
      </div>

      {/* ✅ Main content */}
      <main className="dashboard-main">
        {/* ✅ Hamburger for mobile */}
        <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </div>

        {/* ✅ Role-based navbar */}
        {role === "admin" ? <AdminNavbar /> : <DashboardNavbar />}

        {/* ✅ Nested routes */}
        <Outlet />
      </main>
    </section>
  );
};

export default Dashboard;