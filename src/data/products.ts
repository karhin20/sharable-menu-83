import { supabase } from '@/lib/supabase';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface Order {
  id?: number;
  items: { product: Product; quantity: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'completed';
  created_at?: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*');
    
    if (error) {
      console.log('Falling back to default products:', error.message);
      return defaultProducts;
    }
    
    return data || defaultProducts;
  } catch (error) {
    console.log('Error fetching products, using defaults:', error);
    return defaultProducts;
  }
};

export const createOrder = async (order: Order): Promise<{ success: boolean; orderId?: number }> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select('id')
      .single();

    if (error) throw error;
    return { success: true, orderId: data.id };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false };
  }
};

// Default products as fallback
export const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    description: "Fresh tomatoes, mozzarella, basil, and our signature sauce",
  },
  {
    id: 2,
    name: "Classic Burger",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    description: "Angus beef patty with lettuce, tomato, and special sauce",
  },
  {
    id: 3,
    name: "Caesar Salad",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    description: "Crisp romaine lettuce, parmesan, croutons, and Caesar dressing",
  },
  {
    id: 4,
    name: "Pasta Carbonara",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    description: "Spaghetti with creamy sauce, pancetta, and fresh black pepper",
  },
];