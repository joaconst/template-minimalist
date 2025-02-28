import { supabase } from "@/lib/supabase/client";
import { Product, Category } from "@/lib/types";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("spectra").select("*");

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return data as Product[];
}

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

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.rpc("get_unique_categories");

  if (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }

  const categories = (data as { tipo: string }[]).map((item) => {
    const name = item.tipo;
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    return { id: slug, name, slug };
  });

  return categories;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (category === "all") {
    return getProducts();
  }
  const { data, error } = await supabase
    .from("spectra")
    .select("*")
    .eq("tipo", category);

  if (error) {
    console.error("Error fetching products by category:", error.message);
    return [];
  }

  return data as Product[];
}

// Alias para obtener todos los productos
export async function getAllProducts(): Promise<Product[]> {
  return await getProducts();
}