//// ===========================
//// src/components/Skalaton.jsx
//// ===========================
import "../style/cartSkaleton.css";

export default function Skalaton() {
  return (
    <div className="sk-wrapper">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="sk-card" key={index}>
          <div className="sk-image shimmer"></div>

          <div className="sk-content">
            <div className="sk-line sk-title shimmer"></div>
            <div className="sk-line sk-text shimmer"></div>
            <div className="sk-line sk-price shimmer"></div>

            <div className="sk-qty">
              <div className="sk-btn shimmer"></div>
              <div className="sk-count shimmer"></div>
              <div className="sk-btn shimmer"></div>
            </div>

            <div className="sk-remove shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
}