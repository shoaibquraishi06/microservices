import React, { useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { CgMenu } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";

import logo from '../assets/logo.jpg';
import CartDrawer from "../components/Cart";
import { Link, useNavigate } from "react-router-dom";
import profilePic from '../assets/heroSection.avif'; // Use your own profile image if available

import "../style/Navber.css";
import "../style/profileCard.css";
import Account from "../pages/Account";
// import Wishlist from "../components/Whishlist";

const Navber = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [open, setOpen] = useState(false);
 

   const navigate = useNavigate();

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  const handleProfileClick = (e) => {
    e.stopPropagation();
     navigate("/account");
    // setShowProfile((prev) => !prev);
  };

 const WishlistCards = (e) => {

  e

 }


  React.useEffect(() => {
    const handleClickOutside = () => setShowProfile(false);
    if (showProfile) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [showProfile]);



  return (
    <div className="header">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Brand-logo" />
        </div>
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/product">Products</Link>
          {/* <Link to="/cart">Cart</Link> */}
          <Link to="/orders">Orders</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="nav-end">
          <div className="whistlist">

          <CartDrawer
          isOpen={open}
          onClose={() => setOpen(false)}
        />
  
          <button  className="whistlist-btn"  onClick={() => setOpen(true)}>
      <IoBagHandleOutline />
      
      </button>

        


          </div>
          <div className="Profile" onClick={handleProfileClick} style={{ position: 'relative', cursor: 'pointer' }}>
            <VscAccount />
            {showProfile && (
              
               
         <button className="close-profile" onClick={() =>setShowProfile(false)}></button>
             
            )}
          </div>
          <div className="navbar-menu" onClick={handleMenuToggle}>
            <CgMenu />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navber;