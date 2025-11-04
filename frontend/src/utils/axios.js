import axios from "axios";
import { getAccessToken, logout } from "../auth/authUtils";

const API = process.env.REACT_APP_API_URL || "http://localhost:3003";

const instance = axios.create({ baseURL: API });

instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const res = await instance.post("/refresh", { token: refreshToken });
        const newAccessToken = res.data.accessToken;

        localStorage.setItem("token", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        console.error(" Token refresh failed:", refreshError.message);
        logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default instance;