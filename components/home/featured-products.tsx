"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/container";
import { ProductGrid } from "@/components/products/product-grid";
import { Product, CartItem } from "@/lib/types";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";

interface FeaturedProductsProps {
  title?: string;
  description?: string;
  products: Product[];
}

export function FeaturedProducts({
  title = "Productos destacados",
  description = "Nuestras selecciones especiales",
  products,
}: FeaturedProductsProps) {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Función para traducir nombres de categoría
  const translateCategory = (rawCategory: string) => {
    const lowerCategory = rawCategory.toLowerCase();
    switch(lowerCategory) {
      case 'femenino': return 'Gafas de sol para mujer';
      case 'masculino': return 'Gafas de sol para hombre';
      case 'unisex': return 'Gafas unisex';
      default: return rawCategory;
    }
  };

  // Extraer categorías únicas con nombres traducidos
  const categories = useMemo(() => {
    const categoryMap = new Map<string, string>();
    products.forEach(product => {
      const rawCategory = product.categoria?.trim();
      if (rawCategory) {
        const slug = rawCategory.toLowerCase().replace(/\s+/g, '-');
        const displayName = translateCategory(rawCategory);
        if (!categoryMap.has(slug)) {
          categoryMap.set(slug, displayName);
        }
      }
    });
    return Array.from(categoryMap.entries()).map(([slug, name]) => ({
      slug,
      name,
    }));
  }, [products]);
  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1
    };
    addToCart(cartItem);
  };

  // Filtrado correcto usando slugs
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => {
        const productSlug = p.categoria?.toLowerCase().replace(/\s+/g, '-');
        return productSlug === selectedCategory.toLowerCase();
      });

  return (
    <section id="featured" className="py-16">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-4 text-muted-foreground">{description}</p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="transition-all duration-300"
            >
              Todas
            </Button>
            {categories.map(category => (
              <Button
                key={category.slug}
                variant={selectedCategory === category.slug ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.slug)}
                className="transition-all duration-300"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <ProductGrid 
            products={filteredProducts} 
            onAddToCart={handleAddToCart}
          />
        ) : (
          <p className="text-center text-muted-foreground">
            No hay productos destacados en esta categoría
          </p>
        )}
      </Container>
    </section>
  );
}