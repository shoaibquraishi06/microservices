import React, { useState } from "react";
import {
  IoBagHandleOutline,
  IoCloseOutline,
} from "react-icons/io5";
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
  const [showCart, setShowCart] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    closeMenu();
    navigate("/account");
  };

  const handleCartClick = () => {
    closeMenu();
    navigate("/cart");
  };

  const handleSearchOpen = () => {
    closeMenu();
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="header">
        <nav className="navbar">

          {/* ================= LOGO ================= */}
          <div className="navbar-logo">
            <Link to="/" onClick={closeMenu}>
              <img src={logo} alt="Brand logo" />
            </Link>
          </div>

          {/* ================= DESKTOP / MOBILE LINKS ================= */}
          <div
            className={`navbar-links ${
              menuOpen ? "active" : ""
            }`}
          >
            <Link to="/" onClick={closeMenu}>
              <span>Home</span>
            </Link>

            <Link to="/products" onClick={closeMenu}>
              <span>Products</span>
            </Link>

            <Link to="/orders" onClick={closeMenu}>
              <span>Orders</span>
            </Link>

            <Link to="/contact" onClick={closeMenu}>
              <span>Contact</span>
            </Link>

            {/* Mobile only */}
            <div className="mobile-menu-divider" />

            <button
              className="mobile-search"
              onClick={handleSearchOpen}
            >
              <CiSearch />
              <span>Search</span>
            </button>

            <button
              className="mobile-account"
              onClick={handleProfileClick}
            >
              <VscAccount />
              <span>Account</span>
            </button>

            <button
              className="mobile-cart"
              onClick={handleCartClick}
            >
              <IoBagHandleOutline />
              <span>Cart</span>
            </button>
          </div>

          {/* ================= RIGHT SIDE ================= */}
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
            <button
              className="nav-icon-btn"
              onClick={handleCartClick}
              aria-label="Open cart"
            >
              <IoBagHandleOutline />
            </button>

            {/* ACCOUNT */}
            <button
              className="nav-icon-btn profile-btn"
              onClick={handleProfileClick}
              aria-label="Open account"
            >
              <VscAccount />
            </button>

            {/* HAMBURGER */}
            <button
              className={`navbar-menu ${
                menuOpen ? "menu-open" : ""
              }`}
              onClick={handleMenuToggle}
              aria-label={
                menuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <IoCloseOutline />
              ) : (
                <CgMenu />
              )}
            </button>
          </div>
        </nav>

        {/* ================= MOBILE BACKDROP ================= */}
        <div
          className={`menu-backdrop ${
            menuOpen ? "show" : ""
          }`}
          onClick={closeMenu}
        />
      </header>

      {/* ================= SEARCH ================= */}
      {searchOpen && (
        <Search onClose={handleSearchClose} />
      )}
    </>
  );
};

export default Navber;