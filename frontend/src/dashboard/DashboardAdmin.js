// import React from "react";
// import AdminNavbar from "./AdminNavbar"; // Optional: if you have a navbar
// import { Outlet } from "react-router-dom";

// const DashboardAdmin = () => {
//   return (
//     <div className="dashboard-admin">
//       <h2>Admin Panel</h2>

//       {/* Optional: top navigation */}
//       <AdminNavbar />

//       {/* ✅ This renders nested routes like /users, /logs, /analytics */}
//       <Outlet />
//     </div>
//   );
// };

// export default DashboardAdmin;




// import React from "react";
// import { Outlet } from "react-router-dom";
// import { getUserRole } from "../auth/authUtils";
// import Sidebar from "./Sidebar";
// import DashboardNavbar from "./DashboardNavbar";
// import AdminNavbar from "./AdminNavbar";

// const Dashboard = () => {
//   const role = getUserRole();

//   // Optional fallback if role is missing or token is invalid
//   if (!role) {
//     return (
//       <div className="dashboard-loading">
//         <p>Loading dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <section className={`dashboard-container ${role}`}>
//       <Sidebar role={role} />
//       <main className="dashboard-main">
//         {/* ✅ Role-based navbar */}
//         {role === "admin" ? <AdminNavbar /> : <DashboardNavbar />}
//         <Outlet /> {/* ✅ Renders nested dashboard routes */}
//       </main>
//     </section>
//   );
// };

// export default Dashboard;






import React from "react";
import { Outlet } from "react-router-dom";

const DashboardAdmin = () => {
  return (
    <div className="dashboard-admin">
      <Outlet /> {/* ✅ Only renders admin subpages like AdminUsers */}
    </div>
  );
};

export default DashboardAdmin;

