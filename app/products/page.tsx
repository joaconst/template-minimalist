"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilter } from "@/components/products/product-filter";
import { getProducts, getCategories, getFilterOptions } from "@/lib/data";
import { Product, Category } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para limpiar los filtros
  const handleClearFilters = () => {
    router.push("/products"); // Redirige a la página de productos sin filtros
  };

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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <Container>
          <div className="mb-8 flex items-center justify-between flex-col sm:flex-row gap-4">
            <h1 className="text-3xl font-bold">Productos</h1>
            <div className="flex items-center gap-4">
              {/* Filtros siempre visibles */}
              <ProductFilter categories={categories} />

              {/* Botón para limpiar filtros (siempre visible) */}
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="hover:bg-primary"
              >
                Limpiar filtros
              </Button>
            </div>
          </div>

          {products.length === 0 && !loading ? (
            <div className="text-center text-muted-foreground text-red-600">
              <p>No se encontraron productos con los filtros aplicados</p>
              <Button
                className="mt-4 hover:bg-primary"
                variant="outline"
                onClick={handleClearFilters}
              >
                Ver todos los productos
              </Button>
            </div>
          ) : (
            <ProductGrid products={products} isLoading={loading} />
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
