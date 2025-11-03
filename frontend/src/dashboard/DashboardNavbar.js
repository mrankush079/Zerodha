import { Link } from "react-router-dom";

const DashboardNavbar = () => (
  <nav className="dashboard-navbar">
    <Link to="/dashboard/home">Home</Link>
    <Link to="/dashboard/market">Market</Link>
    <Link to="/dashboard/watchlist">Watchlist</Link>
    <Link to="/dashboard/holdings">Holdings</Link>
    <Link to="/dashboard/positions">Positions</Link>
  </nav>
);

export default DashboardNavbar;