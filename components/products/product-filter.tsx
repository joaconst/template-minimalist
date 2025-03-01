"use client";

import { useState, useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getFilterOptions } from "@/lib/data";
import { Category } from "@/lib/types";

const capitalizeWords = (str: string) => {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

interface ProductFilterProps {
  categories: Category[];
}

export function ProductFilter({ categories }: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterOptions, setFilterOptions] = useState<{
    colors: string[];
    materials: string[];
    formas: string[];
    colorLentes: string[];
  }>({ colors: [], materials: [], formas: [], colorLentes: [] });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categorias: true,
    colores: false,
    materiales: false,
    formas: false,
  });

  const [filters, setFilters] = useState({
    categoria: searchParams.get("categoria") || "all",
    color_vidrio: searchParams.get("color_vidrio") || "all",
    material: searchParams.get("material") || "all",
    forma: searchParams.get("forma") || "all",
  });

  useEffect(() => {
    const loadFilterOptions = async () => {
      const options = await getFilterOptions();
      setFilterOptions({
        colors: options.colors,
        materials: options.materials,
        formas: options.formas,
        colorLentes: options.colorLentes,
      });
    };
    loadFilterOptions();
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterChange = (type: string, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "all") {
        params.set(key, value);
      }
    });

    router.push(`/products?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({
      categoria: "all",
      color_vidrio: "all",
      material: "all",
      forma: "all",
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
          <FilterSection
            title="Categorías"
            expanded={expandedSections.categorias}
            onToggle={() => toggleSection("categorias")}
            options={[
              { value: "all", label: "Todos" },
              ...categories.map((c) => ({
                value: c.slug,
                label: capitalizeWords(c.name),
              })),
            ]}
            selected={filters.categoria}
            onChange={(value) => handleFilterChange("categoria", value)}
          />

          <FilterSection
            title="Color del Vidrio"
            expanded={expandedSections.colores}
            onToggle={() => toggleSection("colores")}
            options={[
              { value: "all", label: "Todos" },
              ...filterOptions.colors.map((c) => ({
                value: c,
                label: capitalizeWords(c),
              })),
            ]}
            selected={filters.color_vidrio}
            onChange={(value) => handleFilterChange("color_vidrio", value)}
          />

          <FilterSection
            title="Materiales"
            expanded={expandedSections.materiales}
            onToggle={() => toggleSection("materiales")}
            options={[
              { value: "all", label: "Todos" },
              ...filterOptions.materials.map((m) => ({
                value: m,
                label: capitalizeWords(m),
              })),
            ]}
            selected={filters.material}
            onChange={(value) => handleFilterChange("material", value)}
          />

          <FilterSection
            title="Formas"
            expanded={expandedSections.formas}
            onToggle={() => toggleSection("formas")}
            options={[
              { value: "all", label: "Todos" },
              ...filterOptions.formas.map((f) => ({
                value: f,
                label: capitalizeWords(f),
              })),
            ]}
            selected={filters.forma}
            onChange={(value) => handleFilterChange("forma", value)}
          />
        </div>

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
  onToggle,
}: {
  title: string;
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
  expanded: boolean;
  onToggle: () => void;
}) => (
  <div className="space-y-2">
    <button onClick={onToggle} className="w-full flex justify-between items-center p-2">
      <span className="font-medium">{title}</span>
      {expanded ? <ChevronUp /> : <ChevronDown />}
    </button>
    {expanded && (
      <div className="pl-2">
        <RadioGroup value={selected} onValueChange={onChange}>
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2 py-1">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    )}
  </div>
);
