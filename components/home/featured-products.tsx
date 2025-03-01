"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { ProductGrid } from "@/components/products/product-grid";
import { Product } from "@/lib/types";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";

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
}: FeaturedProductsProps) {
  const { addToCart } = useCart();
  const [selectedSexo, setSelectedSexo] = useState<string>('all');
  
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  // Normaliza los valores para ignorar mayúsculas/minúsculas
  const filteredProducts = selectedSexo === 'all' 
    ? products 
    : products.filter(p => 
        p.sexo?.toLowerCase() === selectedSexo.toLowerCase()
      );

  return (
    <section className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-4 text-muted-foreground">{description}</p>
          
          {/* Selector de sexo */}
          <div className="mt-6 flex justify-center gap-2">
            <Button
              variant={selectedSexo === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedSexo('all')}
            >
              Todos
            </Button>
            <Button
              variant={selectedSexo === 'masculino' ? 'default' : 'outline'}
              onClick={() => setSelectedSexo('masculino')}
            >
              Masculino
            </Button>
            <Button
              variant={selectedSexo === 'femenino' ? 'default' : 'outline'}
              onClick={() => setSelectedSexo('femenino')}
            >
              Femenino
            </Button>
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
        ) : (
          <p className="text-center text-muted-foreground">
            No hay productos disponibles en esta categoría.
          </p>
        )}
      </Container>
    </section>
  );
}