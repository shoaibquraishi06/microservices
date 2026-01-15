import "../style/sidebar.css";
import { useSelector } from "react-redux";

export default function AccountSidebar() {
 
   const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <p>Please login first</p>;
  }

  return (
    <aside className="sidebar">
      <div className="profile-box">
        <div className="avatar">S</div>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
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
