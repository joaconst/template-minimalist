"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoppingCart, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cargar el producto y productos relacionados
  useEffect(() => {
    const fetchProduct = () => {
      const foundProduct = getProductById(params.id);
      if (!foundProduct) {
        notFound();
      }
      setProduct(foundProduct);

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
              <p>Cargando...</p>
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

  const images = [product.image, product.image2]; // Aquí agregas las imágenes principales y secundarias

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

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
            Volver a los productos
          </Link>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Carrusel de imágenes */}
            <div className="relative aspect-square bg-muted rounded-md overflow-hidden">
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <Image
                src={`${images[currentImageIndex]}?auto=format&fit=crop&w=800&q=80`}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
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
                  Añadir al carrito
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  Comprar ahora
                </Button>
              </div>
              <Separator className="my-8" />
              <div className="space-y-2">
                <h3 className="font-medium">Detalles</h3>
                <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>XXXXXXXXXXXXXXXXXXX</li>
                  <li>XXXXXXXXXXXXXXXXXXX</li>
                  <li>XXXXXXXXXXXXXXXXXXX</li>
                  <li>XXXXXXXXXXXXXXXXXXX</li>
                </ul>
              </div>
            </div>
          </div>
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-6 text-2xl font-bold">Productos relacionados</h2>
              <ProductGrid products={relatedProducts} />
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
