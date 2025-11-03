
// import Logout from "../auth/Logout";
// import { getUserRole } from "../auth/authUtils";

// function Dashboard() {
//   const role = getUserRole();

//   return (
//     <div>
//       <h1>Welcome {role === "admin" ? "Admin" : "User"}</h1>
//       <Logout />
//     </div>
//   );
// }

// export default Dashboard;





















// import { getUserRole } from "../auth/authUtils";
// import DashboardNavbar from "./DashboardNavbar";
// import AdminNavbar from "./AdminNavbar";
// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";

// const Dashboard = () => {
//   const role = getUserRole();

//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <main className="dashboard-main">
//         {role === "admin" ? <AdminNavbar /> : <DashboardNavbar />}
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Dashboard;






// import { getUserRole } from "../auth/authUtils";
// import DashboardNavbar from "./DashboardNavbar";
// import AdminNavbar from "./AdminNavbar";
// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";

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
//     <section className="dashboard-container">
//       <Sidebar />
//       <main className="dashboard-main">
//         {role === "admin" ? <AdminNavbar /> : <DashboardNavbar />}
//         <Outlet />
//       </main>
//     </section>
//   );
// };

// export default Dashboard;













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