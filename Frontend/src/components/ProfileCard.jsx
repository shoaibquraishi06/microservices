import "../style/profileCard.css";

import {
  CiUser,
  CiHeart,
  CiShoppingCart,
} from "react-icons/ci";

import {
  MdOutlineBorderColor,
} from "react-icons/md";


export default function UserProfileCard({
  user,
  activeTab,
  setActiveTab,
}) {

  const menu = [

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

    <div className="profile-card">

      <div className="profile-user">

        <div className="profile-avatar">

          {(user?.username || user?.name || "U")
            .charAt(0)
            .toUpperCase()}

        </div>


        <div>

          <h3 className="profile-name">
            {user?.username ||
              user?.name ||
              "Nike Member"}
          </h3>

          <p className="profile-email">
            {user?.email}
          </p>

        </div>

      </div>


      <div className="profile-menu">

        {menu.map((item) => (

          <button
            key={item.id}
            className={
              activeTab === item.id
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab(item.id)
            }
          >

            <span>
              {item.icon}
            </span>

            {item.label}

          </button>

        ))}

      </div>

    </div>

  );

}