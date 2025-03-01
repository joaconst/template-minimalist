import { ProductCard } from "@/components/products/product-card";
import { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  isLoading?: boolean;
}

export function ProductGrid({ products = [], onAddToCart, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-64 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center py-12 space-y-4">
        <p className="text-muted-foreground text-lg">No se encontraron productos</p>
        <p className="text-sm text-muted-foreground/80">
          Intenta ajustando los filtros de búsqueda
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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