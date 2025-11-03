

// import { jwtDecode } from "jwt-decode";

// // ✅ Decode and return full user object from token
// export const getDecodedUser = () => {
//   const token = localStorage.getItem("accessToken");
//   if (!token) return null;

//   try {
//     const decoded = jwtDecode(token); // { id, role, exp, name, avatar, ... }
//     return {
//       id: decoded.id,
//       role: decoded.role,
//       exp: decoded.exp,
//       name: decoded.name,       // 👈 added
//       avatar: decoded.avatar,   // 👈 added
//       token
//     };
//   } catch (err) {
//     console.error("Token decode failed:", err.message);
//     return null;
//   }
// };

// // ✅ Return user role only
// export const getUserRole = () => {
//   const user = getDecodedUser();
//   return user?.role || null;
// };

// // ✅ Check if token exists and is valid (not expired)
// export const isAuthenticated = () => {
//   const user = getDecodedUser();
//   if (!user) return false;

//   const now = Date.now() / 1000;
//   return user.exp > now;
// };

// // ✅ Optional: Logout helper
// export const logout = () => {
//   localStorage.removeItem("accessToken");
// };








import { jwtDecode } from "jwt-decode";

// ✅ Decode and return full user object from token
export const getDecodedUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); // { id, role, exp, name, avatar, ... }
    return {
      id: decoded.id,
      role: decoded.role,
      exp: decoded.exp,
      name: decoded.name,
      avatar: decoded.avatar,
      token,
    };
  } catch (err) {
    console.error("❌ Token decode failed:", err.message);
    return null;
  }
};

// ✅ Return user role only
export const getUserRole = () => {
  return getDecodedUser()?.role || null;
};

// ✅ Check if token exists and is valid (not expired)
export const isAuthenticated = () => {
  const user = getDecodedUser();
  if (!user) return false;

  const now = Date.now() / 1000;
  return user.exp > now;
};

// ✅ Optional: Logout helper
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
  localStorage.removeItem("userId");
};