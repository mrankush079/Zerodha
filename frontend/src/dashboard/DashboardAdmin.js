


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

