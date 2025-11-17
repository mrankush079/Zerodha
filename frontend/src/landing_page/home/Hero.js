
import React from "react";
import "../../index.css";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content container">
        {/* image column */}
        <div className="hero-visual text-center">
          <img
            src="media/images/homeHero.png"
            alt="Hero"
            className="hero-image"
          />
        </div>

        {/* text column */}
        <div className="hero-text">
          <h1 className="hero-title">Invest in everything</h1>
          <p className="hero-subtitle">
            Online platform to invest in stocks, derivatives, mutual funds, and more
          </p>

          <div>
            <button className="hero-button" type="button">Signup Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
