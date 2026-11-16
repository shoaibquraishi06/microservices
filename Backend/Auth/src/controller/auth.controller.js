const  userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redis = require('../db/redis');
// const { publishToQueue } = require("../broker/broker")




async function registerUser(req, res) {

  const { username, email, password , role} = req.body;
 

  const isUserAlreadyExists = await userModel.findOne({
    $or: [
        {username},
        {email}
    ]
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    username,
    email,
    password: hashedPassword,
    role
  });


  
//  await Promise.all([
//             publishToQueue('AUTH_NOTIFICATION.USER_CREATED', {
//                 id: newUser._id,
//                 username: newUser.username,
//                 email: newUser.email,
//                 fullName: newUser.fullName,
//             }),
//             publishToQueue("AUTH_SELLER_DASHBOARD.USER_CREATED", newUser)
//         ]);


  await newUser.save();

    const token = jwt.sign({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
     }, process.env.JWT_SECRET, {expiresIn:'1d'})

  res.cookie("token", token,{
    httpOnly:true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  })


  res.status(201).json({
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    role: newUser.role,
    message: 'user registered successfully'
  });


}


async function loginUser(req, res) {
  try {
    const {
      identifier,
      username,
      email,
      password,
      role: selectedRole
    } = req.body;

    // 1. Get email or username
    const idValue = identifier || username || email;

    if (!idValue || !password || !selectedRole) {
      return res.status(400).json({
        success: false,
        message: "Email, password and role are required"
      });
    }

    // 2. Validate selected role
    if (!["user", "seller"].includes(selectedRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account role"
      });
    }
   

    // 3. Find user in database
    const user = await userModel.findOne({
      $or: [
        { email: idValue },
        { username: idValue }
      ]
    }).select("+password");
    
//  console.log("REQUEST BODY:", req.body);
// console.log("SELECTED ROLE:", selectedRole);
// console.log("DATABASE ROLE:", user.role);
// console.log(
//   "ROLE MATCH:",
//   user.role === selectedRole
// );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // 4. Verify password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // 5. IMPORTANT: Compare selected role with DB role
    if (user.role !== selectedRole) {
      return res.status(403).json({
        success: false,
        message: `This account is registered as ${user.role}. Please select ${user.role} to login.`
      });
    }

   console.log("DATABASE ROLE:", user.role);

    // 6. Generate JWT using DATABASE role
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
       httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000
    });

    // 7. Send response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
  // console.log("🔥 NEW LOGIN FUNCTION HIT");

  // return res.status(418).json({
  //   success: false,
  //   message: "NEW LOGIN FUNCTION IS WORKING"
  // });


}



async function getCurrentUser(req, res) {
 return res.status(200).json({
   message: 'Current user fetched successfully',
  user: req.user
  
});
}


async function logoutUser(req, res) {

   try {
    res.cookie("token", "", {
    httpOnly: true,
  secure: false,
    sameSite: "lax",
  sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
  
}

async function getUserAddress(req, res) {

  const id = req.user.id;

  const user = await userModel.findById(id).select('address');

  if(!user) {
    return res.status(404).json({ message: 'User not found' });
  }



  return res.status(200).json({
    message:"User address fetched successfully",
    addresses: user.addresses

  });

}



async function addUserAddress(req, res) {

   const id = req.user.id;

   const { street, city, state, zip, country, isDefault } = req.body;

   const newAddress = {
       street,
       city,
       state,
       zip,
       country,
       isDefault
   };

   await userModel.findByIdAndUpdate(id, {
       $push: { addresses: newAddress }
   });

 if(!newAddress){
  return res.status(400).json({ message: 'Address data is required' });
 }

   return res.status(201).json({
       message: 'Address added successfully',
       address: newAddress
   });
}


async function deleteUserAddress(req, res) {

  
  const id = req.user.id;

   const { addressId } = req.params;


   const isAddressExists = await userModel.findOne({_id: id, 'addresses._id': addressId });

     if(!isAddressExists){
       return res.status(404).json({ message: 'Address not found' });
     }

  

    const user = await userModel.findById({ _id: id },{

      $pull:{
        addresses:{ _id: addressId }

      }

    },{ new: true });



    if(!user) {
      return res.status(404).json({ message: 'User not found' });
    }

  const addressExites = user.addresses.some(address => address._id.toString() === addressId);

  if(!addressExites){

     return res.status(404).json({ message: 'Address not found' });

}


    return res.status(200).json({
      message: 'Address deleted successfully',
      addresses: user.addresses
    });

}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  getUserAddress,
  addUserAddress,
  deleteUserAddress
}