import axios from "axios";

function Logout() {
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const API = process.env.REACT_APP_API_URL || "http://localhost:3003";

    try {
      await axios.post(`${API}/auth/logout`, { token: refreshToken });
    } catch (err) {
      console.error("Logout request failed:", err.message);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;