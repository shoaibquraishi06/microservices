import AccountSidebar from "../components/AccountSidebar";
import RecentOrders from "../components/RecentOrders";
import AccountDetails from "../components/AccountDetails";
import { useSelector } from "react-redux";
import "../style/account.css";

export default function Account() {

  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <p>Please login first</p>;
  }

  return (
    <div className="account-page">
      <AccountSidebar />

      <div className="account-content">
        <h1 className="page-title">My Account</h1>
         <AccountDetails /> 
         <RecentOrders />
      </div>
    </div>
  );
}
