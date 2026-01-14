import "../style/sidebar.css";

export default function AccountSidebar() {
  return (
    <aside className="sidebar">
      <div className="profile-box">
        <div className="avatar">N</div>
        <h3>Nike Admin</h3>
        <p>admin@nike.com</p>
      </div>

      <ul className="menu">
        <li className="active">My Account</li>
        <li>My Orders</li>
        <li>Wishlist</li>
        <li>Cart</li>
        <li className="logout">Logout</li>
      </ul>
    </aside>
  );
}
