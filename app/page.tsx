"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { FeaturedProducts } from "@/components/home/featured-products";
import { getFeaturedProducts } from "@/lib/data";
import { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const products = await getFeaturedProducts();
        console.log("Productos Destacados:", products);
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los productos destacados",
          variant: "destructive"
        });
      }
    }
    fetchFeaturedProducts();
  }, [toast]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero backgroundImage="/background.jpg" />
        <FeaturedProducts products={featuredProducts} />
      </main>
      <Footer />
    </div>
  );
}