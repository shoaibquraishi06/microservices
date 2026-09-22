import React, { useState } from "react";
import axios from "axios";

import {
  SlPhone,
} from "react-icons/sl";

import {
  TfiEmail,
} from "react-icons/tfi";

import {
  IoLocationOutline,
} from "react-icons/io5";

import {
  FiArrowUpRight,
  FiCheck,
} from "react-icons/fi";

import "../style/contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSubmitted(false);

    try {
      await axios.post(
        "https://microservices-4-j5pd.onrender.com/api/contact",
        {
          name: form.name,
          email: form.email,
          topic: form.topic,
          message: form.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSubmitted(true);

      setForm({
        name: "",
        email: "",
        topic: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">

      {/* ================= HEADER ================= */}

      <section className="contact-hero">

        <div className="contact-eyebrow">
          <span></span>
          GET IN TOUCH
        </div>

        <h1>
          Let's talk
          <span>.</span>
        </h1>

        <p>
          Have a question about an order, product, or anything
          else? We're here to help.
        </p>

      </section>


      {/* ================= MAIN CONTENT ================= */}

      <section className="contact-wrapper">

        {/* ================= FORM ================= */}

        <div className="contact-form-card">

          <div className="form-top">

            <div>
              <span className="form-label">
                SEND US A MESSAGE
              </span>

              <h2>
                How can we help?
              </h2>
            </div>

            <div className="form-number">
              01
            </div>

          </div>


          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            {/* NAME + EMAIL */}

            <div className="contact-fields-row">

              <div className="contact-field">
                <label htmlFor="name">
                  NAME
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="contact-field">
                <label htmlFor="email">
                  EMAIL
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>


            {/* TOPIC */}

            <div className="contact-field full-field">

              <label htmlFor="topic">
                TOPIC
              </label>

              <div className="select-wrapper">

                <select
                  id="topic"
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select a topic
                  </option>

                  <option value="order">
                    Order
                  </option>

                  <option value="product">
                    Product
                  </option>

                  <option value="support">
                    Support
                  </option>

                  <option value="other">
                    Other
                  </option>

                </select>

              </div>

            </div>


            {/* MESSAGE */}

            <div className="contact-field full-field">

              <label htmlFor="message">
                MESSAGE
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="Tell us how we can help..."
                value={form.message}
                onChange={handleChange}
                rows="5"
                required
              />

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="contact-submit"
              disabled={loading}
            >

              <span>
                {loading ? "Sending..." : "Send Message"}
              </span>

              <span className="submit-icon">
                <FiArrowUpRight />
              </span>

            </button>


            {/* POLICY */}

            <p className="contact-policy">
              By sending this message, you agree to our{" "}
              <a href="#">
                Privacy Policy
              </a>
              .
            </p>


            {/* SUCCESS */}

            {submitted && (
              <div className="contact-success">

                <span className="success-icon">
                  <FiCheck />
                </span>

                <div>
                  <strong>Message sent successfully.</strong>

                  <small>
                    We'll get back to you soon.
                  </small>
                </div>

              </div>
            )}

          </form>

        </div>


        {/* ================= CONTACT INFO ================= */}

        <aside className="contact-info-card">

          <div className="info-top">

            <span className="form-label">
              CONTACT INFORMATION
            </span>

            <span className="info-dot"></span>

          </div>


          <div className="contact-info-list">

            {/* PHONE */}

            <div className="contact-info-item">

              <div className="info-icon">
                <SlPhone />
              </div>

              <div className="info-content">

                <span>
                  PHONE
                </span>

                <h3>
                  +91 8420680130
                </h3>

                <p>
                  Mon–Fri, 9am – 6pm IST
                </p>

              </div>

            </div>


            {/* EMAIL */}

            <div className="contact-info-item">

              <div className="info-icon">
                <TfiEmail />
              </div>

              <div className="info-content">

                <span>
                  EMAIL
                </span>

                <h3>
                  dxshoaib51@gmail.com
                </h3>

                <p>
                  Our team will reply within 24h
                </p>

              </div>

            </div>


            {/* LOCATION */}

            <div className="contact-info-item">

              <div className="info-icon">
                <IoLocationOutline />
              </div>

              <div className="info-content">

                <span>
                  LOCATION
                </span>

                <h3>
                  Raebareli, India
                </h3>

                <p>
                  Uttar Pradesh · 229307
                </p>

              </div>

            </div>

          </div>


          {/* BOTTOM TEXT */}

          <div className="contact-info-bottom">

            <span>
              NIKE STORE
            </span>

            <p>
              We're always happy
              <br />
              to hear from you.
            </p>

          </div>

        </aside>

      </section>

    </main>
  );
}