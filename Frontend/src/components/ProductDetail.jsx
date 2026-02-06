import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/productDetail.css";
import { useDispatch, useSelector } from "react-redux";
// import { fetchProductsAPI } from "../feature/productThunk";
// import { addToCart } from "../feature/cartSlice"
import axios from "axios";

export default function ProductDetails() {
   const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductsAPI(id));
  }, [id, dispatch]);

  if (loading || !product) return <p>Loading...</p>;

  return (
    <div className="product-details-container">
      <div className="image-section">
        <img src={product.images?.[0]?.url} alt={product.title} />
      </div>

      <div className="info-section">
        <h1>{product.title}</h1>
        <p className="desc">{product.description}</p>

        <h2>₹{product.price.amount}</h2>

        <button
          className="add-to-cart-btn"
          onClick={() => dispatch(addToCart(product._id))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
