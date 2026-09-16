import React, { useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { CgMenu } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";

import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/newLogo.png";

import CartDrawer from "../components/Cart";
import Search from "../components/Search";

import "../style/Navber.css";
import "../style/profileCard.css";

const Navber = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Search open / close
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    navigate("/account");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div className="header">
        <nav className="navbar">

          {/* LOGO */}
          <div className="navbar-logo">
            <Link to="/">
              <img src={logo} alt="Brand-logo" />
            </Link>
          </div>

          {/* NAV LINKS */}
          <div
            className={`navbar-links ${
              menuOpen ? "active" : ""
            }`}
          >
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>

            <Link
              to="/orders"
              onClick={() => setMenuOpen(false)}
            >
              Orders
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="nav-end">

            {/* SEARCH */}
            <button
              className="nav-search-btn"
              onClick={handleSearchOpen}
              aria-label="Open search"
            >
              <CiSearch />
              <span>Search</span>
            </button>

            {/* CART */}
            <div className="whistlist">
              <button
                className="whistlist-btn"
                onClick={handleCartClick}
              >
                <IoBagHandleOutline />
              </button>
            </div>

            {/* PROFILE */}
            <div
              className="Profile"
              onClick={handleProfileClick}
            >
              <VscAccount />
            </div>

            {/* MOBILE MENU */}
            <div
              className="navbar-menu"
              onClick={handleMenuToggle}
            >
              <CgMenu />
            </div>
          </div>
        </nav>
      </div>

      {/* ================= SEARCH OVERLAY ================= */}

      {searchOpen && (
        <Search onClose={handleSearchClose} />
      )}
    </>
  );
};

export default Navber;