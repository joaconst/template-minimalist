"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/data";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function SearchModal() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      const products = await getProducts();
      const filtered = products.filter((product) =>
        product.titulo.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Buscar">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar lentes..."
              className="w-full rounded-md pl-8"
              value={query}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="max-h-[400px] overflow-y-auto p-4">
          {results.length > 0 ? (
            results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="flex items-center gap-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <div className="relative h-16 w-16 flex-shrink-0">
                  <Image
                    src={product.imagen1}
                    alt={product.titulo}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{product.titulo}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.descripcion}
                  </p>
                  <p className="text-sm font-medium">
                    {product.precio.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              {query ? "No se encontraron resultados." : "Busca productos..."}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}