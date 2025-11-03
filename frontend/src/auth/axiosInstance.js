

// import axios from "axios";

// const api = axios.create({ baseURL: "http://localhost:3002" });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) config.headers["Authorization"] = `Bearer ${token}`;
//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;

//     if (
//       (err.response?.status === 401 || err.response?.status === 403) &&
//       err.response?.data?.error === "jwt expired" &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       const refreshToken = localStorage.getItem("refreshToken");
//       if (!refreshToken) {
//         window.location.href = "/login";
//         return Promise.reject(err);
//       }

//       try {
//         const res = await axios.post("http://localhost:3002/auth/refresh", {
//           token: refreshToken,
//         });

//         const newAccessToken = res.data.accessToken;
//         localStorage.setItem("accessToken", newAccessToken);
//         originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

//         return api(originalRequest); // Retry original request
//       } catch (refreshErr) {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login";
//         return Promise.reject(refreshErr);
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// export default api;










import axios from "axios";

import { BASE_URL } from "../config";

const API = process.env.REACT_APP_API_URL || "http://localhost:3002";






const instance = axios.create({ baseURL: API });

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const res = await axios.post(`${API}/refresh`, { token: refreshToken });
        const newAccessToken = res.data.accessToken;
        localStorage.setItem("token", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
    console.log("API is running at:", BASE_URL);

  }
);

export default instance;