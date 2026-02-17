import React from "react";
import { useSelector } from "react-redux";
import "../style/payment.css";

export default function Payment() {

  // 🟢 Get order + cart from Redux
  const { shippingAddress } = useSelector(state => state.order);
  const { items = [] } = useSelector(state => state.cart);

  // 🟢 Calculate total
  const total = items.reduce(
    (sum, item) => sum + (item.price?.amount || 0) * item.quantity,
    0
  );

  return (
    <div className="payment-container">

      {/* LEFT SECTION */}
      <div className="payment-left">

        <div className="back-link">
          ← Back to Shipping
        </div>

        <h2 className="payment-title">PAYMENT</h2>

        {/* Shipping Address */}
        <div className="shipping-box">
          <h4>Shipping To:</h4>

          {shippingAddress ? (
            <>
              <p>{shippingAddress.fullname}</p>
              <p>{shippingAddress.street}</p>
              <p>
                {shippingAddress.city}, {shippingAddress.state}
              </p>
              <p>Phone: {shippingAddress.phone}</p>
            </>
          ) : (
            <p>No shipping address found.</p>
          )}
        </div>

        {/* Razorpay Option */}
        <div className="payment-method">
          <h4>Pay with Razorpay</h4>
          <p>
            Secure payment via Razorpay. Supports UPI, Cards,
            Net Banking, and Wallets.
          </p>
        </div>

        <button className="pay-btn">
          PAY ₹ {total.toLocaleString()}
        </button>

      </div>

      {/* RIGHT SECTION */}
      <div className="payment-right">

        <h3>ORDER SUMMARY</h3>

        {items.map(item => (
          <div key={item.productId} className="summary-item">

            <img
              src={item.image}
              alt={item.title}
            />

            <div className="summary-details">
              <p className="product-name">{item.title}</p>
              <span>Qty: {item.quantity}</span>
            </div>

            <strong>
              ₹ {(item.price?.amount * item.quantity).toLocaleString()}
            </strong>

          </div>
        ))}

        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹ {total.toLocaleString()}</span>
        </div>

        <div className="summary-row">
          <span>Shipping</span>
          <span className="free">FREE</span>
        </div>

        <div className="summary-total">
          <span>Total</span>
          <strong>₹ {total.toLocaleString()}</strong>
        </div>

      </div>

    </div>
  );
}
