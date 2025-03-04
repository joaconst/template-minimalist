// data.ts
import { supabase } from "@/lib/supabase/client";
import { Product, Category } from "@/lib/types";
import { url } from "./utils/url";

/**
 * Obtiene todos los productos con filtros opcionales
 */
export async function getProducts(filters?: Record<string, any>): Promise<Product[]> {
  try {
    let query = supabase.from("spectra").select("*");

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value === "all" || !value) return;

        // Manejo especial para categoría
        if (key === "categoria") {
          query = query.ilike(key, value);
        } 
        // Manejo de precios
        else if (key === "minPrice") {
          query = query.gte("precio", value);
        } else if (key === "maxPrice") {
          query = query.lte("precio", value);
        } 
        // Otros filtros
        else {
          query = query.eq(key, value);
        }
      });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Obtiene el rango de precios
 */
export async function getPriceRange(): Promise<{ minPrice: number; maxPrice: number }> {
  try {
    const { data, error } = await supabase
      .from("spectra")
      .select("precio")
      .order("precio");

    if (error) throw error;
    
    const prices = data.map(item => item.precio).filter(Number);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    };
  } catch (error) {
    console.error("Error fetching price range:", error instanceof Error ? error.message : error);
    return { minPrice: 0, maxPrice: 0 };
  }
}

/**
 * Obtiene categorías únicas (case-insensitive)
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from("spectra")
      .select("categoria");

    if (error) throw error;

    const uniqueCategories = new Map<string, string>();
    
    (data as { categoria: string }[]).forEach((item) => {
      const rawValue = item.categoria?.toString().trim();
      if (rawValue) {
        // Normalización consistente
        const normalized = rawValue.toLowerCase();
        if (!uniqueCategories.has(normalized)) {
          uniqueCategories.set(normalized, rawValue); // Conserva el formato original
        }
      }
    });

    return Array.from(uniqueCategories.values()).map(categoria => ({
      id: categoria.toLowerCase().replace(/\s+/g, "-"),
      name: categoria, // Conserva mayúsculas originales
      slug: categoria.toLowerCase().replace(/\s+/g, "-")
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Obtiene valores únicos para una columna (case-insensitive)
 */
export async function getUniqueValues(column: keyof Product): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("spectra")
      .select(column)
      .order(column, { ascending: true });

    if (error) throw error;

    const uniqueValues = new Map<string, string>();
    
    (data as Record<typeof column, string>[]).forEach((item) => {
      const rawValue = item[column]?.toString();
      if (rawValue) {
        const normalized = rawValue.trim().toLowerCase();
        if (!uniqueValues.has(normalized)) {
          uniqueValues.set(normalized, rawValue.trim());
        }
      }
    });

    return Array.from(uniqueValues.values());
  } catch (error) {
    console.error(`Error fetching unique ${column}:`, error instanceof Error ? error.message : error);
    return [];
  }
}

/**
 * Obtiene todas las opciones de filtrado
 */
export async function getFilterOptions() {
  try {
    const [colors, materials, categoria, colorLentes, formas, priceRange] = await Promise.all([
      getUniqueValues("color_vidrio"),
      getUniqueValues("material"),
      getUniqueValues("categoria"),
      getUniqueValues("color_lente"),
      getUniqueValues("forma"),
      getPriceRange()
    ]);

    return {
      colors: Array.from(new Set(colors)),
      materials: Array.from(new Set(materials)),
      categoria: Array.from(new Set(categoria)),
      colorLentes: Array.from(new Set(colorLentes)),
      formas: Array.from(new Set(formas)),
      ...priceRange
    };
  } catch (error) {
    console.error("Error fetching filter options:", error instanceof Error ? error.message : error);
    return {
      colors: [],
      materials: [],
      categoria: [],
      colorLentes: [],
      formas: [],
      minPrice: 0,
      maxPrice: 0
    };
  }
}

// Función faltante que necesitas agregar
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from("spectra")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) throw error;
    
    // Asegurar que el producto tenga link
    return { 
      ...data, 
      link: data.link || `${url}${data.id}`
    } as Product;
    
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
// Función faltante para productos por categoría
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("spectra")
      .select("*")
      .ilike("categoria", category);

    if (error) throw error;
    return data as Product[];
  } catch (error) {
    console.error("Error fetching products by category:", error instanceof Error ? error.message : error);
    return [];
  }
}

export async function getFeaturedProducts(limit?: number): Promise<Product[]> {
  try {
    let query = supabase
      .from("spectra")
      .select("*")
      .eq("destacado", true)

    if (limit && limit > 0) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Product[];
  } catch (error) {
    console.error("Error fetching featured products:", error instanceof Error ? error.message : error);
    return [];
  }
}