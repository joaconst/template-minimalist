import { ProductCard } from "@/components/products/product-card";
import { Product } from "@/lib/types";

interface ProductGridProps {
  products?: Product[];
  onAddToCart?: (product: Product) => void;
}

export function ProductGrid({ products = [], onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return <p className="text-center text-muted-foreground">No hay productos disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
