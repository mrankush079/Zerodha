import React from "react";


function Hero() {
  return (
    <section className="support-hero container-fluid">
      <div className="p-5 text-center bg-light" id="supportWrapper">
        <h4 className="support-title">Support Portal</h4>
        <a href="#" className="support-link">Track Tickets</a>
      </div>

      <div className="row p-5 m-3">
        {/* Left: Search and Quick Links */}
        <div className="col-md-6 p-3">
          <h1 className="fs-3 mb-3">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input
            className="form-control mb-4"
            type="text"
            placeholder="Eg. how do I activate F&O"
          />
          <div className="d-flex flex-column gap-2">
            <a href="#" className="support-link">Track account opening</a>
            <a href="#" className="support-link">Track segment activation</a>
            <a href="#" className="support-link">Intraday margins</a>
            <a href="#" className="support-link">Kite user manual</a>
          </div>
        </div>

        {/* Right: Featured Articles */}
        <div className="col-md-6 p-3">
          <h1 className="fs-3 mb-3">Featured</h1>
          <ol className="support-featured-list">
            <li>
              <a href="#" className="support-link">
                Current Takeovers and Delisting – January 2024
              </a>
            </li>
            <li>
              <a href="#" className="support-link">
                Latest Intraday leverages – MIS & CO
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;