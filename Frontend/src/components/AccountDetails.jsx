import "../style/details.css";
import { useSelector } from "react-redux";

export default function AccountDetails() {

    const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <p>Please login first</p>;
  }

  return (
    <div className="card">
      <h2>Account Details</h2>

      <div className="details-grid">
        <div>
          <label>Full Name</label>
          <p>{user.username}</p>
        </div>

        <div>
          <label>Email</label>
          <p>{user.email}</p>
        </div>

        <div>
          <label>Account Type</label>
          <p>{user.role}</p>
        </div>
      </div>
    </div>
  );
}
