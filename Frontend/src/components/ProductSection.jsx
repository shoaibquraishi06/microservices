import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSlidebar";

export default function ProductSection({ product = [] }) {
  // Safe array check
  const productList = Array.isArray(product) ? product : [];

  return (
    <section className="product-container">
      {/* <h2 className="product-heading">Our Products</h2> */}
             <h2 className="product-title">Browse All Your Needs.</h2>
      
         <div className="category">
           <p>All</p>
           <p>Latest</p>
           <p>Men</p>
           <p>Women</p>
         </div>
      <FilterSidebar />

      {productList.length === 0 ? (
        <div className="empty-products">
          <p>No products available.</p>
        </div>
      ) : (
        <div className="product-grid">
          {/* Products page pe SARE products */}
          {productList.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}