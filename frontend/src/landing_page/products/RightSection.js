import React from "react";


function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <section className="product-section container mt-5">
      <div className="row align-items-center">
        {/* Text Content */}
        <div className="col-md-6 p-4">
          <h2 className="product-title">{productName}</h2>
          <p className="product-description">{productDesription}</p>
          <a href={learnMore} className="product-link">Learn More</a>
        </div>

        {/* Image */}
        <div className="col-md-6 text-center">
          <img src={imageURL} alt={productName} className="product-image" />
        </div>
      </div>
    </section>
  );
}

export default RightSection;