import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../feature/order/order.Thunk";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiMapPin, FiShoppingBag } from "react-icons/fi";

import "../style/checkout.css";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success } = useSelector((state) => state.order);
  const { items = [] } = useSelector((state) => state.cart);

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  // Redirect after successful order creation
  useEffect(() => {
    if (success) {
      navigate("/payment");
    }
  }, [success, navigate]);

  const backHandler = () => {
    navigate("/cart");
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createOrder({
        shippingAddress: form,
        items,
      })
    );
  };

  const total = items.reduce(
    (sum, item) =>
      sum + (item.price?.amount || 0) * (item.quantity || 0),
    0
  );

  // Empty cart
  if (!items || items.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="checkout-empty-icon">
          <FiShoppingBag />
        </div>

        <h2>Your cart is empty</h2>
        <p>Add some products before proceeding to checkout.</p>

        <button onClick={() => navigate("/product")}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <main className="checkout-page">

      {/* TOP BACK */}
      <div className="checkout-topbar">
        <button
          className="checkout-back"
          onClick={backHandler}
          type="button"
        >
          <FaArrowLeftLong />
          <span>Back to Cart</span>
        </button>
      </div>

      <div className="checkout-layout">

        {/* ================= LEFT ================= */}
        <section className="checkout-left">

          <div className="checkout-heading">
            <div className="heading-icon">
              <FiMapPin />
            </div>

            <div>
              <span>CHECKOUT</span>
              <h1>Shipping Address</h1>
              <p>Enter your delivery details to continue.</p>
            </div>
          </div>

          <form
            className="checkout-form"
            onSubmit={submitHandler}
          >

            {/* NAME */}
            <div className="form-group full">
              <label htmlFor="fullname">
                Full Name
              </label>

              <input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Enter your full name"
                value={form.fullname}
                onChange={handleChange}
                required
              />
            </div>

            {/* PHONE */}
            <div className="form-group full">
              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* STREET */}
            <div className="form-group full">
              <label htmlFor="street">
                Street Address
              </label>

              <input
                id="street"
                name="street"
                type="text"
                placeholder="House no. / Street / Area"
                value={form.street}
                onChange={handleChange}
                required
              />
            </div>

            {/* CITY STATE COUNTRY */}
            <div className="form-grid">

              <div className="form-group">
                <label htmlFor="city">City</label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>

                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>

                <input
                  id="country"
                  name="country"
                  type="text"
                  placeholder="Country"
                  value={form.country}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="zip">Pincode</label>

                <input
                  id="zip"
                  name="zip"
                  type="text"
                  placeholder="Pincode"
                  value={form.zip}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {/* PAYMENT BUTTON */}
            <button
              type="submit"
              className="pay-btn"
              disabled={loading}
            >
              <span>
                {loading
                  ? "Creating Order..."
                  : "Proceed to Payment"}
              </span>

              {!loading && <FaArrowLeftLong />}
            </button>

            {success && (
              <p className="checkout-success">
                Order created successfully
              </p>
            )}

          </form>
        </section>


        {/* ================= RIGHT ================= */}
        <aside className="checkout-right">

          <div className="summary-heading">
            <div>
              <span>YOUR BAG</span>
              <h2>Order Summary</h2>
            </div>

            <div className="bag-count">
              {items.length}
            </div>
          </div>


          {/* PRODUCTS */}
          <div className="summary-products">

            {items.map((item) => (
              <div
                key={item.productId}
                className="summary-item"
              >

                <div className="summary-image">
                  <img
                    src={item.image}
                    alt={item.title}
                  />
                </div>

                <div className="product-name">
                  <h3>{item.title}</h3>

                  <p>
                    {item.description || "Nike footwear"}
                  </p>

                  <span>
                    Qty: {item.quantity}
                  </span>
                </div>

                <strong className="product-price">
                  ₹
                  {(item.price?.amount || 0) *
                    item.quantity}
                </strong>

              </div>
            ))}

          </div>


          {/* TOTAL */}
          <div className="summary-divider" />

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₹ {total}</strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <strong className="free">
              FREE
            </strong>
          </div>

          <div className="summary-divider" />

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ₹ {total}
            </strong>
          </div>


          <div className="secure-checkout">
            <span>●</span>
            Secure checkout
          </div>

        </aside>

      </div>
    </main>
  );
}