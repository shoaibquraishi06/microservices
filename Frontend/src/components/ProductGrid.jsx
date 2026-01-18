import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSlidebar";

export default function ProductGrid({ product = [] }) {
  if (!product.length) return <p>No products found.</p>;

  return (
  
       <div className="product-container">
 
     <FilterSidebar />
    <div className="product-grid">
    

      {product.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
    </div>
  );
}
