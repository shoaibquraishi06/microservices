import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import axios from "axios";
import "../style/productDetail.css";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("41");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://microservices-3-777q.onrender.com/api/products/${id}`
        );

        // console.log("PRODUCT DETAIL:", response.data);

        // Actual product response.data.data ke andar hai
        setProduct(response.data.data);
      } catch (error) {
        console.error("PRODUCT DETAIL ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-error">
        <h2>Product not found</h2>
      </div>
    );
  }

  const images = product.images || [];

  return (
    <div className="product-details-page">
      <div className="product-details-container">

        {/* LEFT SIDE */}
        <div className="product-gallery">

          {/* Main Image */}
          <div className="main-product-image">
            {images.length > 0 ? (
              <img
                src={images[selectedImage]?.url}
                alt={product.title}
              />
            ) : (
              <div className="no-image">No Image</div>
            )}
          </div>

          {/* Thumbnail Images */}
          {images.length > 0 && (
            <div className="product-thumbnails">
              {images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.url}
                    alt={`${product.title} ${index + 1}`}
                  />
                </button>
              ))}

              {images.length > 4 && (
                <div className="more-images">
                  +{images.length - 4} more
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="product-info">

          {/* Brand */}
          <div className="product-brand">
            <span className="brand-icon">N</span>
            <span>NIKE</span>

            <span className="product-code">
              #{product._id?.slice(-8)}
            </span>
          </div>

          {/* Title */}
          {/* <h1 className="product-title">
            {product.title}
          </h1> */}

          {/* Rating */}
          <div className="product-rating">
            <span className="stars">★★★★★</span>
            <span className="reviews">42 reviews</span>
          </div>

          {/* Price */}
          <div className="product-price">
            ₹{product.price?.amount || 0}
          </div>

          {/* Description */}
          {product.description && (
            <p className="product-description">
              {product.description}
            </p>
          )}

          {/* Color */}
          <div className="product-option">
            <div className="option-title">
              Color <span>White</span>
            </div>

            <div className="color-options">
              {images.slice(0, 3).map((image, index) => (
                <button
                  key={index}
                  className={`color-image ${
                    selectedImage === index ? "selected" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.url}
                    alt="Product color"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="product-option">
            <div className="size-header">
              <span>
                Size <small>EU Men</small>
              </span>

              <button>Size guide</button>
            </div>

            <div className="size-options">
              {["40.5", "41", "42", "43", "43.5", "44", "44.5", "45", "46"].map(
                (size) => (
                  <button
                    key={size}
                    className={`size-button ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Add To Cart */}
          <button className="add-cart-button">
            <span><GiShoppingCart /></span>
            Add to cart
          </button>

          {/* Delivery */}
          <div className="delivery-info">
            <span><CiDeliveryTruck /></span>
            <span>Free delivery on orders over $30.00</span>
          </div>

        </div>
      </div>
    </div>
  );
}