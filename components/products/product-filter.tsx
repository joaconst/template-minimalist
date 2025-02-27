"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter as FilterIcon, X } from "lucide-react";
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
  categories: Category[];
  minPrice?: number;
  maxPrice?: number;
}

export function ProductFilter({
  categories,
  minPrice = 0,
  maxPrice = 200,
}: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get("minPrice") || minPrice.toString()),
    parseInt(searchParams.get("maxPrice") || maxPrice.toString()),
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

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
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Categories</h3>
            <RadioGroup
              value={selectedCategory}
              onValueChange={handleCategoryChange}
              className="space-y-2"
            >
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={category.slug} id={category.slug} />
                  <Label htmlFor={category.slug}>{category.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Separator />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Price Range</h3>
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
          <div className="flex flex-col gap-2 pt-4">
            <Button onClick={applyFilters}>Apply Filters</Button>
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}