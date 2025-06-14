
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
  // Simulate API call delay for better UX
  await new Promise(resolve => setTimeout(resolve, 500));
  return products;
};

// Available products
export const products: Product[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
    description: "Fresh tomatoes, mozzarella, basil, and our signature sauce",
  },
  {
    id: 2,
    name: "Classic Burger",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    description: "Angus beef patty with lettuce, tomato, and special sauce",
  },
  {
    id: 3,
    name: "Caesar Salad",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    description: "Crisp romaine lettuce, parmesan, croutons, and Caesar dressing",
  },
  {
    id: 4,
    name: "Pasta Carbonara",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3",
    description: "Spaghetti with creamy sauce, pancetta, and fresh black pepper",
  },
];
