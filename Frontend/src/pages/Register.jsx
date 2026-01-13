import { useState } from "react";
import logo from '../assets/logo.jpg'
import apple from '../assets/apple.png'
import google from '../assets/google.png'
import { Link, useNavigate } from "react-router-dom";
import "../style/register.css";
import axios from 'axios'

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [role, setRole] = useState(""); // 'user' or 'seller'

  // No longer needed
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  

    // function handleSubmit(e) {
    //     const { name, value } = e.target;
    //     setForm({ ...form, [name]: value });
        
    // }

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username && !email && !password) {
     
     
      setError("All fields required!");
      
      return;
    }
    if (!username) {
      
      setError("username required!");
      return;
    }
    
    // if (!lastName) {
    //   setError("Last name required!");
    //   return;
    // }
    if (!email) {
      setError("email required!");
      return;
    }
    if (!password) {
      setError("password required!");
      return;
    }
    setSubmitting(true);
   
   
    try {
       const res = await axios.post('http://localhost:3000/api/auth/register', {
        email,
        username,
        password
      }, {
        withCredentials: true
      });

     console.log(res);
      setError("");
      alert("Account created!");
      navigate("/");
    } catch (err) { 
      console.error(err);
     
      
      setError("Registration failed! " + (err.response?.data?.message || ""));
    } finally {
      setSubmitting(false);
    }
  };

  return (




    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <div className="logo">
            <img src={logo} alt="brandlogo" />
        </div>
        <h2>Create Account</h2>
        <p>Welcome Back! Create Account and Enjoy Our Services</p>

        {error && <div className="error" style={{color: 'black', marginBottom: '10px'}}>{error}</div>}

        
          
         
       
      
          <>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
             
              
            /> 
            {/* <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            /> */}
          </>
        

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

             <div> <p style={{ fontFamily:'regular-text', width:'fit-content', color:'#2e2d2dff'}} >You are buyer or Seller</p>  </div> 

        <div style={{  display:'flex', width:'fit-content', fontFamily:'regular-text'}}>
           <span className="check-user" >User</span> 
          <label>
            <input  style={{border:"none"}}
              type="radio"
              name="role"
              value="uer"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />
                
          </label>
           <span className="check-user" >Seller</span> 
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              name="role"
              value="seller"
              checked={role === "seller"}
              onChange={() => setRole("seller")}
            />

           {/* <input
  type="radio"
  name="role"
  value="user"
  checked={role === "user"}
  onChange={(e) => setRole(e.target.value)}
/> */}


           
          </label>
        </div>

        {/* Removed old checkbox */}
  

        <button type="submit" disabled={submitting}>Register</button>

        <p>
          Already have an account? <Link to="/"><span> Login </span> </Link>
        </p>

         <div className="cloud-login">
                 <div className="google-login">

                  <img src={google} alt="google" />
                  <p>Sigh up with Google</p> 

             </div>
             <div className="apple-login">
              
                  <img src={apple} alt="apple" />
                  <p>Sigh up with Apple</p> 

                </div>
              </div>
      </form>
    </div>
  );
}