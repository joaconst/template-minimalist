"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { FeaturedProducts } from "@/components/home/featured-products";
import { getFeaturedProducts, getCategories } from "@/lib/data";
import { Product, Category } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { ProductFilter } from "@/components/products/product-filter";
import HomePage from "@/components/home/test";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      const products = await getFeaturedProducts();
      const cats = await getCategories();
      console.log("Productos Destacados:", products);
      console.log("Categorías:", cats);
      setFeaturedProducts(products);
      setCategories(cats);
    }
    fetchData();
  }, []);

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to cart",
      description: `${product.titulo} has been added to your cart.`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero backgroundImage="/background.jpg" />
        <ProductFilter categories={categories} />
        <FeaturedProducts 
          products={featuredProducts} 
          onAddToCart={handleAddToCart}
        />
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}
