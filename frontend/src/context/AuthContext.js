// import { createContext, useContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
// import { logout } from "../auth/authUtils";

// const AuthContext = createContext(undefined);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const refreshToken = localStorage.getItem("refreshToken");

//     if (accessToken) {
//       try {
//         const decoded = jwtDecode(accessToken);

//         // ✅ Check token expiry
//         if (decoded.exp * 1000 < Date.now()) {
//           handleTokenRefresh(refreshToken);
//         } else {
//           setUser({ name: decoded.name, role: decoded.role });
//         }
//       } catch (err) {
//         logout();
//         setUser(null);
//       }
//     } else {
//       logout();
//       setUser(null);
//     }
//   }, []);

//   // ✅ Optional: Refresh token logic
//   const handleTokenRefresh = async (refreshToken) => {
//     try {
//       const API = process.env.REACT_APP_API_URL || "http://localhost:3002";
//       const res = await axios.post(`${API}/auth/refresh`, { refreshToken });

//       const { accessToken, role, name } = res.data;
//       localStorage.setItem("accessToken", accessToken);
//       setUser({ name, role });
//     } catch (err) {
//       logout();
//       setUser(null);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


















import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
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

      if (isExpired && refreshToken) {
        refreshAccessToken(refreshToken);
      } else {
        setUser({ name: decoded.name, role: decoded.role });
      }
    } catch (err) {
      logout();
      setUser(null);
    }
  }, []);

  const refreshAccessToken = async (refreshToken) => {
    try {
      const API = process.env.REACT_APP_API_URL || "http://localhost:3002";
      const res = await axios.post(`${API}/auth/refresh`, { refreshToken });

      const { accessToken, name, role } = res.data;
      localStorage.setItem("accessToken", accessToken);
      setUser({ name, role });
    } catch (err) {
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