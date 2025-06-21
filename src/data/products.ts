import { z } from 'zod';
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Zod schema for validation
const ProductSchema = z.object({
  id: z.string(),
  created_at: z.string().datetime(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image_url: z.string().url(),
  category: z.string(),
  unit: z.string(),
  available_stock: z.boolean(),
});

export type Product = z.infer<typeof ProductSchema>;

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE_URL}/public/products`);
    
    // Validate the response data with Zod
    const validationResult = z.array(ProductSchema).safeParse(response.data);
    
    if (!validationResult.success) {
      console.error("Zod validation error:", validationResult.error);
      // You could throw an error or return an empty array
      throw new Error("Invalid product data from server.");
    }
    
    return validationResult.data;
};

export interface Order {
  id?: number;
  items: { product: Product; quantity: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'completed';
  created_at?: string;
}

export const categories = [
  { id: "all", name: "All Items" },
  { id: "tubers", name: "Tubers (Root Crops)" },
  { id: "grains", name: "Grains & Cereals" },
  { id: "vegetables", name: "Vegetables" },
  { id: "oils", name: "Oils & Fats" },
  { id: "fruits", name: "Fruits" },
  { id: "legumes", name: "Legumes (Beans)" },
];
