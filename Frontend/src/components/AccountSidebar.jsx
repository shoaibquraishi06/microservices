import "../style/accountsidebar.css";

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


export default function AccountSidebar({
  user,
  activeTab,
  setActiveTab,
  handleLogout,
}) {

  const menuItems = [

    {
      id: "personal",
      label: "Personal information",
      icon: <CiUser />,
    },

    {
      id: "orders",
      label: "My Orders",
      icon: <MdOutlineBorderColor />,
    },

    {
      id: "wishlist",
      label: "Wishlist",
      icon: <CiHeart />,
    },

    {
      id: "cart",
      label: "Cart",
      icon: <CiShoppingCart />,
    },

  ];


  return (

    <aside className="sidebar">

      <div className="sidebar-profile">

        <div className="sidebar-avatar">

          {(user?.username || user?.name || "U")
            .charAt(0)
            .toUpperCase()}

        </div>


        <div className="sidebar-user">

          <h3>
            {user?.username ||
              user?.name ||
              "Nike Member"}
          </h3>

          <p>
            {user?.email || ""}
          </p>

        </div>

      </div>


      <nav className="account-menu">

        <span className="menu-caption">
          ACCOUNT
        </span>


        {menuItems.map((item) => (

          <button
            key={item.id}
            className={`account-menu-item ${
              activeTab === item.id
                ? "active"
                : ""
            }`}
            onClick={() => setActiveTab(item.id)}
          >

            <span className="menu-icon">
              {item.icon}
            </span>

            <span>
              {item.label}
            </span>

          </button>

        ))}

      </nav>


      <div className="sidebar-bottom">

        <button
          className="logout-account-btn"
          onClick={handleLogout}
        >

          <IoIosLogOut />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>

  );

}