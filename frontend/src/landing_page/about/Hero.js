


import React from "react";
import "../../index.css"; // ensure this is imported somewhere globally

function Hero() {
  return (
    <div className="container hero-plain">
      <div className="row section">
        <div className="col-12">
          <h1 className="hero-heading">
            We pioneered the discount broking model in India
            <br />
            Now, we are breaking ground with our technology.
          </h1>
        </div>
      </div>

      <div className="row section border-top body-text">
        <div className="col-12 col-md-6">
          <p>
            We kick-started operations on the 15th of August, 2010 with the goal
            of breaking all barriers that traders and investors face in India in
            terms of cost, support, and technology. We named the company
            Zerodha, a combination of Zero and "Rodha", the Sanskrit word for
            barrier.
          </p>
          <p>
            Today, our disruptive pricing models and in-house technology have
            made us the biggest stock broker in India.
          </p>
          <p>
            Over 1+ Crore clients place millions of orders every day through our
            powerful ecosystem of investment platforms, contributing over 15% of
            all Indian retail trading volumes.
          </p>
        </div>

        <div className="col-12 col-md-6">
          <p>
            In addition, we run a number of popular open online educational and
            community initiatives to empower retail traders and investors.
          </p>
          <p>
            <a href="#" style={{ textDecoration: "none" }}>Rainmatter</a>, our fintech fund and incubator, has invested in several fintech startups.
          </p>
          <p>
            Catch up on the latest updates on our blog or see what the media is saying about us.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
