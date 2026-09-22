import "../style/account.css";

import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../feature/authSlice";
import { resetCart } from "../feature/cartSlice";

import AccountSidebar from "../components/AccountSidebar";
import RecentOrders from "../components/RecentOrders";
import NotUser from "../components/NotAcountUser";

import {
  CiUser,
  CiHeart,
  CiShoppingCart,
} from "react-icons/ci";
import {
  MdOutlineBorderColor,
} from "react-icons/md";
import {
  IoIosLogOut,
} from "react-icons/io";


export default function Account() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  const [activeTab, setActiveTab] = useState("personal");


  if ( user) {
    return <NotUser />;
  }


  const handleLogout = async () => {

    try {

      await axios.post(
        "https://microservices-u9us.onrender.com/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(resetCart());
      dispatch(logout());

      localStorage.clear();
      sessionStorage.clear();

      navigate("/login", {
        replace: true,
      });

    } catch (error) {

      console.error(
        error.response?.data?.message || "Logout failed"
      );

    }

  };


  const renderContent = () => {

    switch (activeTab) {

      case "personal":

        return (
          <PersonalInformation
            user={user}
          />
        );


      case "orders":

        return (
          <RecentOrders />
        );


      case "wishlist":

        return (
          <Wishlist />
        );


      case "cart":

        return (
          <CartSection
            cartItems={cartItems}
          />
        );


      default:

        return (
          <PersonalInformation
            user={user}
          />
        );
    }

  };


  return (

    <main className="account-page">

      <div className="account-layout">

        <AccountSidebar
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
        />


        <section className="account-main">

          <div className="account-top">

            <div>
              <span className="account-eyebrow">
                NIKE MEMBERSHIP
              </span>

              <h1 className="page-title">
                My Account
              </h1>
            </div>

          </div>


          <div className="account-content">

            {renderContent()}

          </div>

        </section>

      </div>

    </main>

  );
}


/* =========================
   PERSONAL INFORMATION
========================= */

function PersonalInformation({ user }) {

  return (

    <section className="account-card-tab personal-card">

      <div className="card-top">

        <div className="nike-mark">
          ✓
        </div>

        <div>

          <span className="section-label">
            ACCOUNT
          </span>

          <h2>
            Personal information
          </h2>

          <p>
            Manage your account details.
          </p>

        </div>

      </div>


      <div className="account-form-grid">

        <AccountField
          label="Full Name"
          value={user.username || user.name || "—"}
        />

        <AccountField
          label="Email"
          value={user.email || "—"}
        />

        <AccountField
          label="Phone Number"
          value={
            user.phone ||
            user.phoneNumber ||
            "Not added"
          }
        />

        <AccountField
          label="Account Type"
          value={user.role || user.accountType || "user"}
        />

      </div>


      <div className="card-bottom">

        <button className="save-btn">
          Save Changes
        </button>

      </div>

    </section>

  );
}


function AccountField({ label, value }) {

  return (

    <div className="account-field">

      <label>
        {label}
      </label>

      <div className="field-value">
        {value}
      </div>

    </div>

  );

}


/* =========================
   WISHLIST
========================= */

function Wishlist() {

  return (

    <section className="account-card empty-account-card">

      <div className="empty-icon">
        <CiHeart />
      </div>

      <span className="section-label">
        SAVED ITEMS
      </span>

      <h2>
        Your Wishlist
      </h2>

      <p>
        Products you save will appear here.
      </p>

      <button
        className="primary-account-btn"
        onClick={() => window.location.href = "/product"}
      >
        Explore Products
      </button>

    </section>

  );
}


/* =========================
   CART
========================= */

function CartSection({ cartItems }) {

  const navigate = useNavigate();

  if (!cartItems || cartItems.length === 0) {

    return (

      <section className="account-card empty-account-card">

        <div className="empty-icon">
          <CiShoppingCart />
        </div>

        <span className="section-label">
          SHOPPING BAG
        </span>

        <h2>
          Your Cart is Empty
        </h2>

        <p>
          Add something you love and it will appear here.
        </p>

        <button
          className="primary-account-btn"
          onClick={() => navigate("/product")}
        >
          Start Shopping
        </button>

      </section>

    );

  }


  return (

    <section className="account-card cart-account-card">

      <div className="section-heading-row">

        <div>

          <span className="section-label">
            SHOPPING BAG
          </span>

          <h2>
            Your Cart
          </h2>

        </div>

        <span className="item-count">
          {cartItems.length} items
        </span>

      </div>


      <div className="account-cart-list">

        {cartItems.map((item, index) => (

          <div
            className="account-cart-item"
            key={item.productId || item._id || index}
          >

            <div className="cart-item-image">

              {item.image || item.images?.[0]?.url ? (

                <img
                  src={
                    item.image ||
                    item.images?.[0]?.url
                  }
                  alt={item.title || "Product"}
                />

              ) : (

                <span>
                  NIKE
                </span>

              )}

            </div>


            <div className="cart-item-info">

              <h3>
                {item.title || "Nike Product"}
              </h3>

              <p>
                Quantity: {item.quantity || item.qty || 1}
              </p>

            </div>


            <div className="cart-item-price">

              ₹
              {item.price?.amount ||
                item.price ||
                "—"}

            </div>

          </div>

        ))}

      </div>


      <div className="cart-footer">

        <button
          className="primary-account-btn"
          onClick={() => navigate("/cart")}
        >
          View Cart
        </button>

      </div>

    </section>

  );

}