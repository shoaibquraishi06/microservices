import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";

import SkaletonLoader from "./PayemtnSkaleton";
import "../style/payment.css";

const PAYMENT_SERVICE_URL =
  "https://microservices-xdhd.onrender.com";

export default function Payment() {
  const navigate = useNavigate();

  // Redux
  const { loading, order } = useSelector(
    (state) => state.order
  );

  const { items = [] } = useSelector(
    (state) => state.cart
  );

  // Loading
  if (loading) {
    return <SkaletonLoader />;
  }

  // Order nahi hai
  if (!order) {
    return (
      <h3 className="condtional-header">
        Please complete Shipping Address
      </h3>
    );
  }

  // Shipping address
  const shippingAddress = order.shippingAddress;

  // Total
  const total = items.reduce(
    (sum, item) =>
      sum +
      (item.price?.amount || 0) *
        (item.quantity || 1),
    0
  );

  // ==================================================
  // VERIFY PAYMENT
  // ==================================================



  // ==================================================
  // HANDLE PAYMENT
  // ==================================================

  const handlePayment = async () => {
    try {
      console.log("🚀 PAYMENT STARTED");

      // ----------------------------------------------
      // 1. Get Order ID
      // ----------------------------------------------

      const orderId = order._id;

      console.log("🆔 ORDER ID:", orderId);

      // Order ID check
      if (!orderId) {
        console.error("❌ ORDER ID NOT FOUND:", order);

        alert(
          "Order ID not found. Please create the order again."
        );

        return;
      }

      // ----------------------------------------------
      // 2. Razorpay script check
      // ----------------------------------------------

      if (!window.Razorpay) {
        alert(
          "Razorpay is not loaded. Please refresh the page."
        );

        return;
      }

      // ----------------------------------------------
      // 3. Create Razorpay Order
      // ----------------------------------------------

      console.log(
        "📦 Creating Razorpay order..."
      );

       const token = localStorage.getItem("token");
      const response = await axios.post(
        `${PAYMENT_SERVICE_URL}/api/payments/create/${orderId}`,
        {
          amount: total,
        },
        {
    withCredentials: true,

    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
        
      );
      

      console.log(
        "✅ CREATE PAYMENT RESPONSE:",
        response.data
      );

        const verifyPayment = async (paymentResponse) => {
    try {
      console.log(
        "🔐 VERIFYING PAYMENT:",
        paymentResponse
      );

      const response = await axios.post(
        `${PAYMENT_SERVICE_URL}/api/payments/verify`,
        {
          razorpay_order_id:
            paymentResponse.razorpay_order_id,

          razorpay_payment_id:
            paymentResponse.razorpay_payment_id,

          razorpay_signature:
            paymentResponse.razorpay_signature,
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        "✅ VERIFY RESPONSE:",
        response.data
      );

      if (response.data.success) {
        navigate("/payment-success", {
          state: {
            order,
            payment: paymentResponse,
          },
        });
      }
    } catch (error) {
      console.error(
        "❌ PAYMENT VERIFY ERROR:",
        error.response?.data || error.message
      );
    }
  };
      const razorpayOrder =
        response.data?.order;

      const razorpayKey =
        response.data?.key;

      // ----------------------------------------------
      // 4. Check backend response
      // ----------------------------------------------

      if (!razorpayOrder?.id) {
        console.error(
          "❌ Razorpay Order Missing:",
          response.data
        );

        throw new Error(
          "Razorpay order ID not received"
        );
      }

      if (!razorpayKey) {
        throw new Error(
          "Razorpay key not received from backend"
        );
      }

      // ----------------------------------------------
      // 5. Razorpay Checkout Options
      // ----------------------------------------------

      const options = {
        key: razorpayKey,

        amount: razorpayOrder.amount,

        currency:
          razorpayOrder.currency || "INR",

        name: "Nike Store",

        description: "Nike Order Payment",

        order_id: razorpayOrder.id,

        // --------------------------------------------
        // PAYMENT SUCCESS
        // --------------------------------------------

        handler: async function (
          paymentResponse
        ) {
          console.log(
            "🎉 RAZORPAY SUCCESS:",
            paymentResponse
          );

          await verifyPayment(
            paymentResponse
          );
        },

        // --------------------------------------------
        // PREFILL
        // --------------------------------------------

        prefill: {
          name:
            shippingAddress?.fullname || "",

          contact:
            shippingAddress?.phone || "",
        },

        // --------------------------------------------
        // THEME
        // --------------------------------------------

        theme: {
          color: "#000000",
        },

        // --------------------------------------------
        // CLOSE
        // --------------------------------------------

        modal: {
          ondismiss: function () {
            console.log(
              "⚠️ Razorpay popup closed"
            );
          },
        },
      };

      // ----------------------------------------------
      // 6. Create Razorpay instance
      // ----------------------------------------------

      const razorpay =
        new window.Razorpay(options);

      // ----------------------------------------------
      // 7. Payment failed
      // ----------------------------------------------

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "❌ PAYMENT FAILED:",
            response.error
          );

          alert(
            response.error?.description ||
              "Payment failed"
          );
        }
      );

      // ----------------------------------------------
      // 8. Open Razorpay
      // ----------------------------------------------

      razorpay.open();
    } catch (error) {
      console.error(
        "❌ CREATE PAYMENT ERROR:",
        error.response?.data ||
          error.message
      );
    }
  };

  // ==================================================
  // BACK
  // ==================================================

  const backHandler = () => {
    navigate("/checkout");
  };

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="payment-container">

      {/* LEFT SECTION */}
      <div className="payment-left">

        {/* BACK */}
        <div
          className="back-link"
          onClick={backHandler}
        >
          <span className="back-arrow">
            <FaArrowLeftLong />
          </span>

          <span className="back-btn">
            Back
          </span>
        </div>

        <h2 className="payment-title">
          PAYMENT Method
        </h2>

        {/* SHIPPING ADDRESS */}
        <div className="shipping-box">

          <h4>Shipping Address:</h4>

          {shippingAddress ? (
            <>
              <p>
                Name{" "}
                <span>
                  {shippingAddress.fullname}
                </span>
              </p>

              <p>
                Phone{" "}
                <span>
                  {shippingAddress.phone}
                </span>
              </p>

              <p>
                state{" "}
                <span>
                  {shippingAddress.state}
                </span>
              </p>

              <p>
                city{" "}
                <span>
                  {shippingAddress.city}
                </span>
              </p>

              <p>
                Address{" "}
                <span>
                  {shippingAddress.street}
                </span>
              </p>

              <p>
                Pincode{" "}
                <span>
                  {shippingAddress.zip}
                </span>
              </p>
            </>
          ) : (
            <p>
              No shipping address found.
            </p>
          )}

        </div>

        {/* RAZORPAY */}
        <div className="payment-method">

          <h4>
            Pay with Razorpay
          </h4>

          <p>
            Secure payment via Razorpay.
            Supports UPI, Cards, Net Banking,
            and Wallets.
          </p>

        </div>

        {/* PAY BUTTON */}
        <button
          className="pay-btn"
          onClick={handlePayment}
        >
          PAY ₹{" "}
          {total.toLocaleString("en-IN")}
        </button>

      </div>

      {/* RIGHT SECTION */}
      <div className="payment-right">

        <h3>
          ORDER SUMMARY
        </h3>

        {items.map((item) => (
          <div
            key={item.productId}
            className="summary-item"
          >

            <img
              src={item.image}
              alt={item.title}
            />

            <div className="summary-details">

              <p className="product-name">
                {item.title}
              </p>

              <span>
                Qty: {item.quantity}
              </span>

            </div>

            <strong className="product-price">
              ₹{" "}
              {(
                (item.price?.amount || 0) *
                (item.quantity || 1)
              ).toLocaleString("en-IN")}
            </strong>

          </div>
        ))}

        {/* SUBTOTAL */}
        <div className="summary-row">

          <span>
            Subtotal
          </span>

          <span>
            ₹{" "}
            {total.toLocaleString("en-IN")}
          </span>

        </div>

        {/* SHIPPING */}
        <div className="summary-row">

          <span>
            Shipping
          </span>

          <span className="free">
            FREE
          </span>

        </div>

        {/* TOTAL */}
        <div className="summary-total">

          <span>
            Total
          </span>

          <strong>
            ₹{" "}
            {total.toLocaleString("en-IN")}
          </strong>

        </div>

      </div>

    </div>
  );
}