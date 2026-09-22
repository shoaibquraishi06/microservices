import { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";

import "../style/ProductGrid.css";

export default function ProductGrid({ product = [] }) {
  const navigate = useNavigate();

  const sliderRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const productList = Array.isArray(product)
    ? product.slice(0, 10)
    : [];

  /* =========================================
     SCROLL SLIDER
  ========================================== */

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;

    const card = slider.querySelector(
      ".landing-product-carousel-card"
    );

    if (!card) return;

    const cardWidth = card.offsetWidth;

    const gap = 22;

    slider.scrollBy({
      left:
        direction === "next"
          ? cardWidth + gap
          : -(cardWidth + gap),

      behavior: "smooth",
    });
  };

  /* =========================================
     ACTIVE CARD DETECTION
  ========================================== */

  const handleScroll = () => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;

    const card = slider.querySelector(
      ".landing-product-carousel-card"
    );

    if (!card) return;

    const cardWidth =
      card.offsetWidth + 22;

    const index = Math.round(
      slider.scrollLeft / cardWidth
    );

    setActiveIndex(index);
  };

  /* =========================================
     EMPTY STATE
  ========================================== */

  if (!productList.length) {
    return (
      <section className="landing-product-empty-state">
        <p>No products found.</p>
      </section>
    );
  }

  return (
    <section className="landing-product-section">

      {/* ======================================
          HEADER
      ======================================= */}

      <div className="landing-product-header">

        <div className="landing-product-heading-area">

          <span className="landing-product-eyebrow">
            NIKE / SELECTED COLLECTION
          </span>

          <h2 className="landing-product-heading">
            Browse
            <span>your essentials.</span>
          </h2>

        </div>


        <div className="landing-product-header-right">

          <p className="landing-product-description">
            Discover our latest selection of
            performance, lifestyle and everyday
            essentials.
          </p>

          <button
            type="button"
            className="landing-product-view-all-top"
            onClick={() => navigate("/products")}
          >
            <span>Explore collection</span>

            <FiArrowUpRight />
          </button>

        </div>

      </div>


      {/* ======================================
          CAROUSEL HEADER
      ======================================= */}

      <div className="landing-product-carousel-top">

        <div className="landing-product-counter">

          <span className="landing-product-counter-active">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>

          <span className="landing-product-counter-divider" />

          <span>
            {String(productList.length).padStart(2, "0")}
          </span>

        </div>


        <div className="landing-product-navigation">

          <button
            type="button"
            className="landing-product-nav-btn"
            onClick={() => scrollSlider("prev")}
            aria-label="Previous products"
          >
            <FiArrowLeft />
          </button>

          <button
            type="button"
            className="landing-product-nav-btn"
            onClick={() => scrollSlider("next")}
            aria-label="Next products"
          >
            <FiArrowRight />
          </button>

        </div>

      </div>


      {/* ======================================
          HORIZONTAL CAROUSEL
      ======================================= */}

      <div
        className="landing-product-carousel"
        ref={sliderRef}
        onScroll={handleScroll}
      >

        {productList.map((item, index) => (

          <div
            className="landing-product-carousel-card"
            key={item._id}
          >

            <div className="landing-product-index">
              {String(index + 1).padStart(2, "0")}
            </div>

            <ProductCard
              product={item}
              variant="showcase"
            />

          </div>

        ))}

      </div>


      {/* ======================================
          BOTTOM
      ======================================= */}

      <div className="landing-product-bottom">

        <div className="landing-product-progress">

          <div className="landing-product-progress-track">

            <span
              style={{
                width: `${
                  ((activeIndex + 1) /
                    productList.length) *
                  100
                }%`,
              }}
            />

          </div>

        </div>


        <button
          type="button"
          className="landing-product-view-all"
          onClick={() => navigate("/products")}
        >
          <span>View All Products</span>

          <span className="landing-product-view-all-icon">
            <FiArrowUpRight />
          </span>
        </button>

      </div>

    </section>
  );
}