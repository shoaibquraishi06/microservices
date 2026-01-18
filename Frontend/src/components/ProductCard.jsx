
import { useDispatch } from "react-redux";
import { addToCart } from "../feature/cartThunk";
import "../style/product.css";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  if (!product) return null;

  const handleAddToCart = () => {
     console.log("ADD TO CART:", product._id, product.title, product.price);
  dispatch(addToCart({ productId: product._id }));
  };

  return (
    <div className="product-card">
      <div className="product-img">
        <img
          src={product.images?.[0]?.url}
          alt={product.title}
        />
      </div>

      <div className="product-details">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p className="price">₹{product.price.amount}</p>

        <button className="addToCart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
