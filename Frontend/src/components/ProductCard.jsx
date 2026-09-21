import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { addToCart } from "../feature/cartThunk";

import { FiShoppingBag } from "react-icons/fi";
import { BiCartAlt } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import "../style/product.css";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);

  if (!product) return null;

  const handleAddToCart = (e) => {
    e.stopPropagation();

    dispatch(
      addToCart({
        productId: product._id,
      })
    );
  };

  const handleLikeToggle = (e) => {
    e.stopPropagation();
    setLiked((prev) => !prev);
  };

  const ProductDetailsHandler = () => {
    navigate(`/product/${product._id}`);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      className="product-card"
      onClick={ProductDetailsHandler}
    >
      <div className="whistlist-products">
        <button
          type="button"
          className={`wishlist-btn ${liked ? "liked" : ""}`}
          onClick={handleLikeToggle}
          aria-label={liked ? "Unlike" : "Like"}
        >
          {liked ? (
            <AiFillHeart />
          ) : (
            <AiOutlineHeart />
          )}
        </button>
      </div>

      <div className="logo">
        {/* Logo intentionally unchanged */}
      </div>

      <div className="product-img">
        <img
          src={product.images?.[0]?.url}
          alt={product.title}
        />
      </div>

      <div className="product-details">
        <h3>{product.title}</h3>

        <p className="price">
          ₹{product.price?.amount}
        </p>
      </div>

      <p className="product-description">
        {product.description}
      </p>

      <div className="btn-section">
        <button
          className="addToCart"
          type="button"
          onClick={handleAddToCart}
        >
          <span>
            <FiShoppingBag />
          </span>

          <span>Add to Cart</span>
        </button>

        <button
          className="buyNow"
          type="button"
          onClick={handleBuyNow}
        >
          <span>
            <BiCartAlt />
          </span>

          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
}