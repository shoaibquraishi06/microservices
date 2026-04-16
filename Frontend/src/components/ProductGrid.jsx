import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSlidebar";
import { useNavigate } from "react-router-dom";


export default function ProductGrid({ product = [] }) {
  if (!product.length) return <p>No products found.</p>;

  const navigate = useNavigate();

  return (
  
       <div className="product-container">
 
     <FilterSidebar />
    <div className="product-grid">
    

      {product.slice(0, 5).map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
      
      <button className="view-btn" onClick={() => navigate("/product")}>
       View All
      </button>

    </div>
  );
}
