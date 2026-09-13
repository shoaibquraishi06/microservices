import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSlidebar";
import { useNavigate } from "react-router-dom";


export default function ProductGrid({ product = [] }) {
  if (!product.length) return <p>No products found..</p>;

  const navigate = useNavigate();

  return (
  
       <div className="product-container">
       
       <h2 className="product-title-page">Browse All Your Needs.</h2>
      
         <div className="category">
           <p>All</p>
           <p>Latest</p>
           <p>Men</p>
           <p>Women</p>
         </div>
          
     <FilterSidebar />
    <div className="product-grid">
    

      {product.slice(0, 5).map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
      
      <button className="view-btn" onClick={() => navigate("/products")}>
       View All
      </button>

    </div>
  );
}
