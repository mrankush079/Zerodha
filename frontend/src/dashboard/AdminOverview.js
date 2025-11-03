// import React, { useEffect, useState } from "react";
// import { BarChart, PeopleAlt, Warning } from "@mui/icons-material";
// import CountUp from "react-countup";
// import { BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import axios from "axios";

// const AdminOverview = () => {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     activeUsers: 0,
//     alerts: 0,
//   });

//   const [chartData, setChartData] = useState([]);

//   const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:3002";

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/admin/overview`);
//         setStats(res.data.stats);
//         setChartData(res.data.chart);
//       } catch (err) {
//         console.error("Failed to fetch overview data", err);
//       }
//     };
//     fetchStats();
//   }, []);

//   const statCards = [
//     { label: "Total Users", value: stats.totalUsers, icon: <PeopleAlt />, color: "#00cec9" },
//     { label: "Active Users", value: stats.activeUsers, icon: <BarChart />, color: "#0984e3" },
//     { label: "System Alerts", value: stats.alerts, icon: <Warning />, color: "#d63031" },
//   ];

//   return (
//     <div className="admin-overview">
//       {/* ✅ System Status Banner */}
//       <div className="status-banner">
//         ✅ All systems operational. Last sync: 2 mins ago.
//       </div>

//       {/* ✅ Stats Cards with CountUp */}
//       <div className="stats-cards">
//         {statCards.map((stat, i) => (
//           <div key={i} className="stat-card" style={{ borderColor: stat.color }}>
//             <div className="icon">{stat.icon}</div>
//             <div className="value">
//               <CountUp end={stat.value} duration={1.5} />
//             </div>
//             <div className="label">{stat.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Analytics Chart */}
//       <div className="chart-section">
//         <h4>User Growth (Last 6 Months)</h4>
//         <ResponsiveContainer width="100%" height={250}>
//           <ReBarChart data={chartData}>
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="users" fill="#00cec9" radius={[4, 4, 0, 0]} />
//           </ReBarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default AdminOverview;






import React from "react";
import { BarChart, PeopleAlt, Warning } from "@mui/icons-material";
import CountUp from "react-countup";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminOverview = () => {
  // Static mock data
  const stats = {
    totalUsers: 1200,
    activeUsers: 875,
    alerts: 3,
  };

  const chartData = [
    { month: "May", users: 820 },
    { month: "Jun", users: 860 },
    { month: "Jul", users: 910 },
    { month: "Aug", users: 980 },
    { month: "Sep", users: 1020 },
    { month: "Oct", users: 1200 },
  ];

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: <PeopleAlt />, color: "#00cec9" },
    { label: "Active Users", value: stats.activeUsers, icon: <BarChart />, color: "#0984e3" },
    { label: "System Alerts", value: stats.alerts, icon: <Warning />, color: "#d63031" },
  ];

  return (
    <div className="admin-overview">
      {/* ✅ System Status Banner */}
      <div className="status-banner">
        ✅ All systems operational. Last sync: 2 mins ago.
      </div>

      {/* ✅ Stats Cards */}
      <div className="stats-cards">
        {statCards.map((stat, i) => (
          <div key={i} className="stat-card" style={{ borderColor: stat.color }}>
            <div className="icon">{stat.icon}</div>
            <div className="value">
              <CountUp end={stat.value} duration={1.5} />
            </div>
            <div className="label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ✅ User Growth Chart */}
      <div className="chart-section">
        <h4>User Growth (Last 6 Months)</h4>
        <ResponsiveContainer width="100%" height={250}>
          <ReBarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#00cec9" radius={[4, 4, 0, 0]} />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminOverview;