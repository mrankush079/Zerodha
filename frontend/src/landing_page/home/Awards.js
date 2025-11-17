
import React from "react";

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row gy-5 align-items-center">
        <div className="col-12 col-md-6 text-center">
          <img
            src="media/images/largestBroker.svg"
            alt="Award Trophy"
            className="img-fluid rounded shadow awards-image"
            style={{ height: "auto" }}
          />
          <div className="mt-3">
            <p className="fw-semibold text-primary mb-1">
              Economic Times Startup of the Year – 2020
            </p>
            <p className="fw-semibold text-secondary">
              NSE, BSE, MCX – Best Retail Brokerage award – 2018, 2019 & 2020
            </p>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <h2 className="fs-4 text-center text-md-start">Largest stock broker in India</h2>
          <p className="text-center text-md-start">
            2+ million Zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:
          </p>

          <div className="row gx-3">
            <div className="col-6">
              <ul className="list-unstyled">
                <li>Futures and Options</li>
                <li>Commodity derivatives</li>
                <li>Currency derivatives</li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="list-unstyled">
                <li>Stocks & IPOs</li>
                <li>Direct mutual funds</li>
                <li>Bonds and Govt. Securities</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 text-center text-md-start">
            <img
              src="media/images/pressLogos.png"
              alt="Press Logos"
              className="img-fluid rounded shadow press-logos"
              style={{ height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
