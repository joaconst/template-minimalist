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
          backgroundImage="/background.jpg"
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