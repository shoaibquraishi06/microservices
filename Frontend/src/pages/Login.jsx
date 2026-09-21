import { useState } from "react";
import logo from "../assets/logo.jpg";
import google from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../feature/authSlice";
import axios from "axios";
import "../style/login.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      const res = await axios.post(
        "https://microservices-u9us.onrender.com/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("token", res.data.token);

      const user = res.data.user;

      dispatch(loginSuccess(user));

      navigate("/account");
    } catch (err) {
      setError(
        err.response?.data?.message || "Wrong credentials"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page login-page">
      <div className="auth-shell">

        {/* LEFT BRAND PANEL */}
        <div className="auth-brand">
          <img src={logo} alt="Brand Logo" />

          <div className="brand-content">
            <span>NIKE STORE</span>
            <h1>
              Move.
              <br />
              Create.
              <br />
              Repeat.
            </h1>

            <p>
              Premium products. Simple experience.
              Built for your everyday movement.
            </p>
          </div>

          <div className="brand-footer">
            <span>© 2026</span>
            <span>JUST DO IT.</span>
          </div>
        </div>

        {/* FORM PANEL */}
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
                WELCOME BACK
              </span>

              <h2>Sign in</h2>

              <p>
                Enter your details to access your account.
              </p>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            {/* EMAIL */}
            <div className="field-group">
              <label htmlFor="login-email">
                Email
              </label>

              <input
                id="login-email"
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
              <label htmlFor="login-password">
                Password
              </label>

              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="current-password"
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

            {/* LOGIN BUTTON */}
            <button
              className="primary-auth-btn"
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <span className="button-loading">
                  <span></span>
                  Signing in...
                </span>
              ) : (
                <>
                  <span>Sign in</span>
                  <span className="button-arrow">→</span>
                </>
              )}
            </button>

            {/* REGISTER */}
            <p className="auth-switch">
              Don't have an account?
              <Link to="/register">
                Create account
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
              By continuing, you agree to our terms
              and privacy policy.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}