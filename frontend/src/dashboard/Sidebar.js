// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getUserName } from "../auth/authUtils"; // or useContext if using context

// const Sidebar = () => {
//   const userName = getUserName() || "Ankush";
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear(); // or your logout logic
//     navigate("/logout");
//   };

//   return (
//     <div className="sidebar">
//       <div className="profile-section" onClick={() => setShowDropdown(!showDropdown)}>
//         <img
//           src="/media/images/avatar.png" // fallback avatar
//           alt="avatar"
//           className="avatar"
//         />
//         <p className="username">{userName}</p>
//         <span className="dropdown-icon">▾</span>
//       </div>

//       {showDropdown && (
//         <div className="profile-dropdown">
//           <Link to="/dashboard/home">Profile</Link>
//           <Link to="/dashboard/settings">Settings</Link>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       )}

//       <nav className="sidebar-nav">
//         <Link to="/dashboard/home">Dashboard Home</Link>
//         <Link to="/dashboard/admin">Admin Panel</Link>
//         <Link to="/dashboard/market">Market Trends</Link>
//         <Link to="/dashboard/watchlist">Watchlist</Link>
//         <Link to="/dashboard/holdings">Holdings</Link>
//         <Link to="/dashboard/positions">Positions</Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDecodedUser } from "../auth/authUtils";


const Sidebar = () => {
  const user = getDecodedUser();
  const userName = user?.name || "Ankush";
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // or call logout()
    navigate("/"); // redirect to home page
  };

  return (
    <div className="sidebar">
      <div
        className="profile-section"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <img
          src={user?.avatar || "https://avatar.iran.liara.run/public"}
          alt="avatar"
          className="avatar"
        />
        <p className="username">{userName}</p>
        <span className="dropdown-icon">▾</span>
      </div>

      {showDropdown && (
        <div className="profile-dropdown">
          <Link to="/dashboard/home">Profile</Link>
          <Link to="/dashboard/settings">Settings</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard/holdings">Holdings</Link>
          </li>
          <li>
            <Link to="/dashboard/positions">Positions</Link>
          </li>
          <li>
            <Link to="/dashboard/orders">Orders</Link>
          </li>
          <li>
            <Link to="/dashboard/portfolio">Portfolio</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;