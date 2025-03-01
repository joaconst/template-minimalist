"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/components/cart/cart-context";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart ? onAddToCart(product) : addToCart(product);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-lg transition-shadow hover:shadow-lg"
    >
      <Card className="h-full border-0 transition-transform group-hover:scale-[1.02]">
        <div className="relative aspect-square bg-muted">
          <Image
            src={product.imagen1 || "/placeholder-product.jpg"}
            alt={product.titulo}
            fill
            className="object-cover transition-opacity group-hover:opacity-90"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        </div>
        
        <CardContent className="p-4 space-y-2">
          <h3 className="font-medium line-clamp-1">{product.titulo}</h3>
          {product.descripcion && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.descripcion}
            </p>
          )}
          <p className="text-lg font-semibold text-primary">
            {formatPrice(product.precio)}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            variant="secondary"
            className="w-full gap-2"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4" />
            Agregar al carrito
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}