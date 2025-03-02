import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/components/cart/cart-context";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spectra - Lentes",
  description: "Somos una empresa familiar dedicada a la importación de lentes de sol y armazones de receta, de excelente calidad y al mejor precio de mercado.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
      </body>
    </html>
  );
}