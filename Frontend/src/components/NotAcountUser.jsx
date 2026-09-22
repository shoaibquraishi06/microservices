import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FaArrowRight } from "react-icons/fa6";
import "../style/notUserAccount.css";

export default function Account() {
  const user = JSON.parse(localStorage.getItem("user"));

  // =====================================
  // USER NOT LOGGED IN
  // =====================================
  if (!user) {
    return (
      <section className="guest-account">
        <div className="guest-card">

          {/* TOP LABEL */}
          <span className="guest-label">
            ACCOUNT
          </span>

          {/* ACCOUNT ICON */}
          <div className="guest-icon">
            <VscAccount />
          </div>

          {/* HEADING */}
          <h1>
            Welcome
          </h1>

          <p className="guest-description">
            Sign in to access your profile, orders,
            shopping bag and account settings.
          </p>

          {/* ACTIONS */}
          <div className="guest-actions">

            <Link
              to="/login"
              className="guest-login-btn"
            >
              <span>Login</span>

              <FaArrowRight className="guest-arrow" />
            </Link>

            <Link
              to="/register"
              className="guest-register-btn"
            >
              Create Account
            </Link>

          </div>

          {/* FOOTER */}
          <div className="guest-footer">
            <span>New to the store?</span>

            <Link to="/register">
              Create an account
            </Link>
          </div>

        </div>
      </section>
    );
  }

  // =====================================
  // LOGGED IN USER
  // =====================================

  return (
    <section className="account-page">

      <div className="account-card">

        <span className="account-label">
          MY ACCOUNT
        </span>

        <div className="account-icon">
          <VscAccount />
        </div>

        <h1>
          Hello, {user.name || user.username || "User"}
        </h1>

        <p>
          {user.email}
        </p>

      </div>

    </section>
  );
}