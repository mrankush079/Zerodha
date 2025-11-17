import React from "react";

function Universe() {
  return (
    <section className="universe-section container mt-5">
      <div className="text-center mb-4">
        <h2 className="universe-title">The Zerodha Universe</h2>
        <p className="universe-subtitle">
          Extend your trading and investment experience even further with our partner platforms
        </p>
      </div>

      <div className="row text-center">
        {[...Array(6)].map((_, i) => (
          <div className="col-md-4 col-sm-6 p-3" key={i}>
            <img
              src="media/images/smallcaseLogo.png"
              alt="Partner Platform"
              className="universe-logo"
            />
            <p className="text-muted small mt-2">Thematic investment platform</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-4 mb-5">
        <button className="btn btn-primary fs-5 px-4">Signup Now</button>
      </div>
    </section>
  );
}

export default Universe;