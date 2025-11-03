// import { Navigate } from "react-router-dom";
// import { getUserRole } from "./authUtils";

// function AdminRoute({ children }) {
//   return getUserRole() === "admin" ? children : <Navigate to="/unauthorized" />;
// }

// export default AdminRoute;








// src/auth/AdminRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/unauthorized" />;

  return children;
}

export default AdminRoute;