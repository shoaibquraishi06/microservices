import AccountSidebar from "../components/AccountSidebar";
import RecentOrders from "../components/RecentOrders";
import AccountDetails from "../components/AccountDetails";
import "../style/account.css";

export default function Account() {
  return (
    <div className="account-page">
      <AccountSidebar />

      <div className="account-content">
        <h1 className="page-title">My Account</h1>

        <RecentOrders />
        <AccountDetails />
      </div>
    </div>
  );
}
