import ProductCard from "./ProductCard";

export default function ProductGrid({ product = [] }) {
  if (!product.length) return <p>No products found.</p>;

  return (
    <div className="product-grid">
      {product.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
