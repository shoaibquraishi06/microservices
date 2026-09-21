import React from "react";
import "../style/productSkaleton.css";

export default function ProductSkaleton({ count = 8 }) {
  return (
    <div className="product-skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div className="product-skeleton-card" key={index}>

          {/* Product Image */}
          <div className="ps-image-wrap">
            <div className="ps-shimmer ps-image"></div>

            {/* Wishlist Icon */}
            <div className="ps-shimmer ps-heart"></div>
          </div>

          {/* Product Title + Price */}
          <div className="ps-product-head">
            <div className="ps-shimmer ps-title"></div>
            <div className="ps-shimmer ps-price"></div>
          </div>

          {/* Product Description */}
          <div className="ps-shimmer ps-description"></div>

          {/* Buttons */}
          <div className="ps-buttons">
            <div className="ps-shimmer ps-cart-btn"></div>
            <div className="ps-shimmer ps-buy-btn"></div>
          </div>

        </div>
      ))}
    </div>
  );
}