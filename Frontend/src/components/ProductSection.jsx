import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSlidebar";
import "../style/ProductSection.css";

export default function ProductSection({ product = [] }) {
  const productList = Array.isArray(product) ? product : [];

  return (
    <section className="product-section">

      {/* ================= HEADER ================= */}
      <div className="product-section-header">
        <div className="product-header-content">
          <span className="product-eyebrow">THE COLLECTION</span>

          <h2 className="product-title-page">
            Browse All Your <span>Needs.</span>
          </h2>

          <p className="product-subtitle">
            Explore our latest collection of premium products,
            designed for everyday performance and style.
          </p>
        </div>

        {/* Category Navigation */}
        <nav className="product-categories">
          <button className="category-item active">
            <span>All</span>
          </button>

          <button className="category-item">
            <span>Latest</span>
          </button>

          <button className="category-item">
            <span>Men</span>
          </button>

          <button className="category-item">
            <span>Women</span>
          </button>
        </nav>
      </div>

      {/* ================= PRODUCTS TOOLBAR ================= */}
      <div className="product-toolbar">

        <div className="product-count">
          <span className="count-number">
            {productList.length}
          </span>

          <span className="count-label">
            {productList.length === 1 ? "Product" : "Products"}
          </span>
        </div>

        <div className="filter-wrapper">
          <FilterSidebar />
        </div>

      </div>

      {/* ================= PRODUCT GRID ================= */}
      {productList.length === 0 ? (
        <div className="empty-products">
          <div className="empty-products-inner">
            <span className="empty-number">00</span>

            <h3>No products available</h3>

            <p>
              We couldn't find any products at the moment.
              Please check again shortly.
            </p>
          </div>
        </div>
      ) : (
        <div className="product-grid">
          {productList.map((p, index) => (
            <div
              className="product-grid-item"
              key={p._id}
              style={{
                "--product-index": index,
              }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}

    </section>
  );
}