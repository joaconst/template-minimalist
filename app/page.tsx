"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { FeaturedProducts } from "@/components/home/featured-products";
import { getFeaturedProducts } from "@/lib/data";
import { Product } from "@/lib/types";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const { toast } = useToast();
  
  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero 
          backgroundImage="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1920&q=80"
        />
        <FeaturedProducts 
          products={featuredProducts} 
          onAddToCart={handleAddToCart}
        />
      </main>
      <Footer />
    </div>
  );
}