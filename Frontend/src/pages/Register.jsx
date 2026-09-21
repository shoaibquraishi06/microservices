import { useState } from "react";
import logo from "../assets/logo.jpg";
import google from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import "../style/register.css";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!username) {
      setError("Username is required!");
      return;
    }

    if (!email) {
      setError("Email is required!");
      return;
    }

    if (!password) {
      setError("Password is required!");
      return;
    }

    setSubmitting(true);

    try {
      await axios.post(
        "https://microservices-u9us.onrender.com/api/auth/register",
        {
          email,
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setError("");

      alert("Account created!");

      navigate("/login");
    } catch (err) {
      console.error(err);

      setError(
        "Registration failed! " +
          (err.response?.data?.message || "")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page register-page">
      <div className="auth-shell">

        {/* LEFT BRAND PANEL */}
        <div className="auth-brand">
          <img src={logo} alt="Brand Logo" />

          <div className="brand-content">
            <span>NIKE STORE</span>

            <h1>
              Start.
              <br />
              Your.
              <br />
              Journey.
            </h1>

            <p>
              Create your account and experience
              a cleaner way to shop.
            </p>
          </div>

          <div className="brand-footer">
            <span>© 2026</span>
            <span>JUST DO IT.</span>
          </div>
        </div>

        {/* FORM */}
        <section className="auth-form-section">
          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="mobile-logo">
              <img src={logo} alt="Brand Logo" />
            </div>

            <div className="auth-heading">
              <span className="eyebrow">
                NEW HERE?
              </span>

              <h2>Create account</h2>

              <p>
                Join us and start your shopping journey.
              </p>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            {/* USERNAME */}
            <div className="field-group">
              <label htmlFor="register-username">
                Username
              </label>

              <input
                id="register-username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                autoComplete="username"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="field-group">
              <label htmlFor="register-email">
                Email
              </label>

              <input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="field-group">
              <label htmlFor="register-password">
                Password
              </label>

              <input
                id="register-password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="new-password"
                required
              />
            </div>

            {/* ROLE */}
            <div className="role-section">
              <span className="role-label">
                Account type
              </span>

              <div className="role-options">

                <label
                  className={`role-option ${
                    role === "user" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === "user"}
                    onChange={() => setRole("user")}
                  />

                  <span>User</span>
                </label>

                <label
                  className={`role-option ${
                    role === "seller" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={role === "seller"}
                    onChange={() => setRole("seller")}
                  />

                  <span>Seller</span>
                </label>

              </div>
            </div>

            {/* REGISTER */}
            <button
              type="submit"
              className="primary-auth-btn"
              disabled={submitting}
            >
              {submitting ? (
                <span className="button-loading">
                  <span></span>
                  Creating account...
                </span>
              ) : (
                <>
                  <span>Create account</span>
                  <span className="button-arrow">
                    →
                  </span>
                </>
              )}
            </button>

            {/* LOGIN */}
            <p className="auth-switch">
              Already have an account?
              <Link to="/login">
                Sign in
              </Link>
            </p>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              className="google-auth-btn"
            >
              <img
                src={google}
                alt="Google"
              />

              <span>Continue with Google</span>
            </button>

            <p className="auth-note">
              By creating an account, you agree to
              our terms and privacy policy.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}