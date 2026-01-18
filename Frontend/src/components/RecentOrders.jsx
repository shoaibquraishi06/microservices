import "../style/orders.css";
import { Link, useNavigate } from "react-router-dom";

export default function RecentOrders() {

    const navigate = useNavigate();

    const backToShopping = async (e) => {
    
       navigate("/product")
       
     }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Recent Orders</h2>
        <span className="view-all">View All</span>
      </div>

      <div className="empty-orders">
        <p>No orders yet</p>
        <button onClick={backToShopping}>Start Shopping</button>
      </div>
    </div>
  );
}
