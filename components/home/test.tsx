import Link from "next/link";
import { useState, useEffect } from "react";
import { getProducts } from "@/lib/data";
import { Product } from "@/lib/types";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center space-x-4 mb-6">
        <Link href="/productos/hombre">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
            Hombre
          </button>
        </Link>
        <Link href="/productos/mujer">
          <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700">
            Mujer
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg">
            <img src={product.imagen1} alt={product.titulo} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-lg font-bold mt-2">{product.titulo}</h2>
            <p className="text-gray-600">{product.descripcion}</p>
            <p className="text-gray-800 font-semibold mt-2">${product.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
