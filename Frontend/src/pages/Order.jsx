import React, { useEffect } from "react";
import Product from "../assets/nikeshoes2.avif"
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../feature/order/order.Thunk";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Skalaton from "../components/OrderSkaleton";
import "../style/order.css";

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Redux se data le rahe hain
  const { orders, loading } = useSelector((state) => state.order);
  const { items } = useSelector((state) => state.cart.items);
  console.log(orders);
  console.log(items);

  // ✅ Component load hote hi API call
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (loading) return <Skalaton />;

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
          {order.items.map((items, i) => (
            <div className="order-item" key={i}>
              <img src={items.image} alt="product" />

              <div className="item-info">
                <h4>{items.title || "Product"}</h4>
                <p>Size: UK 6 × {items.quantity}</p>
              </div>

              {/* <div className="item-price">
                ₹ {item.price.amount.toLocaleString()}
              </div> */}
            </div>
          ))}

        

       

            
         
        </div>
      ))}
    </div>
  );
}
