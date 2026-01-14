import "../style/profileCard.css";

export default function UserProfileCard({ user }) {
  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <span>{user.name.charAt(0)}</span>
      </div>

      <h3 className="profile-name">{user.name}</h3>
      <p className="profile-email">{user.email}</p>

      <div className="profile-menu">
        <button className="active">My Account</button>
        <button>My Orders</button>
        <button>Wishlist</button>
        <button>Cart</button>
        <button className="logout">Logout</button>
      </div>
    </div>
  );
}
