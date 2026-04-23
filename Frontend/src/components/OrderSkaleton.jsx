// src/components/Skalaton.jsx

import "../style/orderSkaleton.css";

export default function Skalaton() {
  return (
    <section className="orders-sk">
      {/* Back link */}
      <div className="sk-back shimmer"></div>

      {/* Title */}
      <div className="sk-heading shimmer"></div>

      {/* Order cards */}
      {Array.from({ length: 2 }).map((_, index) => (
        <div className="order-sk-card" key={index}>
          {/* Header */}
          <div className="order-sk-top">
            <div className="left-meta">
              <div className="sk-line sk-id shimmer"></div>
              <div className="sk-line sk-date shimmer"></div>
            </div>

            <div className="right-meta">
              <div className="sk-status shimmer"></div>
              <div className="sk-price shimmer"></div>
            </div>
          </div>

          {/* Items */}
          <div className="items-wrap">
            {Array.from({ length: index === 0 ? 2 : 4 }).map(
              (_, i) => (
                <div className="order-item-sk" key={i}>
                  <div className="sk-thumb shimmer"></div>

                  <div className="item-content">
                    <div className="sk-line sk-product shimmer"></div>
                    <div className="sk-line sk-size shimmer"></div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </section>
  );
}