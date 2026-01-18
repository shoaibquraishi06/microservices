import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../feature/productThunk";
import ProductGrid from "../components/ProductGrid";
import FilterSidebar from "../components/FilterSlidebar";

export default function Products() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
  

  <ProductGrid product={items} />
  )
}
