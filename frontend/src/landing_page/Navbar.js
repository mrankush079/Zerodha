import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg border-bottom animated-navbar ${animate ? "slide-in" : ""}`}
      style={{
        backgroundColor: "#FFF",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img
            src="media/images/logo.svg"
            style={{ width: "25%" }}
            alt="Logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex align-items-center" role="search">
            <ul className="navbar-nav mb-lg-0">
              {["signup", "about", "products", "pricing", "support"].map((route, index) => (
                <li className="nav-item" key={index}>
                  <Link className="nav-link nav-hover" to={`/${route}`}>
                    {route.charAt(0).toUpperCase() + route.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;