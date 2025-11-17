import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <section className="product-section container mt-5">
      <div className="row align-items-center">
        {/* Left: Product Image */}
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img src={imageURL} alt={productName} className="product-image" />
        </div>

        {/* Right: Product Info */}
        <div className="col-md-6 p-4">
          <h2 className="product-title">{productName}</h2>
          <p className="product-description">{productDesription}</p>

          <div className="product-links mb-3">
            <a href={tryDemo} className="product-link">Try Demo</a>
            <a href={learnMore} className="product-link ms-4">Learn More</a>
          </div>

          <div className="store-badges">
            <a href={googlePlay}>
              <img src="media/images/googlePlayBadge.svg" alt="Google Play" className="store-badge" />
            </a>
            <a href={appStore} className="ms-4">
              <img src="media/images/appstoreBadge.svg" alt="App Store" className="store-badge" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeftSection;