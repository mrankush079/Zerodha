import React from "react";

function Education() {
  return (
    <section className="education-section container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src="media/images/education.svg"
            alt="Education Illustration"
            className="education-image"
          />
        </div>

        <div className="col-md-6">
          <h2 className="education-title">Free and open market education</h2>
          <p className="education-text">
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a href="#" className="education-link">
            Varsity <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>

          <p className="education-text mt-4">
            TradingQ&A, the most active trading and investment community in
            India for all your market-related queries.
          </p>
          <a href="#" className="education-link">
            TradingQ&A <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Education;