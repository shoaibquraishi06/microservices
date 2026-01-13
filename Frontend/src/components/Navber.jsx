import React, { useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { CgMenu } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from '../assets/logo.jpg';
import CartDrawer from "../components/Cart";
import profilePic from '../assets/heroSection.avif'; // Use your own profile image if available

import "../style/Navber.css";
import "../style/profileCard.css";
// import Wishlist from "../components/Whishlist";

const Navber = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [open, setOpen] = useState(false);
 

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setShowProfile((prev) => !prev);
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
              <div className="profile-card-ui" onClick={e => e.stopPropagation()}>
                <div className="profile-card-avatar">
                  <img src={profilePic} alt="Profile" />
                </div>
                <div className="profile-card-info">
                  <h2>Shoaib Ahmed Quraishi</h2>
                  <p className="profile-email">dxshoaib51@email.com</p>
                  <p className="profile-phone">+91 8420680130</p>
                  <p className="profile-address">UP Lucknow, Raebareli 229307</p>

                </div>
                <div className="profile-card-actions">
                  <div className="profile-card-stats">
                    <div>
                      <span className="icon"><AiOutlineShoppingCart /></span>
                      <span className="icon-text">Orders</span>
                      <div className="stat">12</div>
                    </div>
                    <div>
                      <span className="icon" onClick={WishlistCards}> <IoBagHandleOutline /></span>
                      <span className="icon-text">Wishlist</span>
                      <div className="stat">8</div>
                    </div>
                    {/* <div>
                      <span className="icon">< IoLocationOutline/></span>
                      <span className="icon-text">Address</span>
                      <div className="stat"><button className="address-btn">View</button></div>
                    </div> */}
                  </div>
                  <div className="profile-card-buttons">
                    {/* <button className="edit-btn">Edit Profile</button> */}
                    <button className="logout-btn">Log Out <span className="log-icon"> <IoIosLogOut /></span></button>
                  </div>
                </div>
                <button className="close-profile" onClick={() => setShowProfile(false)}>&times;</button>
              </div>
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