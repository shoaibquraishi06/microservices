import React, { useEffect } from "react";
import Product from "../assets/nikeshoes2.avif"
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../feature/order/order.Thunk";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import "../style/order.css";

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Redux se data le rahe hain
  const { orders, loading } = useSelector((state) => state.order);

  // ✅ Component load hote hi API call
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className="orders-container">
      {/* BACK */}
      <div className="back-link" onClick={() => navigate("/profile")}>
        <FaArrowLeftLong /> Back to Profile
      </div>

      <h1 className="orders-title">MY ORDERS</h1>

      {/* ✅ Yaha orders render ho rahe hain */}
      {orders?.map((order) => (
        <div className="order-card" id="cardId" key={order._id}>
          {/* HEADER */}
          <div className="order-header">
            <div>
              <h3>order_id :- {order._id.slice(-10)}</h3>
              <p>Placed on {new Date(order.createdAt).toDateString()}</p>
            </div>

            <div className="order-right">
              <span className="status">{order.status}</span>
              <span className="price">
                ₹ {order.totalPrice.amount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* ITEMS */}
          {order.items.map((item, i) => (
            <div className="order-item" key={i}>
              <img src={Product} alt="product" />

              <div className="item-info">
                <h4>{item.title || "Product"}</h4>
                <p>Size: UK 6 × {item.quantity}</p>
              </div>

              {/* <div className="item-price">
                ₹ {item.price.amount.toLocaleString()}
              </div> */}
            </div>
          ))}

          {/* <hr /> */}

          {/* SHIPPING */}
          {/* <div className="shipping">
            <p className="shipping-title">Shipping Address</p>
            <div className="shipping-details"> */}
              {/* <h4>Name:- {order.shippingAddress.fullname}</h4> */}

              {/* <p> Name:- <span> {order.shippingAddress.fullname}</span> </p>
              <p> Address:- <span>{order.shippingAddress.street} </span></p>
              <p> City :- <span>{order.shippingAddress.city} </span> </p>
              <p> State :- <span>{order.shippingAddress.state}</span></p>
              <p> Phone Phone: -<span>{order.shippingAddress.phone}</span></p>
              <p> Phone Phone: -<span>{order.shippingAddress.pincode}</span></p>
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
}
