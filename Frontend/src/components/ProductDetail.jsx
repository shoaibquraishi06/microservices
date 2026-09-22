import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi2";
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
        <div className="product-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p>Loading product</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-error">
        <div className="error-inner">
          <span>404</span>
          <h2>Product not found</h2>
          <p>
            The product you're looking for may no longer be available.
          </p>
        </div>
      </div>
    );
  }

  const images = product.images || [];

  return (
    <main className="product-details-page">

      <div className="product-details-container">

        {/* =========================================
            LEFT — PRODUCT VISUAL
        ========================================= */}
        <section className="product-gallery">

          <div className="gallery-top">
            <span className="gallery-label">
              PRODUCT / {String(product._id).slice(-4)}
            </span>

            <span className="gallery-count">
              {String(selectedImage + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
          </div>

          <div className="main-product-image">

            {images.length > 0 ? (
              <img
                key={selectedImage}
                src={images[selectedImage]?.url}
                alt={product.title}
              />
            ) : (
              <div className="no-image">
                No Image Available
              </div>
            )}

            <div className="image-badge">
              <span>NIKE</span>
              <FiArrowUpRight />
            </div>
          </div>

          {/* THUMBNAILS */}
          {images.length > 0 && (
            <div className="product-thumbnails">

              {images.slice(0, 5).map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View product image ${index + 1}`}
                >
                  <img
                    src={image.url}
                    alt={`${product.title} ${index + 1}`}
                  />

                  {selectedImage === index && (
                    <span className="thumbnail-line"></span>
                  )}
                </button>
              ))}

              {images.length > 5 && (
                <div className="more-images">
                  +{images.length - 5}
                </div>
              )}

            </div>
          )}

        </section>

        {/* =========================================
            RIGHT — PRODUCT INFORMATION
        ========================================= */}
        <section className="product-info">

          <div className="product-info-inner">

            {/* TOP META */}
            <div className="product-meta">

              <div className="product-brand">
                <span className="brand-mark">N</span>

                <span className="brand-name">
                  NIKE
                </span>

                <span className="product-code">
                  #{product._id?.slice(-8)}
                </span>
              </div>

              <span className="product-status">
                IN STOCK
              </span>

            </div>

            {/* TITLE */}
            <div className="product-heading">

              <span className="product-eyebrow">
                NEW ARRIVAL
              </span>

              <h1>
                {product.title || "Nike Product"}
              </h1>

            </div>

            {/* RATING */}
            <div className="product-rating">

              <div className="stars">
                ★★★★★
              </div>

              <span>
                4.8
              </span>

              <span className="rating-divider">
                /
              </span>

              <span className="reviews">
                42 Reviews
              </span>

            </div>

            {/* PRICE */}
            <div className="price-row">

              <span className="product-price">
                ₹{product.price?.amount || 0}
              </span>

              <span className="price-note">
                Inclusive of all taxes
              </span>

            </div>

            {/* DESCRIPTION */}
            {product.description && (
              <p className="product-description">
                {product.description}
              </p>
            )}

            <div className="product-divider"></div>

            {/* COLOR */}
            <div className="product-option">

              <div className="option-header">
                <div>
                  <span className="option-label">
                    COLOR
                  </span>

                  <span className="option-value">
                    White
                  </span>
                </div>

                <span className="option-number">
                  01
                </span>
              </div>

              <div className="color-options">

                {images.slice(0, 3).map((image, index) => (
                  <button
                    key={index}
                    className={`color-image ${
                      selectedImage === index
                        ? "selected"
                        : ""
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

            {/* SIZE */}
            <div className="product-option size-option">

              <div className="size-header">

                <div>
                  <span className="option-label">
                    SELECT SIZE
                  </span>

                  <span className="option-value">
                    EU Men
                  </span>
                </div>

                <button className="size-guide">
                  Size Guide
                  <FiArrowUpRight />
                </button>

              </div>

              <div className="size-options">

                {[
                  "40.5",
                  "41",
                  "42",
                  "43",
                  "43.5",
                  "44",
                  "44.5",
                  "45",
                  "46",
                ].map((size) => (
                  <button
                    key={size}
                    className={`size-button ${
                      selectedSize === size
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}

              </div>

            </div>

            {/* CTA */}
            <button className="add-cart-button">

              <span className="cart-icon">
                <GiShoppingCart />
              </span>

              <span className="cart-text">
                Add to Bag
              </span>

              <span className="cart-arrow">
                <FiArrowUpRight />
              </span>

            </button>

            {/* DELIVERY */}
            <div className="product-benefits">

              <div className="benefit-item">

                <div className="benefit-icon">
                  <CiDeliveryTruck />
                </div>

                <div>
                  <strong>
                    Free Delivery
                  </strong>

                  <span>
                    On orders over ₹2,500
                  </span>
                </div>

              </div>

              <div className="benefit-item">

                <div className="benefit-icon">
                  <HiOutlineShieldCheck />
                </div>

                <div>
                  <strong>
                    Secure Payment
                  </strong>

                  <span>
                    100% secure checkout
                  </span>
                </div>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}