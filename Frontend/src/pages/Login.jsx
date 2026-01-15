import { useState } from "react";
import logo from "../assets/logo.jpg";
import apple from "../assets/apple.png";
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
  const [role, setRole] = useState("user"); // 'user' or 'seller'

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      setError("All fields required!");
      return;
    }

    if (!email) {
      setError("email required!");
      return;
    }
    if (!password) {
      setError("password required!");
      return;
    }
    setSubmitting(true);

  try {
  const res = await axios.post(
    "http://localhost:3000/api/auth/login",
    { email, password },
    { withCredentials: true }
  );

  // 👇 BACKEND SE USER NIKALO
  const user = res.data.user;

  // 👇 REDUX ME USER BHEJO
  dispatch(loginSuccess(user));

  setError("");
  alert("Login successfully!");

  navigate("/account"); // ya "/"
} catch (err) {
  console.error(err);
  setError(
    err.response?.data?.message || "Wrong credentials"
  );
} finally {
  setSubmitting(false);
}

  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <div className="logo">
          <img src={logo} alt="brandlogo" />
        </div>
        <h2>Welcome Back</h2>
        <p>Welcome Back! Please enter Your Details</p>

        {error && (
          <div className="error" style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          {" "}
          <p
            style={{
              fontFamily: "regular-text",
              width: "fit-content",
              color: "#2e2d2dff",
            }}
          >
            You are buyer or Seller
          </p>{" "}
        </div>

        <div
          style={{
            display: "flex",
            width: "fit-content",
            fontFamily: "regular-text",
          }}
        >
          <label>
            <input
              type="radio"
              name="role"
              value="uer"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />
            <span style={{ font: "0.5rem" }}>User</span>
          </label>
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="radio"
              name="role"
              value="seller"
              checked={role === "seller"}
              onChange={() => setRole("seller")}
            />
            Seller
          </label>
        </div>

        <button type="submit" disabled={submitting}>
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            <span className="register">Register</span>
          </Link>
        </p>

        <div className="cloud-login">
          <div className="google-login">
            <img src={google} alt="google" />
            <p>Sigh up with Google</p>
          </div>
          <div className="apple-login">
            <img src={apple} alt="apple" />
            <p>Sigh up with Apple</p>
          </div>
        </div>
      </form>
    </div>
  );
}
