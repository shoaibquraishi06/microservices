import React from "react";
import "../style/cartSkaleton.css";

export default function CartSkalaton({ count = 2 }) {
  return (
    <main className="cart-skeleton-page" aria-busy="true">
      {/* Back */}
      <div className="cart-skeleton-back">
        <span className="skel skel-back-arrow"></span>
        <span className="skel skel-back-text"></span>
      </div>

      {/* Header */}
      <div className="cart-skeleton-header">
        <div>
          <span className="skel skel-eyebrow"></span>
          <span className="skel skel-page-title"></span>
        </div>

        <span className="skel skel-item-count"></span>
      </div>

      {/* Main layout */}
      <div className="cart-skeleton-layout">

        {/* LEFT — CART ITEMS */}
        <section className="cart-skeleton-items">
          {Array.from({ length: count }).map((_, index) => (
            <div className="cart-skeleton-item" key={index}>

              {/* Product image */}
              <div className="skel skel-product-image"></div>

              {/* Product information */}
              <div className="cart-skeleton-product-info">

                <span className="skel skel-brand"></span>

                <span className="skel skel-product-title"></span>

                <span className="skel skel-product-description"></span>

                {/* Quantity */}
                <div className="skel skel-quantity"></div>
              </div>

              {/* Price */}
              <div className="cart-skeleton-price">
                <span className="skel skel-price-main"></span>
                <span className="skel skel-price-small"></span>
              </div>
            </div>
          ))}
        </section>

        {/* RIGHT — SUMMARY */}
        <aside className="cart-skeleton-summary">

          <div className="cart-skeleton-summary-header">
            <span className="skel skel-summary-eyebrow"></span>
            <span className="skel skel-summary-title"></span>
          </div>

          <div className="skel skel-summary-divider"></div>

          <div className="cart-skeleton-summary-rows">

            <div className="skeleton-summary-row">
              <span className="skel skel-summary-label"></span>
              <span className="skel skel-summary-value"></span>
            </div>

            <div className="skeleton-summary-row">
              <span className="skel skel-summary-label"></span>
              <span className="skel skel-summary-value"></span>
            </div>

            <div className="skeleton-summary-row">
              <span className="skel skel-summary-label"></span>
              <span className="skel skel-summary-free"></span>
            </div>

          </div>

          <div className="skel skel-summary-divider"></div>

          <div className="skeleton-pay-row">
            <span className="skel skel-pay-label"></span>
            <span className="skel skel-pay-value"></span>
          </div>

          <span className="skel skel-checkout-button"></span>

          <span className="skel skel-secure-text"></span>
        </aside>

      </div>
    </main>
  );
}