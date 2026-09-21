import React from "react";
import "../style/orderSkaleton.css";

export default function OrderSkaleton() {
  return (
    <div className="order-skeleton-page">

      {/* Back */}
      <div className="os-back">
        <span className="os-shimmer os-back-arrow"></span>
        <span className="os-shimmer os-back-text"></span>
      </div>

      {/* Page Header */}
      <div className="os-header">
        <div className="os-shimmer os-eyebrow"></div>

        <div className="os-shimmer os-title"></div>

        <div className="os-shimmer os-description"></div>

        <div className="os-shimmer os-order-count"></div>
      </div>

      {/* Orders */}
      <div className="os-orders">

        {[1, 2, 3].map((order) => (
          <div className="os-order-card" key={order}>

            {/* Order Header */}
            <div className="os-order-header">

              <div className="os-order-info">
                <div className="os-shimmer os-order-label"></div>
                <div className="os-shimmer os-order-id"></div>

                <div className="os-date-row">
                  <span className="os-shimmer os-calendar"></span>
                  <span className="os-shimmer os-date"></span>
                </div>
              </div>

              <div className="os-order-meta">
                <span className="os-shimmer os-status"></span>
                <span className="os-shimmer os-order-price"></span>
              </div>

            </div>

            {/* Items */}
            <div className="os-items">

              <div className="os-items-label os-shimmer"></div>

              {[1, 2].map((item) => (
                <div className="os-product" key={item}>

                  {/* Image placeholder */}
                  <div className="os-shimmer os-product-image"></div>

                  {/* Product information */}
                  <div className="os-product-info">

                    <div className="os-shimmer os-brand"></div>

                    <div className="os-shimmer os-product-name"></div>

                    <div className="os-shimmer os-quantity"></div>

                  </div>

                  {/* Product price */}
                  <div className="os-shimmer os-product-price"></div>

                </div>
              ))}

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}