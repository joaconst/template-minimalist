"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter as FilterIcon, ChevronDown, ChevronUp } from "lucide-react";
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

interface ProductFilterProps {
  categories: { id: string; name: string; slug: string }[];
  colors: string[];
  materials: string[];
  patillaFlex: string[];
  sexo: string[];
  minPrice: number;
  maxPrice: number;
}

export function ProductFilter({
  categories,
  colors = [],
  materials = [],
  patillaFlex = [],
  sexo = [],
  minPrice,
  maxPrice,
}: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categorias: false,
    colores: false,
    materiales: false,
    patilla: false,
    sexo: false,
    precio: false
  });

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    color: searchParams.get("color") || "all",
    material: searchParams.get("material") || "all",
    patilla_flex: searchParams.get("patilla_flex") || "all",
    sexo: searchParams.get("sexo") || "all",
    minPrice: parseInt(searchParams.get("minPrice") || `${minPrice}`, 10),
    maxPrice: parseInt(searchParams.get("maxPrice") || `${maxPrice}`, 10),
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterChange = (type: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "all" && value !== minPrice && value !== maxPrice) {
        params.set(key, value.toString());
      }
    });
    router.push(`/products?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({
      category: "all",
      color: "all",
      material: "all",
      patilla_flex: "all",
      sexo: "all",
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
    router.push("/products");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FilterIcon className="h-4 w-4" />
          Filtros
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px] h-full flex flex-col">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-6 mt-4 px-2">
          {/* Sección Categorías */}
          <FilterSection
            title="Categorías"
            expanded={expandedSections.categorias}
            onToggle={() => toggleSection("categorias")}
            options={categories.map(c => ({ value: c.slug, label: c.name }))}
            selected={filters.category}
            onChange={(value) => handleFilterChange("category", value)}
          />

          {/* Sección Colores */}
          {colors.length > 0 && (
            <FilterSection
              title="Colores"
              expanded={expandedSections.colores}
              onToggle={() => toggleSection("colores")}
              options={colors.map(c => ({ value: c, label: c }))}
              selected={filters.color}
              onChange={(value) => handleFilterChange("color", value)}
            />
          )}

          {/* Sección Materiales */}
          {materials.length > 0 && (
            <FilterSection
              title="Materiales"
              expanded={expandedSections.materiales}
              onToggle={() => toggleSection("materiales")}
              options={materials.map(m => ({ value: m, label: m }))}
              selected={filters.material}
              onChange={(value) => handleFilterChange("material", value)}
            />
          )}

          {/* Sección Patilla Flex */}
          {patillaFlex.length > 0 && (
            <FilterSection
              title="Patilla Flex"
              expanded={expandedSections.patilla}
              onToggle={() => toggleSection("patilla")}
              options={patillaFlex.map(p => ({ value: p, label: p }))}
              selected={filters.patilla_flex}
              onChange={(value) => handleFilterChange("patilla_flex", value)}
            />
          )}

          {/* Sección Sexo */}
          {sexo.length > 0 && (
            <FilterSection
              title="Sexo"
              expanded={expandedSections.sexo}
              onToggle={() => toggleSection("sexo")}
              options={sexo.map(s => ({ value: s, label: s }))}
              selected={filters.sexo}
              onChange={(value) => handleFilterChange("sexo", value)}
            />
          )}

          {/* Sección Precio */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection("precio")}
              className="w-full flex justify-between items-center"
            >
              <h3 className="font-medium">Rango de Precio</h3>
              {expandedSections.precio ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            {expandedSections.precio && (
              <div className="space-y-4">
                <Slider
                  value={[filters.minPrice, filters.maxPrice]}
                  min={minPrice}
                  max={maxPrice}
                  step={50}
                  onValueChange={(value) => {
                    handleFilterChange("minPrice", value[0]);
                    handleFilterChange("maxPrice", value[1]);
                  }}
                />
                <div className="flex justify-between text-sm">
                  <span>${filters.minPrice}</span>
                  <span>${filters.maxPrice}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex gap-2 p-4 border-t">
          <Button onClick={applyFilters} className="flex-1">
            Aplicar
          </Button>
          <Button variant="outline" onClick={resetFilters} className="flex-1">
            Limpiar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const FilterSection = ({
  title,
  options,
  selected,
  onChange,
  expanded,
  onToggle
}: {
  title: string;
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
  expanded: boolean;
  onToggle: () => void;
}) => (
  <div className="space-y-2">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center p-2 hover:bg-gray-100 rounded-lg"
    >
      <span className="font-medium">{title}</span>
      {expanded ? (
        <ChevronUp className="h-5 w-5" />
      ) : (
        <ChevronDown className="h-5 w-5" />
      )}
    </button>
    {expanded && (
      <div className="pl-2">
        <RadioGroup value={selected} onValueChange={onChange}>
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2 py-1">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="font-normal">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <Separator className="my-3" />
      </div>
    )}
  </div>
);