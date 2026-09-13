import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import navigate from "react-router-dom";
import { fetchProducts } from "../feature/productThunk";
import ProductSection from "../components/ProductSection";
import Skaleton from "../components/ProductSkaleton";
import ProductDetails from "./ProductDetail";

export default function Products() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.products);

  // const ProductDetails  = (e) => {
    
  //    navigate("/product/:id");
   
  // };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <Skaleton />;
  if (error) return <p className="error" >Error: {error}</p>;

  return (
    <div>
      <ProductSection product={Array.isArray(items) ? items : []} />
    </div>
  );
}