"use client";

import { ShoppingBag, Menu, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { useCart } from "@/components/cart/cart-context";
import CartModal from "@/components/cart/cart-modal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  storeName?: string;
}

export function Header({ storeName = "Spectra" }: HeaderProps) {
  const { cartItems } = useCart();
  const cartCount = cartItems.length;
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentTheme = isMounted ? resolvedTheme : 'light';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col gap-6 py-6">
                  <Link href="/" className="text-xl font-bold">
                    <div className="flex items-center gap-2">
                      <div className="relative h-8 w-8">
                        <Image
                          src="/logo-claro.jpg"
                          alt="Logo claro"
                          width={32}
                          height={32}
                          className="absolute h-full w-full object-contain dark:hidden"
                          priority
                        />
                        <Image
                          src="/logo-oscuro.jpg"
                          alt="Logo oscuro"
                          width={32}
                          height={32}
                          className="hidden h-full w-full object-contain dark:block"
                          priority
                        />
                      </div>
                      <span>{storeName}</span>
                    </div>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {routes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {route.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="hidden md:block">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8">
                  <Image
                    src="/logo-claro.jpg"
                    alt="Logo claro"
                    width={50}
                    height={50}
                    className="absolute h-full w-full object-contain transition-opacity duration-300 dark:opacity-0"
                    priority
                  />
                  <Image
                    src="/logo-oscuro.jpg"
                    alt="Logo oscuro"
                    width={50}
                    height={50}
                    className="absolute h-full w-full object-contain opacity-0 transition-opacity duration-300 dark:opacity-100"
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
                    "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <form className="hidden md:block md:w-[200px] lg:w-[300px]">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar lentes..."
                  className="w-full rounded-md pl-8"
                />
              </div>
            </form>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
              aria-label="Cambiar tema"
            >
              {!isMounted ? (
                <div className="h-5 w-5 bg-muted rounded" />
              ) : currentTheme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

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