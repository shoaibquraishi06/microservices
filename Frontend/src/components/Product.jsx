import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../feature/productThunk";
import ProductSection from "../components/ProductSection";
import Skaleton from "../components/ProductSkaleton";

export default function Products() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

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