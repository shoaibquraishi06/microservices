import React, { useEffect } from "react";
import { fetchCart } from "../feature/cartThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FiShoppingBag } from "react-icons/fi";
import { FaArrowLeftLong } from "react-icons/fa6";

import Skalaton from "./CartSkalaton";

import "../style/cart.css";

export default function CartDrawer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const cartItems = Array.isArray(items) ? items : [];

  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price?.amount || 0);
    const quantity = Number(item.quantity || 0);

    return sum + price * quantity;
  }, 0);

  const backHandler = () => {
    navigate(-1);
  };

  const productPageHandler = () => {
    navigate("/product");
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-loading">
          <Skalaton />
        </div>
      </div>
    );
  }

  /* =========================
     EMPTY CART
  ========================= */

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <FiShoppingBag />
          </div>

          <span className="empty-cart-label">YOUR BAG</span>

          <h2>Your Cart is Empty</h2>

          <p>
            Looks like you haven't added anything to your bag yet.
          </p>

          <button
            className="cart-btn"
            onClick={productPageHandler}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     CART
  ========================= */

  return (
    <main className="cart-page">

      {/* BACK */}

      <button
        className="back-link-cart"
        onClick={backHandler}
      >
        <FaArrowLeftLong />
        <span>Back</span>
      </button>


      <div className="cart-layout">

        {/* =====================
            LEFT
        ===================== */}

        <section className="bag-section">

          <div className="cart-heading">

            <div>
              <span className="cart-eyebrow">
                SHOPPING BAG
              </span>

              <h1>Your Cart</h1>
            </div>

            <span className="cart-count">
              {cartItems.length}{" "}
              {cartItems.length === 1 ? "Item" : "Items"}
            </span>

          </div>


          {/* ITEMS */}

          <div className="cart-items">

            {cartItems.map((item) => {

              const unitPrice =
                Number(item.price?.amount || 0);

              const quantity =
                Number(item.quantity || 0);

              const itemTotal =
                unitPrice * quantity;

              const image =
                item.image ||
                item.images?.[0]?.url ||
                item.product?.images?.[0]?.url ||
                "";

              return (
                <article
                  className="cart-item"
                  key={item.productId}
                >

                  {/* IMAGE */}

                  <div className="cart-image-wrapper">

                    {image ? (
                      <img
                        src={image}
                        alt={item.title || "Product"}
                        className="cart-product-image"
                      />
                    ) : (
                      <div className="cart-image-placeholder">
                        <FiShoppingBag />
                      </div>
                    )}

                  </div>


                  {/* DETAILS */}

                  <div className="item-details">

                    <div className="item-main-info">

                      <span className="item-category">
                        NIKE
                      </span>

                      <h3>
                        {item.title || "Nike Product"}
                      </h3>

                      {item.description && (
                        <p>
                          {item.description}
                        </p>
                      )}

                    </div>


                    {/* QUANTITY */}

                    <div className="quantity-box">

                      <button
                        type="button"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span>
                        {quantity}
                      </span>

                      <button
                        type="button"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>

                    </div>

                  </div>


                  {/* PRICE */}

                  <div className="cart-price">

                    <span className="unit-price">
                      ₹{unitPrice}
                    </span>

                    {quantity > 1 && (
                      <span className="line-total">
                        ₹{itemTotal}
                      </span>
                    )}

                  </div>

                </article>
              );
            })}

          </div>

        </section>


        {/* =====================
            RIGHT SUMMARY
        ===================== */}

        <aside className="summary-section">

          <div className="summary-heading">
            <span>ORDER SUMMARY</span>

            <h2>Summary</h2>
          </div>


          <div className="summary-content">

            <div className="summary-row">
              <span>Bag Total</span>
              <strong>₹{total}</strong>
            </div>

            <div className="summary-row">
              <span>Sub Total</span>
              <strong>₹{total}</strong>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <strong className="free">
                Free
              </strong>
            </div>

            <div className="summary-divider" />

            <div className="summary-row total">
              <span>You Pay</span>
              <strong>₹{total}</strong>
            </div>

          </div>


          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Buy
          </button>


          <p className="secure-text">
            Secure checkout · Easy returns
          </p>

        </aside>

      </div>

    </main>
  );
}