import React from "react";


function Stats() {
  return (
    <section className="stats-section container">
      <div className="row align-items-center">
        {/* Left: Text Content */}
        <div className="col-md-6 mb-4 mb-md-0">
          <h2 className="stats-title">Trust with confidence</h2>

          <div className="stats-block">
            <h3 className="stats-subtitle">Customer-first always</h3>
            <p className="text-muted">
              That's why 1.3+ crore customers trust Zerodha with ₹3.5+ lakh crores
              worth of equity investments.
            </p>
          </div>

          <div className="stats-block">
            <h3 className="stats-subtitle">No spam or gimmicks</h3>
            <p className="text-muted">
              No gimmicks, spam, "gamification", or annoying push notifications.
              High quality apps that you use at your pace, the way you like.
            </p>
          </div>

          <div className="stats-block">
            <h3 className="stats-subtitle">The Zerodha universe</h3>
            <p className="text-muted">
              Not just an app, but a whole ecosystem. Our investments in 30+
              fintech startups offer you tailored services specific to your needs.
            </p>
          </div>

          <div className="stats-block">
            <h3 className="stats-subtitle">Do better with money</h3>
            <p className="text-muted">
              With initiatives like Nudge and Kill Switch, we don't just
              facilitate transactions, but actively help you do better with your
              money.
            </p>
          </div>
        </div>

        {/* Right: Image and Links */}
        <div className="col-md-6 text-center">
          <img
            src="media/images/ecosystem.png"
            alt="Zerodha Ecosystem"
            className="img-fluid stats-image mb-4"
          />
          <div className="stats-links">
            <a href="#" className="stats-link me-4">
              Explore our products <i className="fa fa-long-arrow-right"></i>
            </a>
            <a href="#" className="stats-link">
              Try Kite demo <i className="fa fa-long-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;