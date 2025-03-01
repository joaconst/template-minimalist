import { supabase } from "@/lib/supabase/client";
import { Product, Category } from "@/lib/types";

/**
 * Obtiene todos los productos, opcionalmente filtrados.
 */
export async function getProducts(filters?: Record<string, any>): Promise<Product[]> {
  let query = supabase.from("spectra").select("*");

  if (filters) {
    // Aplicar filtros dinámicos
    if (filters.category && filters.category !== "all") {
      query = query.eq("categoria", filters.category);
    }
    if (filters.color && filters.color !== "all") {
      query = query.eq("color", filters.color);
    }
    if (filters.material && filters.material !== "all") {
      query = query.eq("material", filters.material);
    }
    if (filters.minPrice) {
      query = query.gte("precio", filters.minPrice);
    }
    if (filters.maxPrice) {
      query = query.lte("precio", filters.maxPrice);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return data as Product[];
}

/**
 * Obtiene productos destacados.
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("spectra")
    .select("*")
    .eq("destacado", true);

  if (error) {
    console.error("Error fetching featured products:", error.message);
    return [];
  }

  return data as Product[];
}

/**
 * Obtiene un producto por su ID.
 */
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("spectra")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product by ID:", error.message);
    return null;
  }

  return data as Product;
}

/**
 * Obtiene todas las categorías únicas.
 */
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.rpc("get_unique_categories");

  if (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }

  const categories = (data as { categoria: string }[]).map((item) => {
    const name = item.categoria;
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    return { id: slug, name, slug };
  });

  return categories;
}

/**
 * Obtiene productos por categoría.
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (category === "all") {
    return getProducts();
  }
  const { data, error } = await supabase
    .from("spectra")
    .select("*")
    .eq("categoria", category);

  if (error) {
    console.error("Error fetching products by category:", error.message);
    return [];
  }

  return data as Product[];
}

/**
 * Obtiene valores únicos de una columna específica.
 */
export async function getUniqueValues(column: keyof Product): Promise<string[]> {
  const { data, error } = await supabase
    .from("spectra")
    .select(column)
    .order(column, { ascending: true }); // Ordenar los valores

  if (error) {
    console.error(`Error fetching unique ${column}:`, error.message);
    return [];
  }

  // Eliminar duplicados manualmente
  const uniqueValues = Array.from(new Set((data as Product[]).map((item) => item[column]))).filter(Boolean) as string[];

  return uniqueValues;
}

/**
 * Obtiene todas las opciones de filtrado.
 */
export async function getFilterOptions() {
  const [colors, materials] = await Promise.all([
    getUniqueValues("color"),
    getUniqueValues("material"),
  ]);

  return {
    colors,
    materials,
  };
}

/**
 * Alias para obtener todos los productos.
 */
export async function getAllProducts(): Promise<Product[]> {
  return await getProducts();
}
