import React from "react";
import Logo from "../assets/whitelogo.jpg";
import "../style/footer.css";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* ================= BRAND ================= */}

        <div className="footer-logo-section">

          <img
            src={Logo}
            alt="Nike Logo"
            className="footer-logo"
          />

          <p className="footer-copyright">
            © 2025 NIKE
            <br />
            All Rights Reserved
          </p>

        </div>


        {/* ================= LINKS ================= */}

        <div className="footer-links-section">

          {/* Info */}

          <div className="footer-links-group">

            <h4>Info</h4>

            <ul>
              <li>Find a store</li>
              <li>Discount</li>
              <li>Gift</li>
              <li>Feedback</li>
              <li>Become a member</li>
            </ul>

          </div>


          {/* Shop */}

          <div className="footer-links-group">

            <h4>Shop</h4>

            <ul>
              <li>Man</li>
              <li>Woman</li>
              <li>Kids</li>
              <li>Collections</li>
              <li>Contacts</li>
            </ul>

          </div>


          {/* About */}

          <div className="footer-links-group">

            <h4>About</h4>

            <ul>
              <li>News</li>
              <li>Careers</li>
            </ul>

          </div>

        </div>


        {/* ================= SOCIAL ================= */}

        <div className="footer-social-section">

          <div className="footer-social-icons">

            <a
              href="#"
              aria-label="Twitter"
              className="footer-social-icon"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="footer-social-icon"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="footer-social-icon"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="footer-social-icon"
            >
              <FaYoutube />
            </a>

          </div>


          <a
            href="#"
            className="footer-policy"
          >
            Privacy & Cookie Policy
          </a>

        </div>

      </div>


      {/* ================= LARGE NIKE TEXT ================= */}

      <div className="footer-bottom">

        <h2 className="end-text">
          NIKE
        </h2>

      </div>

    </footer>
  );
};

export default Footer;