import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../feature/order/order.Thunk";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  FiPackage,
  FiCalendar,
  FiChevronRight,
  FiShoppingBag,
} from "react-icons/fi";

import Skalaton from "../components/OrderSkaleton";
import "../style/order.css";

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders = [], loading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (loading) {
    return <Skalaton />;
  }

  const getStatusClass = (status = "") => {
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getTotal = (order) => {
    return (
      order?.totalPrice?.amount ??
      order?.total ??
      0
    );
  };

  return (
    <main className="orders-page">

      {/* TOP NAV */}
      <div
        className="orders-back"
        onClick={() => navigate("/profile")}
      >
        <FaArrowLeftLong />
        <span>Back</span>
      </div>

      {/* HEADER */}
      <section className="orders-heading">

        <div>
          <span className="orders-eyebrow">
            ACCOUNT / PURCHASE HISTORY
          </span>

          <h1>My Orders</h1>

          <p>
            Track your recent purchases and order details.
          </p>
        </div>

        <div className="orders-count">
          <FiPackage />
          <span>
            {orders.length}{" "}
            {orders.length === 1 ? "Order" : "Orders"}
          </span>
        </div>

      </section>

      {/* EMPTY STATE */}
      {!orders || orders.length === 0 ? (
        <section className="orders-empty">

          <div className="empty-icon">
            <FiShoppingBag />
          </div>

          <span className="orders-eyebrow">
            PURCHASE HISTORY
          </span>

          <h2>No orders yet</h2>

          <p>
            You haven't placed any orders yet.
            Start shopping to see your purchases here.
          </p>

          <button
            onClick={() => navigate("/product")}
            className="shop-orders-btn"
          >
            Explore Products
            <FiChevronRight />
          </button>

        </section>
      ) : (

        /* ORDERS */
        <section className="orders-list">

          {orders.map((order) => {

            const status = order?.status || "Pending";
            const total = getTotal(order);

            return (
              <article
                className="order-card"
                key={order._id}
              >

                {/* ORDER HEADER */}
                <div className="order-card-header">

                  <div className="order-meta">

                    <div className="order-id">
                      <span>ORDER ID</span>

                      <strong>
                        #{order._id?.slice(-10)}
                      </strong>
                    </div>

                    <div className="order-date">
                      <FiCalendar />

                      <span>
                        Placed on{" "}
                        {formatDate(order.createdAt)}
                      </span>
                    </div>

                  </div>

                  <div className="order-summary">

                    <span
                      className={`order-status ${getStatusClass(
                        status
                      )}`}
                    >
                      {status}
                    </span>

                    <strong className="order-total">
                      ₹ {Number(total).toLocaleString("en-IN")}
                    </strong>

                  </div>

                </div>

                {/* PRODUCTS */}
                <div className="order-products">

                  <div className="products-label">
                    <span>
                      {order.items?.length || 0}{" "}
                      {order.items?.length === 1
                        ? "ITEM"
                        : "ITEMS"}
                    </span>
                  </div>

                  {order.items?.map((item, index) => (

                    <div
                      className="order-product"
                      key={`${order._id}-${item.productId || index}`}
                    >

                      {/* IMAGE */}
                      <div className="order-product-image">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title || "Product"}
                          />
                        ) : (
                          <FiPackage />
                        )}
                      </div>

                      {/* INFO */}
                      <div className="order-product-info">

                        <span className="product-brand">
                          NIKE
                        </span>

                        <h3>
                          {item.title || "Product"}
                        </h3>

                        {item.description && (
                          <p>
                            {item.description}
                          </p>
                        )}

                        <div className="product-meta">

                          <span>
                            Qty:{" "}
                            <strong>
                              {item.quantity || 1}
                            </strong>
                          </span>

                          {item.size && (
                            <span>
                              Size:{" "}
                              <strong>
                                UK {item.size}
                              </strong>
                            </span>
                          )}

                        </div>

                      </div>

                      {/* PRODUCT PRICE */}
                      <div className="product-price">

                        ₹{" "}
                        {(
                          (item.price?.amount || 0) *
                          (item.quantity || 1)
                        ).toLocaleString("en-IN")}

                      </div>

                    </div>

                  ))}

                </div>

                {/* FOOTER */}
                <div className="order-card-footer">

                  <div className="delivery-info">
                    <span>ORDER STATUS</span>

                    <strong>
                      {status}
                    </strong>
                  </div>

                  <button
                    className="view-order-btn"
                    type="button"
                  >
                    View Details
                    <FiChevronRight />
                  </button>

                </div>

              </article>
            );
          })}

        </section>
      )}

    </main>
  );
}