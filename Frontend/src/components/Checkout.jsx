import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createOrder } from "../feature/order/order.Thunk"
import { useNavigate } from "react-router-dom";
// import { getCart } from "../feature/cart/cartThunk";
import nikeshoe from "../assets/nikeshoes3.avif";
import "../style/checkout.css";

export default function Checkout() {
  
     const dispatch = useDispatch();
     const navigate = useNavigate();
  
     const paymentPageHandler = (e) => {
    
     navigate("/payment");
   
  };

  const { loading, success } = useSelector((state) => state.order);
 
   const { items = [] } = useSelector(state => state.cart.items);
  //  console.log("items", items);
   
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

   
  const total = items.reduce(
  (sum, item) => sum + (item.price?.amount || 0) * item.quantity,
  0
);

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
          <button type="submit" disabled={loading} className="pay-btn" onClick={paymentPageHandler}>
          {loading ? "Placing Order..." : "Proceed to Payment"}
        </button>
        {success && <p className="success">  Order Created ✅</p>}
        </form>
      </div>

      {/* Right Section */}
    <div className="checkout-right">
  <h3>ORDER SUMMARY</h3>

  {items.map((item) => (
    <div key={item.productId} className="summary-item">

      <img
        src={item.image}
        alt={item.title}
      />

      <div className="product-name">
        <p>{item.title}</p>
        <span>Qty: {item.quantity}</span>
      </div>

      <strong className="product-price">
        ₹ {(item.price?.amount || 0) * item.quantity}
      </strong>

    </div>
  ))}
<hr />
  <div className="summary-row">
    <span>Subtotal</span>
    <span>₹ {total}</span>
  </div>

  <div className="summary-row">
    <span>Shipping</span>
    <span className="free">FREE</span>
  </div>

  <div className="summary-total">
    <span>Total</span>
    <strong>₹ {total}</strong>
  </div>

</div> 
    </div>
  );
}
