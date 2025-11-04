

import { jwtDecode } from "jwt-decode";

//  Decode and return full user object from token
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
    console.error(" Token decode failed:", err.message);
    return null;
  }
};

//  Return user role only
export const getUserRole = () => getDecodedUser()?.role || null;

//  Check if token exists and is valid (not expired)
export const isAuthenticated = () => {
  const user = getDecodedUser();
  if (!user) return false;
  return user.exp > Date.now() / 1000;
};

//  Check if user is admin
export const isAdmin = () => getUserRole() === "admin";

//  Get access token directly
export const getAccessToken = () => localStorage.getItem("token");

//  Check if token is expired
export const isTokenExpired = () => {
  const user = getDecodedUser();
  if (!user) return true;
  return Date.now() / 1000 >= user.exp;
};

// Get user ID
export const getUserId = () => getDecodedUser()?.id || null;

//  Logout helper
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
  localStorage.removeItem("userId");
};