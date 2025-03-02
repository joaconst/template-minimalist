"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import CartModal from "@/components/cart/cart-modal";
import { SearchModal } from "@/components/search-bar/search-modal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileMenu } from "@/components/layout/mobile-header";

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
          <div className="flex items-center gap-4">
            {/* Menú de hamburguesa en móvil */}
            <div className="md:hidden">
              <MobileMenu />
            </div>

            {/* Logo y nombre de la tienda */}
            <Link href="/">
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
                <span className="hidden md:block">{storeName}</span>
              </div>
            </Link>

            {/* Navegación en desktop */}
            <nav className="hidden md:ml-10 md:flex md:gap-4 lg:gap-6">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Barra de búsqueda */}
            <div className="hidden md:block w-80 transition-all duration-300 hover:w-96">
              <SearchModal alwaysVisible />
            </div>
            <div className="md:hidden">
              <SearchModal />
            </div>

            {/* Carrito */}
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
  { href: "#home", label: "Inicio" },
  { href: "/products", label: "Productos" },
  { href: "#featured", label:"Destacados"}
];