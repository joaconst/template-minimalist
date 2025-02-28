"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter as FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Category } from "@/lib/types";

interface ProductFilterProps {
  categories?: Category[];
  minPrice?: number;
  maxPrice?: number;
}

export function ProductFilter({
  categories = [],
  minPrice = 0,
  maxPrice = 200,
}: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estado inicial con valores de la URL o predeterminados
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get("minPrice") || minPrice.toString(), 10),
    parseInt(searchParams.get("maxPrice") || maxPrice.toString(), 10),
  ]);
  const [isOpen, setIsOpen] = useState(false);

  // Manejo de cambios
  const handleCategoryChange = (value: string) => setSelectedCategory(value);
  const handlePriceChange = (value: number[]) => setPriceRange(value);

  // Aplicar filtros y actualizar la URL
  const applyFilters = () => {
    const params = new URLSearchParams();

    if (selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }

    if (priceRange[0] !== minPrice) {
      params.set("minPrice", priceRange[0].toString());
    }

    if (priceRange[1] !== maxPrice) {
      params.set("maxPrice", priceRange[1].toString());
    }

    const queryString = params.toString();
    router.push(`/products${queryString ? `?${queryString}` : ""}`);
    setIsOpen(false);
  };

  // Resetear filtros a los valores predeterminados
  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange([minPrice, maxPrice]);
    router.push("/products");
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <FilterIcon className="h-4 w-4" />
          Filtros
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />

        <div className="space-y-6">
          {/* Categorías */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Categorías</h3>
            <RadioGroup
              value={selectedCategory}
              onValueChange={handleCategoryChange}
              className="space-y-2"
            >
              {/* Opción "Todo" */}
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label
                  htmlFor="all"
                  className={selectedCategory === "all" ? "font-bold text-primary" : ""}
                >
                  Todo
                </Label>
              </div>

              {/* Listado dinámico de categorías */}
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={category.slug} id={category.slug} />
                  <Label
                    htmlFor={category.slug}
                    className={selectedCategory === category.slug ? "font-bold text-primary" : ""}
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Filtro de precios */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Rango de precios</h3>
              <p className="text-xs text-muted-foreground">
                ${priceRange[0]} - ${priceRange[1]}
              </p>
            </div>
            <Slider
              value={priceRange}
              min={minPrice}
              max={maxPrice}
              step={5}
              onValueChange={handlePriceChange}
              className="py-4"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col gap-2 pt-4">
            <Button onClick={applyFilters}>Aplicar filtros</Button>
            <Button variant="outline" onClick={resetFilters}>
              Reiniciar filtros
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
