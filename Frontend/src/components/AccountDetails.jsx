import "../style/details.css";

export default function AccountDetails() {
  return (
    <div className="card">
      <h2>Account Details</h2>

      <div className="details-grid">
        <div>
          <label>Full Name</label>
          <p>Nike Admin</p>
        </div>

        <div>
          <label>Email</label>
          <p>admin@nike.com</p>
        </div>

        <div>
          <label>Account Type</label>
          <p>Admin</p>
        </div>
      </div>
    </div>
  );
}
