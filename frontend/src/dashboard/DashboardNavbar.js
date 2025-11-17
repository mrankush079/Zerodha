import { Link } from "react-router-dom";


const DashboardNavbar = () => (
  <nav className="dashboard-navbar" role="navigation" aria-label="Dashboard Navigation">
    <div className="navbar-brand">
      <img
        src="https://cdn.freelogovectors.net/wp-content/uploads/2021/12/zerodha-logo-freelogovectors.net_.png"
        alt="Zerodha Logo"
        className="navbar-logo"
      />
      <span className="navbar-title">Dashboard</span>
    </div>

    <div className="navbar-links">
      <Link to="/dashboard/home">Home</Link>
      <Link to="/dashboard/market">Market</Link>
      <Link to="/dashboard/watchlist">Watchlist</Link>
      <Link to="/dashboard/holdings">Holdings</Link>
      <Link to="/dashboard/positions">Positions</Link>
    </div>
  </nav>
);

export default DashboardNavbar;