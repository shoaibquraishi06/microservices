import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/register.css";

export default function SellerRegister() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("All fields are required!");
      return;
    }
    // Add your registration logic here
    setError("");
    // navigate('/seller/login');
  };

  return (
    <div className="register-container">
      <h2>Seller Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/seller/login">Login</Link>
      </p>
    </div>
  );
}
