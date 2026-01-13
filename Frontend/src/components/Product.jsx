import { useEffect, useState } from "react";
import { fetchProducts } from "../api/product.api";
import ProductGrid from "../components/ProductGrid";

export default function Products() {
  const [products, setProducts] = useState([]); // ✅ array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return <ProductGrid product={products} />;
}
