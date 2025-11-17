import React from "react";


function Pricing() {
  return (
    <section className="pricing-section container">
      <div className="row align-items-center">
        {/* Left Text Block */}
        <div className="col-md-6 mb-4 mb-md-0">
          <h2 className="pricing-title">Unbeatable pricing</h2>
          <p className="pricing-description">
            We pioneered the concept of discount broking and price transparency in India.
            Flat fees and no hidden charges.
          </p>
          <a href="#" className="pricing-link">
            See Pricing <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>

        {/* Right Price Cards */}
        <div className="col-md-6">
          <div className="row text-center">
            <div className="col-6 p-3 pricing-card">
              <h3 className="pricing-amount">₹0</h3>
              <p>Free equity delivery and<br />direct mutual funds</p>
            </div>
            <div className="col-6 p-3 pricing-card">
              <h3 className="pricing-amount">₹20</h3>
              <p>Intraday and F&O</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;