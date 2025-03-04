"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, ArrowLeft, ChevronLeft, ChevronRight, Info } from "lucide-react";
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
import { CartItem } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { url } from "@/lib/utils/url";

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const foundProduct = await getProductById(params.id);
        if (!isMounted) return;

        if (!foundProduct) {
          router.replace("/404");
          return;
        }

        setProduct(foundProduct);

        const related = (await getProductsByCategory(foundProduct.categoria))
          .filter((p) => p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Error al cargar el producto. Por favor intenta de nuevo.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [params.id, router]);

  const images = product
    ? [product.imagen1, product.imagen2, product.imagen3].filter(Boolean)
    : [];

  const handleImageNavigation = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleAddToCart = () => {
    if (product) {
      // Genera el link si no existe
      const productLink = product.link || `${url}${product.id}`;
      
      const cartItem: CartItem = {
        ...product,
        quantity: 1,
        link: productLink // Asegura que siempre tenga un valor
      };
      addToCart(cartItem);
    }
  };
  const handleContactNow = () => {
    const message = `Hola, me interesa el producto: ${product?.titulo} (${window.location.href}). ¿Podrías darme más información?`;
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5493516222999";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  // Obtener filtros guardados en localStorage
  const savedFilters = JSON.parse(localStorage.getItem("productFilters") || "{}");

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-10">
          <Container>
            <div className="max-w-md mx-auto text-center">
              <div className="mb-4 text-red-500">
                <Info className="h-12 w-12 mx-auto" />
              </div>
              <h1 className="text-xl font-bold mb-2">{error}</h1>
              <Button onClick={() => window.location.reload()}>
                Intentar nuevamente
              </Button>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  if (!loading && !product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-10">
          <Container>
            <div className="max-w-md mx-auto text-center">
              <h1 className="text-xl font-bold mb-4">Producto no encontrado</h1>
              <Button asChild>
                <Link href="/products">Ver todos los productos</Link>
              </Button>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6 sm:py-10">
        <Container>
          <Link
            href={{
              pathname: "/products",
              query: savedFilters,
            }}
            className="mb-4 sm:mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a todos los productos
          </Link>
          
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              <div className="space-y-4">
                <Skeleton className="aspect-square rounded-xl" />
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-20 rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-8 w-1/2" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </div>
          ) : product && (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                {/* Galería de imágenes */}
                <div className="space-y-4">
                  <div className="relative aspect-square bg-muted rounded-xl overflow-hidden shadow-lg">
                    {images.length > 1 && (
                      <>
                        <button 
                          onClick={() => handleImageNavigation((currentImageIndex - 1 + images.length) % images.length)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 rounded-full shadow-sm hover:bg-background transition-colors"
                          aria-label="Imagen anterior"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button 
                          onClick={() => handleImageNavigation((currentImageIndex + 1) % images.length)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 rounded-full shadow-sm hover:bg-background transition-colors"
                          aria-label="Siguiente imagen"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </>
                    )}
                    <Image
                      src={images[currentImageIndex]}
                      alt={`${product.titulo} - Imagen ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  
                  {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => handleImageNavigation(index)}
                          className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex 
                              ? "border-primary" 
                              : "border-transparent"
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`Miniatura ${index + 1}`}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Detalles del producto */}
                <div className="space-y-6">
                  <h1 className="text-3xl font-bold lg:text-4xl">
                    {product.titulo}
                  </h1>
                  
                  <p className="text-2xl font-medium text-primary">
                    {formatPrice(product.precio)}
                  </p>
                  
                  <Separator className="my-4" />
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {product.descripcion}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-accent p-3 rounded-lg">
                      <p className="text-lg font-medium text-black">Color del vidrio</p>
                      <p>{product.color_vidrio}</p>
                    </div>
                    <div className="bg-accent p-3 rounded-lg">
                      <p className="text-lg font-medium text-black">Color de lente</p>
                      <p>{product.color_lente}</p>
                    </div>
                    <div className="bg-accent p-3 rounded-lg">
                      <p className="text-lg font-medium text-black">Material</p>
                      <p>{product.material}</p>
                    </div>
                    <div className="bg-accent p-3 rounded-lg">
                      <p className="text-lg font-medium text-black">Categoría</p>
                      <p>{product.categoria}</p>
                    </div>
                    <div className="bg-accent p-3 rounded-lg">
                      <p className="text-lg font-medium text-black">Forma</p>
                      <p>{product.forma}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button 
                      size="lg" 
                      className="flex-1 gap-2 py-6 text-base border-2 border-primary/50"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Añadir al carrito
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1 py-6 text-base border-2 border-primary/50 hover:bg-white/20"
                      onClick={handleContactNow}
                    >
                      Contactar por WhatsApp
                    </Button>
                  </div>
                </div>
              </div>

              {/* Productos relacionados */}
              {relatedProducts.length > 0 && (
                <section className="mt-16">
                  <h2 className="mb-6 text-2xl font-bold">
                    Productos relacionados
                  </h2>
                  <ProductGrid products={relatedProducts} />
                </section>
              )}
            </>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}