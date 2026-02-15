import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSlidebar";
import { useNavigate } from "react-router-dom";


export default function ProductGrid({ product = [] }) {
  if (!product.length) return <p>No products found.</p>;

  const navigate = useNavigate();

  return (
  
       <div className="product-container"
        // onClick={() =>console.log("CLICKED PRODUCT:", product)}
       >
 
     <FilterSidebar />
    <div className="product-grid">
    

      {product.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
    </div>
  );
}
