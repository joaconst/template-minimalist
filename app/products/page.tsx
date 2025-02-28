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
  const [filterOptions, setFilterOptions] = useState<{
    colors: string[];
    materials: string[];
    patillaFlex: string[];
    sexo: string[];
  }>({ colors: [], materials: [], patillaFlex: [], sexo: [] });

  useEffect(() => {
    const fetchData = async () => {
      const [filterOptions, categories, products] = await Promise.all([
        getFilterOptions(),
        getCategories(),
        getProducts(Object.fromEntries(searchParams.entries())),
      ]);
      
      setFilterOptions(filterOptions);
      setCategories(categories);
      setProducts(products);
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <Container>
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Productos</h1>
            <ProductFilter 
              categories={categories}
              colors={filterOptions.colors}
              materials={filterOptions.materials}
              patillaFlex={filterOptions.patillaFlex}
              sexo={filterOptions.sexo}
              minPrice={0}
              maxPrice={2000}
            />
          </div>
          
          <ProductGrid products={products} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}