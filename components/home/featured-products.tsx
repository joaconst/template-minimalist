"use client";

import { Container } from "@/components/ui/container";
import { ProductGrid } from "@/components/products/product-grid";
import { Product } from "@/lib/types";
import { useCart } from "@/components/cart-context";

interface FeaturedProductsProps {
  title?: string;
  description?: string;
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export function FeaturedProducts({
  title = "Productos destacados",
  description = "XXXXXXXXXXXXXX",
  products,
  onAddToCart,
}: FeaturedProductsProps) {
  const { addToCart } = useCart();
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-4 text-muted-foreground">{description}</p>
        </div>
        <ProductGrid products={products} onAddToCart={handleAddToCart} />
      </Container>
    </section>
  );
}
