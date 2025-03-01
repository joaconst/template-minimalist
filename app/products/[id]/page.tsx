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
import { useCart } from "@/components/cart/cart-context";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const foundProduct = await getProductById(params.id);
      if (!foundProduct) {
        notFound();
        return;
      }
      setProduct(foundProduct);

      const related = (await getProductsByCategory(foundProduct.tipo))
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

  const images = [product.imagen1, product.imagen2].filter(Boolean);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleContactNow = () => {
    if (!product) return;

    const message = `Hola, me interesa ${product.titulo}. ¿Podrías darme más información?`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "5493516222999";
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6 sm:py-10">
        <Container>
          <Link href="/products" className="mb-4 sm:mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a los productos
          </Link>
          
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {/* Sección de imágenes */}
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              {images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage} 
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-background/80 rounded-full shadow-sm hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button 
                    onClick={handleNextImage} 
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-background/80 rounded-full shadow-sm hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </>
              )}
              <Image
                src={`${images[currentImageIndex]}`}
                alt={product.titulo}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 40vw"
                priority
              />
            </div>

            {/* Detalles del producto */}
            <div className="flex flex-col space-y-4 sm:space-y-6">
              <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                {product.titulo}
              </h1>
              <p className="text-xl font-medium sm:text-2xl">
                {formatPrice(product.precio)}
              </p>
              
              <Separator className="my-4 sm:my-6" />
              
              <p className="text-muted-foreground text-sm sm:text-base">
                {product.descripcion}
              </p>
              
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <p><strong>Color:</strong> {product.color}</p>
                <p><strong>Material:</strong> {product.material}</p>
                <p><strong>Categoria:</strong> {product.categoria}</p>
              </div>

              {/* Botones responsive */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 py-6 sm:py-4 text-sm sm:text-base border-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Añadir al carrito
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 py-6 sm:py-4 text-sm sm:text-base"
                  onClick={handleContactNow}
                >
                  Contactar ahora
                </Button>
              </div>
            </div>
          </div>

          {/* Productos relacionados */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 sm:mt-16 lg:mt-20">
              <h2 className="mb-4 sm:mb-6 text-xl font-bold sm:text-2xl">
                Productos relacionados
              </h2>
              <ProductGrid products={relatedProducts} />
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}