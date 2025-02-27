"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProductById, getProductsByCategory } from "@/lib/data";
import { formatPrice } from "@/lib/utils/format";
import { ProductGrid } from "@/components/products/product-grid";
import { Product } from "@/lib/types";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = () => {
      const foundProduct = getProductById(params.id);
      
      if (!foundProduct) {
        notFound();
      }
      
      setProduct(foundProduct);
      
      // Obtiene productos relacionados de la misma categoría
      const related = getProductsByCategory(foundProduct.category)
        .filter((p) => p.id !== foundProduct.id)
        .slice(0, 4);
      
      setRelatedProducts(related);
      setLoading(false);
    };
    
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-10">
          <Container>
            <div className="flex h-96 items-center justify-center">
              <p>Loading...</p>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <Container>
          <Link
            href="/products"
            className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to products
          </Link>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="aspect-square relative bg-muted rounded-md overflow-hidden">
              <Image
                src={`${product.image}?auto=format&fit=crop&w=800&q=80`}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="mt-2 text-2xl font-medium">
                {formatPrice(product.price)}
              </p>
              <Separator className="my-6" />
              <p className="text-muted-foreground">{product.description}</p>
              <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  Buy Now
                </Button>
              </div>
              <Separator className="my-8" />
              <div className="space-y-2">
                <h3 className="font-medium">Details</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Minimalist design</li>
                  <li>High-quality materials</li>
                  <li>Sustainable production</li>
                  <li>Free shipping on orders over $50</li>
                </ul>
              </div>
            </div>
          </div>
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
              <ProductGrid products={relatedProducts} />
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
