import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { addToCart } from "../feature/cartThunk";

import { FiShoppingBag, FiArrowUpRight } from "react-icons/fi";
import { BiCartAlt } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import "../style/productCard.css";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);

  if (!product) return null;

  /* ================= ADD TO CART ================= */

  const handleAddToCart = (e) => {
    e.stopPropagation();

    dispatch(
      addToCart({
        productId: product._id,
      })
    );
  };

  /* ================= WISHLIST ================= */

  const handleLikeToggle = (e) => {
    e.stopPropagation();

    setLiked((prev) => !prev);
  };

  /* ================= PRODUCT DETAILS ================= */

  const ProductDetailsHandler = () => {
    navigate(`/product/${product._id}`);
  };

  /* ================= BUY NOW ================= */

  const handleBuyNow = (e) => {
    e.stopPropagation();

    navigate(`/product/${product._id}`);
  };

  return (
    <article
      className="product-card"
      onClick={ProductDetailsHandler}
    >
      {/* =========================================
          IMAGE AREA
      ========================================== */}

      <div className="product-image-wrapper">

        {/* Wishlist */}

        <button
          type="button"
          className={`wishlist-btn ${liked ? "liked" : ""}`}
          onClick={handleLikeToggle}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          {liked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>

        {/* Small image index */}

        <span className="product-image-number">
          01
        </span>

        {/* Product Image */}

        <div className="product-img">
          {product.images?.[0]?.url ? (
            <img
              src={product.images[0].url}
              alt={product.title || "Product"}
            />
          ) : (
            <div className="product-image-placeholder">
              No Image
            </div>
          )}
        </div>

        {/* Image hover action */}

        <div className="image-view-action">
          <span>View Product</span>

          <span className="view-arrow">
            <FiArrowUpRight />
          </span>
        </div>
      </div>

      {/* =========================================
          PRODUCT INFORMATION
      ========================================== */}

      <div className="product-content">

        <div className="product-title-row">

          <h3 className="product-name">
            {product.title}
          </h3>

          <span className="product-price">
            ₹{product.price?.amount ?? 0}
          </span>

        </div>

        {product.description && (
          <p className="product-description">
            {product.description}
          </p>
        )}

        {/* =====================================
            ACTION BUTTONS
        ====================================== */}

        <div className="btn-section">

          <button
            className="addToCart"
            type="button"
            onClick={handleAddToCart}
          >
            <FiShoppingBag />

            <span>Add to Cart</span>
          </button>

          <button
            className="buyNow"
            type="button"
            onClick={handleBuyNow}
          >
            <span>Buy Now</span>

            <FiArrowUpRight />
          </button>

        </div>

      </div>
    </article>
  );
}