import { supabase } from "@/lib/supabaseClient";
import type { Database } from "@/types/supabase";

export type Product = Database["public"]["Tables"]["products"]["Row"] & {
  description?: string;
  category?: string;
  unit?: string;
  inStock?: boolean;
};

export interface Order {
  id?: number;
  items: { product: Product; quantity: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'completed';
  created_at?: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw error;
  
  // Map database response to Product type, converting `available_stock` to `inStock`
  return (data || []).map(product => ({
    ...product,
    inStock: product.available_stock === 1,
  }));
};

export const categories = [
  { id: "all", name: "All Items" },
  { id: "tubers", name: "Tubers (Root Crops)" },
  { id: "grains", name: "Grains & Cereals" },
  { id: "vegetables", name: "Vegetables" },
  { id: "oils", name: "Oils & Fats" },
  { id: "fruits", name: "Fruits" },
  { id: "legumes", name: "Legumes (Beans)" },
];
