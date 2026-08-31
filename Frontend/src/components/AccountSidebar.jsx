import "../style/sidebar.css";
import axios from "axios";
import { IoIosLogOut } from "react-icons/io";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../feature/authSlice";
import { resetCart } from "../feature/cartSlice";
import { CiUser } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineBorderColor } from "react-icons/md";
import photo from "../assets/newLogo.png"
import NotUser from "../components/NotAcountUser";

export default function AccountSidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  if (!user) {
    return <NotUser/>;
  }

    const handleLogout = async () => {
    try {
      await axios.post(
        "https://microservices-u9us.onrender.com/api/auth/logout",
        {},
        {
          withCredentials: true, // important for cookies
        }
      );

      dispatch(resetCart());
      dispatch(logout());

      localStorage.clear();
      sessionStorage.clear();

      navigate("/login", { replace: true });
    } catch (error) {
      console.error(
        error.response?.data?.message || "Logout failed"
      );
    }
  };



  return (
    <aside className="sidebar">
  
     <div className="sidebar-container"></div>
      <div className="profile-box">
        <div className="avatar">S</div>
      <div className="profile-det">
        <h3>{user.username}</h3>
        <p>{user.email}</p>
        </div>
      </div>

      <ul className="menu">
        <li className="active"> <span><CiUser /></span> Personal information</li>
        <li><span><MdOutlineBorderColor /></span> My Orders</li>
        <li><span><MdFavoriteBorder /></span> Wishlist</li>
        <li><span><LuShoppingCart /></span> Cart</li>
        {/* <li className="logout" onClick={handleLogout}>
          {" "}
          <IoIosLogOut />
          <span>Logout</span>
        </li> */}
     
     
      </ul>
    
        <div className="logout-btn">
          <button>
        <span><IoIosLogOut /></span>    Logout
          </button>

        </div>

    </aside>

    
  );
}
