
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "../utils/axios"; //  Use centralized Axios instance
import { logout } from "../auth/authUtils";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken) {
      logout();
      setUser(null);
      return;
    }

    try {
      const decoded = jwtDecode(accessToken);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (!decoded?.name || !decoded?.role) {
        console.warn(" Token missing required fields");
        logout();
        setUser(null);
        return;
      }

      if (isExpired && refreshToken) {
        refreshAccessToken(refreshToken);
      } else {
        setUser({ name: decoded.name, role: decoded.role });
      }
    } catch (err) {
      console.error(" Token decode failed:", err.message);
      logout();
      setUser(null);
    }
  }, []);

  const refreshAccessToken = async (refreshToken) => {
    try {
      const res = await axios.post("/auth/refresh", { token: refreshToken });
      const { accessToken, name, role } = res.data;

      if (!accessToken || !name || !role) {
        throw new Error("Invalid refresh response");
      }

      localStorage.setItem("accessToken", accessToken);
      setUser({ name, role });
    } catch (err) {
      console.error(" Token refresh failed:", err.message);
      logout();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};