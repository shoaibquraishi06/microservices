
import { useDispatch } from "react-redux";
import { addToCart } from "../feature/cartThunk";
import Logo from "../assets/logo.jpg";
import { FiShoppingBag } from "react-icons/fi";
import "../style/product.css";
// import "../style/productCard.css"

export default function ProductCard({ product }) {
  const dispatch = useDispatch(); 

  if (!product) return null;

  const handleAddToCart = () => {
    //  console.log("ADD TO CART:", product._id, product.title, product.price, product.images);
  dispatch(addToCart({ productId: product._id }));
  };

  return (
    // <ProductCard product={product} />;
    <div className="product-card">
      <div className="logo">
        <img src={Logo} alt="Nike" />
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
        <button className="addToCart" onClick={handleAddToCart}>
        <span><FiShoppingBag /></span> <span> Add to Cart</span>
        </button>
     
    </div>
  );
}
