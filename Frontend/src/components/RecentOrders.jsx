import "../style/orders.css";
import { useNavigate } from "react-router-dom";

import {
  MdOutlineShoppingBag,
} from "react-icons/md";


export default function RecentOrders() {

  const navigate = useNavigate();


  return (

    <section className="orders-card">

      <div className="orders-header">

        <div>

          <span className="orders-label">
            PURCHASE HISTORY
          </span>

          <h2>
            My Orders
          </h2>

        </div>


        <span className="orders-count">
          0 orders
        </span>

      </div>


      <div className="orders-empty">

        <div className="orders-icon">
          <MdOutlineShoppingBag />
        </div>


        <h3>
          No orders yet
        </h3>


        <p>
          When you place an order,
          it will appear here.
        </p>


        <button
          onClick={() => navigate("/product")}
        >
          Start Shopping
        </button>

      </div>

    </section>

  );

}