import "../style/details.css";
import { useSelector } from "react-redux";
import NotUser from "../components/NotAcountUser";
import ProfilePhoto from "../assets/newLogo.png"

export default function AccountDetails() {

    const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <NotUser />;
  }

  return (
    <div className="card">
         <div className="user-profile">
         <img src={ProfilePhoto} alt="Profile Photo" />
       </div>

     
      <h2>Personal information</h2>

     
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
          <label>Phone Number</label>
          <p>+91 1234567890</p>
        </div>
         <div>
          <label>Account Type</label>
          <p>{user.role}</p>
          
        </div>

        </div> 

       <hr className="edit-hr" />

      <div className="edit-btn">

      <button className="edit-button">Save Changes</button>
      
      </div>
    </div>
  );
}
