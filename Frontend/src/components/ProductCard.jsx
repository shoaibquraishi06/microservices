
import { useDispatch } from "react-redux";
import  {useNavigate } from "react-router-dom";
import { useState } from "react";
import { addToCart } from "../feature/cartThunk";
import Logo from "../assets/logo.jpg";
import { FiShoppingBag } from "react-icons/fi";
import { BiCartAlt } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; 

import "../style/product.css";
// import "../style/productCard.css"

export default function ProductCard({ product }) {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const [ liked, setLiked ] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    //  console.log("ADD TO CART:", product._id, product.title, product.price, product.images);
  dispatch(addToCart({ productId: product._id }));
  };
   // Toggle function
 
   const handleLikeToggle = () => {
    setLiked(!liked);
  };

  const ProductDetailsHandler = () => {
   
    navigate(`/product/${product._id}`);

  }


   

  return (
    // <ProductCard product={product} />;
    <div className="product-card" onClick={ProductDetailsHandler}
 >
         
   <div className="whistlist-products">
   <button 
      onClick={handleLikeToggle}
      style={{
        position: 'absolute',
        top: '20%',
        right: '5%',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.5rem', // Adjust size of the icon
       
      }}
      aria-label={liked ? "Unlike" : "Like"}
    >
      {liked ? (
        <AiFillHeart style={{ color: '#c70d0d' }} /> // Filled red heart
      ) : (
        <AiOutlineHeart style={{ color: '#4B5563' }} /> // Outlined gray heart
      )}
    </button>
    

    
      
     </div>
     
      <div className="logo">

        {/* <img src={Logo} alt="Nike" /> */}
      </div>
      <div className="product-img">
        <img
          src={product.images?.[0]?.url}
          alt={product.title}
        />
      </div>

      <div className="product-details">
        <h3>{product.title}</h3>
         {/* <p>{product.description}</p> */}
        <p className="price">₹{product.price.amount}</p>
 </div>

 <p>{product.description}</p>
      
      <div className="btn-section">
      
        <button className="addToCart"   onClick={(e) => {
    e.stopPropagation();
    handleAddToCart();
  }}>
        <span><FiShoppingBag /></span> <span> Add to Cart</span>
        </button>
        
       <button className="buyNow"  onClick={(e) => {
    e.stopPropagation();
    handleBuyNow();
  }}>
        <span><BiCartAlt /></span> <span> Buy Now</span>

       </button>
        
        </div>
     
    </div>
  );
}
