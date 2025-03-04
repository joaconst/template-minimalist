"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/lib/types";
import { url } from "@/lib/utils/url";

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product, removeAll?: boolean) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          // Asegúrate de que todos los productos tengan `link`
          const validatedCart = parsedCart.map((item) => ({
            ...item,
            link: item.link || `${url}${item.id}`,
          }));
          setCartItems(validatedCart);
        }
      } catch (error) {
        console.error("Error al cargar el carrito desde localStorage:", error);
        localStorage.removeItem("cart"); // Limpiar datos corruptos
      }
    }
  }, []);

  // Guardar el carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Función para agregar un producto al carrito
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Genera el enlace dinámicamente si no está definido
      const productLink = product.link || `${url}${product.id}`;
      return [...prev, { ...product, quantity: 1, link: productLink }];
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (product: Product, removeAll = false) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (!existingItem) return prev;

      if (removeAll || existingItem.quantity === 1) {
        return prev.filter((item) => item.id !== product.id);
      }

      return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  // Función para vaciar el carrito
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe estar dentro de CartProvider");
  }
  return context;
}