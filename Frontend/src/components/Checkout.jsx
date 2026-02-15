import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createOrder } from "../feature/order/order.Thunk"
import nikeshoe from "../assets/nikeshoes3.avif";
import "../style/checkout.css";

export default function Checkout() {
  
     const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.order);

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createOrder({
        shippingAddress: form, // 🔥 BACKEND EXPECTS THIS
      })
    );

  }



  return (
    <div className="checkout-container">
      {/* Left Section */}
      <div className="checkout-left">
        {/* <div className="checkout-steps">
          <span className="step active">1 Shipping</span>
          <span className="line"></span>
          <span className="step">2 Payment</span>
        </div> */}

        <h2 className="section-title">SHIPPING ADDRESS</h2>
 
        <form className="checkout-form" onSubmit={submitHandler}>
         
          <label>Full Name</label>
          <input name="fullname" placeholder="Full Name" onChange={handleChange} />
        
           <label>Phone Number</label>
           <input name="phone" placeholder="Phone" onChange={handleChange} />

          <label>Street</label>
           <input name="street" placeholder="Address" onChange={handleChange} />

          <div className="row">
            <div>
              <label>City</label>
             <input name="city" placeholder="City" onChange={handleChange} />
            </div>
            <div>
              <label>State</label>
              <input name="state" placeholder="State" onChange={handleChange} />
            </div>
            <div>
              <label>Country</label>
              <input name="country" placeholder="Country" onChange={handleChange} />
            </div>
          </div>

          <label>Pincode</label>
          <input name="zip" placeholder="zip" onChange={handleChange} />
          <button type="submit" disabled={loading} className="pay-btn">
          {loading ? "Placing Order..." : "Proceed to Payment"}
        </button>
        {success && <p className="success">Order Created ✅</p>}
        </form>
      </div>

      {/* Right Section */}
    <div className="checkout-right">
        <h3>ORDER SUMMARY</h3>

        <div className="summary-item">
          <img
            src={nikeshoe}
            alt="product"
          />
          <div>
            <p className="product-name">Pegasus 40</p>
            <span className="product-size">Size: UK 6 × 4</span>
          </div>
          <strong>₹47,980</strong>
        </div>

        <div className="summary-row">
          <span>Subtotal</span>
          <span></span>
        </div>

        <div className="summary-row">
          <span>Shipping</span>
          <span className="free">FREE</span>
        </div>

        <div className="summary-total">
          <span>Total</span>
          <strong>₹47,980</strong>
        </div>
      </div> 
    </div>
  );
}
