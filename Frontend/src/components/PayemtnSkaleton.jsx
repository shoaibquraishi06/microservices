// Payment.jsx
import React from "react";
import "../style/payementSkaleton.css";

export default function Payment() {
  return (
    <div className="payment-skeleton-page">
      <div className="payment-skeleton-wrapper">
        {/* LEFT SIDE */}
        <div className="payment-left">
          <div className="sk sk-title"></div>

          {/* Shipping Address */}
          <div className="payment-box">
            <div className="sk sk-heading"></div>

            <div className="address-lines">
              <div className="sk sk-line w60"></div>
              <div className="sk sk-line w50"></div>
              <div className="sk sk-line w45"></div>
              <div className="sk sk-line w40"></div>
              <div className="sk sk-line w55"></div>
              <div className="sk sk-line w35"></div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="payment-box">
            <div className="sk sk-heading small"></div>
            <div className="sk sk-para"></div>
            <div className="sk sk-para short"></div>
          </div>

          {/* Pay Button */}
          <div className="sk sk-button"></div>
        </div>

        {/* RIGHT SIDE */}
        <div className="payment-right">
          <div className="sk sk-summary-title"></div>

          {[1, 2, 3, 4].map((item) => (
            <div className="summary-item" key={item}>
              <div className="sk sk-img"></div>

              <div className="summary-info">
                <div className="sk sk-product-title"></div>
                <div className="sk sk-qty"></div>
              </div>

              <div className="sk sk-price"></div>
            </div>
          ))}

          <div className="totals">
            <div className="row">
              <div className="sk sk-total-label"></div>
              <div className="sk sk-total-value"></div>
            </div>

            <div className="row">
              <div className="sk sk-total-label"></div>
              <div className="sk sk-total-value green"></div>
            </div>

            <div className="divider"></div>

            <div className="row">
              <div className="sk sk-total-label big"></div>
              <div className="sk sk-total-value big"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}