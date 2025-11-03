

import { getUserRole } from "../auth/authUtils";
import DashboardNavbar from "./DashboardNavbar";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "./spinner"; // ✅ Optional loading spinner

const Dashboard = () => {
  const role = getUserRole();
  const navigate = useNavigate();

  // ✅ Redirect if role is missing (invalid token or session expired)
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
      <Sidebar />
      <main className="dashboard-main">
        {role === "admin" ? <AdminNavbar /> : <DashboardNavbar />}
        <Outlet />
      </main>
    </section>
  );
};

export default Dashboard;