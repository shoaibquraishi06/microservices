import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import "../style/payment.css";

export default function Payment() {

   const navigate = useNavigate();
 

  // ✅ All hooks first
  const { loading, order } = useSelector(state => state.order);
  const { items = [] } = useSelector(state => state.cart.items);

  // ✅ Then conditions
  if (loading) return <h3>Loading...</h3>;
  if (!order) return <h3>Please complete shipping first</h3>;

  const shippingAddress = order.shippingAddress;

  const total = items.reduce(
    (sum, item) => sum + (item.price?.amount || 0) * item.quantity,
    0
  );

  
   const backHandler = () => {
    navigate("/checkout");
   }



  return (
    <div className="payment-container">

      {/* LEFT SECTION */}
      <div className="payment-left">

        <div className="back-link" onClick={backHandler}>
      <span className="back-arrow">    <FaArrowLeftLong /> </span> <span className="back-btn">Back</span>
        </div>

        <h2 className="payment-title">PAYMENT Method</h2>

        {/* Shipping Address */}
 
 

       <div className="shipping-box">
  <h4>Shipping Address:</h4>

  {shippingAddress ? (
    <>
      <p>Name :- <span>{shippingAddress.fullname} </span> </p>
      <p>Phone:- <span> {shippingAddress.phone}</span></p>
      <p>
        state:- <span>{shippingAddress.state}</span>
      </p>
      <p>
        city :- <span>{shippingAddress.city}</span>
      </p>
           <p>Address :- <span>{shippingAddress.street}</span></p> 
           <p>Pincode :- <span>{shippingAddress.zip}</span></p> 
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

            <strong className="product-price">
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
