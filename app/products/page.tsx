"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilter } from "@/components/products/product-filter";
import { getProducts, getCategories, getFilterOptions } from "@/lib/data";
import { Product, Category } from "@/lib/types";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [_, categoriesData] = await Promise.all([
          getFilterOptions(),
          getCategories(),
        ]);

        if (isMounted) {
          setCategories(categoriesData);
        }

        const productsData = await getProducts(Object.fromEntries(searchParams.entries()));

        if (isMounted) {
          setProducts(productsData);
          if (productsData.length === 0) {
            setError("No se encontraron productos con los filtros aplicados");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) {
          setError("Error al cargar los productos. Por favor intenta de nuevo.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-10">
          <Container>
            <div className="text-center text-red-500">{error}</div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <Container>
          <div className="mb-8 flex items-center justify-between flex-col sm:flex-row gap-4">
            <h1 className="text-3xl font-bold">Productos</h1>
            <ProductFilter categories={categories} />
          </div>

          <ProductGrid products={products} isLoading={loading} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
