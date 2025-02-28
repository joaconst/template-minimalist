"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilter } from "@/components/products/product-filter";
import {
  getAllProducts,
  getProductsByCategory,
  getCategories,
} from "@/lib/data";
import { Product, Category } from "@/lib/types";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      // Obtener productos iniciales según la categoría (usando "tipo" en tu db)
      const initialProducts = categoryParam
        ? await getProductsByCategory(categoryParam)
        : await getAllProducts();
      
      setProducts(initialProducts);
      
      // Aplicar filtros de precio si existen (usando la propiedad "precio")
      let filtered = [...initialProducts];
      
      if (minPriceParam) {
        filtered = filtered.filter(
          (product) => product.precio >= parseInt(minPriceParam)
        );
      }
      
      if (maxPriceParam) {
        filtered = filtered.filter(
          (product) => product.precio <= parseInt(maxPriceParam)
        );
      }
      
      setFilteredProducts(filtered);
    }

    async function fetchCategories() {
      const cats = await getCategories();
      setCategories(cats);
    }

    fetchProducts();
    fetchCategories();
  }, [categoryParam, minPriceParam, maxPriceParam]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <Container>
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Productos</h1>
            <ProductFilter 
              categories={categories} 
              minPrice={0} 
              maxPrice={200}
            />
          </div>
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">No hay productos encontrados.</p>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
