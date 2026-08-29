// src/components/Skalaton.jsx

import "../style/productSkaleton.css";

export default function Skalaton() {
  return (
    <section className="ps-skeleton">
      {/* Filter Button */}
      <div className="sk-filter shimmer"></div>

      {/* Product Grid */}
      <div className="sk-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="sk-card" key={index}>
            <div className="sk-image shimmer"></div>

            <div className="sk-row">
              {/* <div className="sk-title shimmer"></div> */}
              {/* <div className="sk-price shimmer"></div> */}
            </div>

            <div className="sk-subtitle shimmer"></div>

          
          </div>
        ))}
      </div>

      {/* View All */}
      <div className="sk-viewall shimmer"></div>
    </section>
  );
}