
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'tubers' | 'grains' | 'vegetables' | 'oils' | 'fruits' | 'legumes';
  unit: string;
  inStock: boolean;
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

export const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'tubers', name: 'Tubers' },
  { id: 'grains', name: 'Grains' },
  { id: 'vegetables', name: 'Vegetables' },
  { id: 'oils', name: 'Oils' },
  { id: 'fruits', name: 'Fruits' },
  { id: 'legumes', name: 'Legumes' },
];

// Available products
export const products: Product[] = [
  // Tubers
  {
    id: 1,
    name: "Sweet Potatoes",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
    description: "Fresh organic sweet potatoes, perfect for roasting or baking",
    category: 'tubers',
    unit: 'per lb',
    inStock: true,
  },
  {
    id: 2,
    name: "Russet Potatoes",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
    description: "High-quality russet potatoes, ideal for fries and mashing",
    category: 'tubers',
    unit: 'per lb',
    inStock: true,
  },
  {
    id: 3,
    name: "Cassava Root",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
    description: "Fresh cassava root, a staple carbohydrate source",
    category: 'tubers',
    unit: 'per lb',
    inStock: true,
  },
  
  // Grains
  {
    id: 4,
    name: "Organic Brown Rice",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description: "Premium organic brown rice, 5lb bag",
    category: 'grains',
    unit: '5lb bag',
    inStock: true,
  },
  {
    id: 5,
    name: "Quinoa",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description: "High-protein quinoa, perfect for healthy meals",
    category: 'grains',
    unit: '2lb bag',
    inStock: true,
  },
  {
    id: 6,
    name: "Steel Cut Oats",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description: "Premium steel cut oats for nutritious breakfast",
    category: 'grains',
    unit: '2lb bag',
    inStock: true,
  },

  // Vegetables
  {
    id: 7,
    name: "Organic Spinach",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
    description: "Fresh organic baby spinach leaves",
    category: 'vegetables',
    unit: 'per bunch',
    inStock: true,
  },
  {
    id: 8,
    name: "Bell Peppers",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
    description: "Colorful bell peppers, mix of red, yellow, and green",
    category: 'vegetables',
    unit: 'per lb',
    inStock: true,
  },
  {
    id: 9,
    name: "Broccoli Crowns",
    price: 2.79,
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc",
    description: "Fresh broccoli crowns, rich in vitamins and minerals",
    category: 'vegetables',
    unit: 'per lb',
    inStock: true,
  },

  // Oils
  {
    id: 10,
    name: "Extra Virgin Olive Oil",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
    description: "Premium cold-pressed extra virgin olive oil",
    category: 'oils',
    unit: '500ml bottle',
    inStock: true,
  },
  {
    id: 11,
    name: "Coconut Oil",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
    description: "Organic virgin coconut oil, perfect for cooking and baking",
    category: 'oils',
    unit: '16oz jar',
    inStock: true,
  },
  {
    id: 12,
    name: "Avocado Oil",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
    description: "Cold-pressed avocado oil with high smoke point",
    category: 'oils',
    unit: '500ml bottle',
    inStock: true,
  },

  // Fruits
  {
    id: 13,
    name: "Organic Bananas",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224",
    description: "Fresh organic bananas, perfect for snacking",
    category: 'fruits',
    unit: 'per lb',
    inStock: true,
  },
  {
    id: 14,
    name: "Gala Apples",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    description: "Crisp and sweet Gala apples",
    category: 'fruits',
    unit: 'per lb',
    inStock: true,
  },

  // Legumes
  {
    id: 15,
    name: "Black Beans",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description: "Dried black beans, high in protein and fiber",
    category: 'legumes',
    unit: '2lb bag',
    inStock: true,
  },
  {
    id: 16,
    name: "Chickpeas",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description: "Premium dried chickpeas, perfect for hummus",
    category: 'legumes',
    unit: '2lb bag',
    inStock: true,
  },
];
