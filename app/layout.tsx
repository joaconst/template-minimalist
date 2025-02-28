import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/components/cart-context";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spectra - Lentes E-commerce",
  description: "xxxxxxxxxxxx",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            {children}
          </CartProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
