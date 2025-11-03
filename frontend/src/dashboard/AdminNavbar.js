import { NavLink } from "react-router-dom";

const AdminNavbar = () => (
  <nav className="admin-navbar">
    <NavLink to="/dashboard/admin" end>Admin Panel</NavLink>
    <NavLink to="/dashboard/admin/users">Manage Users</NavLink>
    <NavLink to="/dashboard/admin/logs">System Logs</NavLink>
    <NavLink to="/dashboard/admin/analytics">Analytics</NavLink>
  </nav>
);

export default AdminNavbar;