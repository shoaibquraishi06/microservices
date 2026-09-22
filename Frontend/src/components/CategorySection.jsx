import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import "../style/CategorySection.css";

import menCategory from "../assets/nikeshoes3.avif";
import womenCategory from "../assets/nikeshoes4.avif";

const categories = [
  {
    id: 1,
    title: "Men",
    subtitle: "BUILT FOR MOVEMENT",
    description: "Explore the latest styles made for every move.",
    image: menCategory,
    link: "/products?category=men",
  },
  {
    id: 2,
    title: "Women",
    subtitle: "MADE TO MOVE",
    description: "Discover fresh silhouettes built for your everyday.",
    image: womenCategory,
    link: "/products?category=women",
  },
];

const Category = () => {
  return (
    <section className="category-section">

      {/* HEADER */}
      <div className="category-heading">
        <div className="category-heading-left">
          <span className="category-eyebrow">
            EXPLORE COLLECTION
          </span>

          <h2>
            SHOP BY
            <span> CATEGORY.</span>
          </h2>
        </div>

        <p className="category-heading-text">
          Discover the latest styles designed for movement,
          comfort and everyday expression.
        </p>
      </div>

      {/* CATEGORY GRID */}
      <div className="category-grid">

        {categories.map((category, index) => (
          <Link
            to={category.link}
            className={`category-card category-card-${index + 1}`}
            key={category.id}
          >

            {/* IMAGE */}
            <div className="category-image-wrapper">
              <img
                src={category.image}
                alt={`${category.title} collection`}
                className="category-image"
              />

              <div className="category-image-overlay"></div>
            </div>

            {/* TOP LABEL */}
            <div className="category-top">
              <span>0{index + 1}</span>

              <span className="category-arrow">
                <FiArrowUpRight />
              </span>
            </div>

            {/* CONTENT */}
            <div className="category-content">

              <span className="category-subtitle">
                {category.subtitle}
              </span>

              <h3>{category.title}</h3>

              <p>{category.description}</p>

              <div className="category-button">
                <span>Explore Collection</span>

                <span className="category-button-arrow">
                  <FiArrowUpRight />
                </span>
              </div>

            </div>

          </Link>
        ))}

      </div>

      {/* BOTTOM LINE */}
      <div className="category-footer">
        <span>NIKE STORE</span>

        <div className="category-footer-line"></div>

        <span>01 — 02</span>
      </div>

    </section>
  );
};

export default Category;