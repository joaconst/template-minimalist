"use client";

import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function CartModal() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const handleWhatsAppMessage = () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de continuar.");
      return;
    }

    try {
      const isValidCart = cartItems.every(
        (item) => item.titulo && item.precio && item.quantity
      );
      if (!isValidCart) throw new Error("Datos incompletos en el carrito");

      const message = cartItems
        .map(
          (item) =>
            `✔ ${item.titulo} (x${item.quantity}) - ${formatPrice(
              item.precio * item.quantity
            )}`
        )
        .join("%0A");

      const total = cartItems.reduce(
        (acc, item) => acc + item.precio * item.quantity,
        0
      );

      const whatsappMessage = `¡Hola! Quisiera hacer el siguiente pedido:%0A%0A${message}%0A%0ATotal: ${formatPrice(
        total
      )}%0A%0A¿Está disponible?`;

      const whatsappURL = `https://api.whatsapp.com/send?phone=5493512362632&text=${whatsappMessage}`;

      window.open(whatsappURL, "_blank");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al generar el mensaje. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🛒 Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="border-b pb-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{item.titulo}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(item.precio)} x {item.quantity}
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFromCart(item)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => removeFromCart(item, true)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Button variant="outline" onClick={clearCart} className="w-full mb-4">
              Vaciar carrito
            </Button>
            <Button className="w-full" onClick={handleWhatsAppMessage}>
              Ir a WhatsApp
            </Button>
          </div>
        </>
      )}
    </div>
  );
}