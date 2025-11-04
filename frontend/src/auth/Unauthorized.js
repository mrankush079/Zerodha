

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Unauthorized = () => {
  useEffect(() => {
    toast.warn(" You are not authorized to access this page.");
  }, []);

  return (
    <div className="unauthorized-wrapper">
      <div className="unauthorized-card">
        <h1 className="unauthorized-heading"> Access Denied</h1>
        <p className="unauthorized-message">
          You do not have permission to view this page.
        </p>
        <Link to="/" className="unauthorized-link">
          ⬅ Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;