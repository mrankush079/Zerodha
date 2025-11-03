import axios from "axios";

function Logout() {
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    await axios.post("http://localhost:3002/auth/logout", { token: refreshToken });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;