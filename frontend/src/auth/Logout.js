
import axios from "../utils/axios"; //  Use your Axios instance
import { logout } from "../auth/authUtils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      await axios.post("/auth/logout", { token: refreshToken });
      toast.success("Logged out successfully.");
    } catch (err) {
      console.error(" Logout request failed:", err.message);
      toast.error("Logout failed. Please try again.");
    }

    logout(); //  Centralized cleanup
    navigate("/login"); //  React-safe redirect
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;