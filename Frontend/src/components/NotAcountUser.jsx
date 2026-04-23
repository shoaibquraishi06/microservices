import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import "../style/notUserAccount.css";

export default function Account() {
  const user = JSON.parse(localStorage.getItem("user"));

  // USER NOT LOGGED IN
  if (!user) {
    return (
      <section className="guest-account">
        <div className="guest-card">
          <div className="guest-icon"><VscAccount /></div>

          <h1>Welcome</h1>
          <p>
            Please login to view your profile,
            orders, cart and account settings.
          </p>

          <div className="guest-actions">
            <Link
              to="/login"
              className="login-btn"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="register-btn"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // LOGGED IN UI
  return (
    <section className="account-page">
      <div className="account-card">
        <h1>Hello, {user.name}</h1>
        <p>{user.email}</p>
      </div>
    </section>
  );
}