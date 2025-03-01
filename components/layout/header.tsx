"use client";

import { ShoppingBag } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useCart } from "@/components/cart/cart-context";
import CartModal from "@/components/cart/cart-modal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchModal } from "@/components/search-bar/search-modal";

interface HeaderProps {
  storeName?: string;
}

export function Header({ storeName = "Spectra" }: HeaderProps) {
  const { cartItems } = useCart();
  const cartCount = cartItems.length;


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="hidden md:block">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8">
                  <Image
                    src="/logo.jpg"
                    alt="Logo de Spectra"
                    width={50}
                    height={50}
                    className="absolute h-full w-full object-contain"
                    priority
                  />
                </div>
                <span>{storeName}</span>
              </div>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:gap-4 lg:gap-6">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Barra de búsqueda */}
            <SearchModal />

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  aria-label="Shopping cart"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <CartModal />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}

const routes = [
  { href: "/", label: "Inicio" },
  { href: "/products", label: "Productos" },
];