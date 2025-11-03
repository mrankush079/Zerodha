import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:3003";

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
    console.log("API is running at:", API);
    return Promise.reject(err);
  }
);

export default instance;