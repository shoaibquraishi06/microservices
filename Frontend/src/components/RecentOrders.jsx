import "../style/orders.css";

export default function RecentOrders() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Recent Orders</h2>
        <span className="view-all">View All</span>
      </div>

      <div className="empty-orders">
        <p>No orders yet</p>
        <button>Start Shopping</button>
      </div>
    </div>
  );
}
