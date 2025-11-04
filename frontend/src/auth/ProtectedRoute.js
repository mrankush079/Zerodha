
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  //  Redirect if not logged in
  if (!user) {
    console.warn(" ProtectedRoute: No user found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  //  Redirect if role is not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.warn(` ProtectedRoute: Role '${user.role}' not allowed`);
    return <Navigate to="/unauthorized" replace />;
  }

  //  Allow access
  return children;
};

export default ProtectedRoute;