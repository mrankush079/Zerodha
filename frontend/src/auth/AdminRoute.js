

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user } = useAuth();

  //  Redirect if not logged in
  if (!user) {
    console.warn(" AdminRoute: No user found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  //  Redirect if not admin
  if (user.role !== "admin") {
    console.warn(` AdminRoute: Unauthorized role (${user.role}), redirecting`);
    return <Navigate to="/unauthorized" replace />;
  }

  //  Allow access
  return children;
}

export default AdminRoute;