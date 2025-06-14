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
  { id: 'tubers', name: 'Tubers (Root Crops)' },
  { id: 'grains', name: 'Grains & Cereals' },
  { id: 'vegetables', name: 'Vegetables' },
  { id: 'oils', name: 'Oils & Fats' },
  { id: 'fruits', name: 'Fruits' },
  { id: 'legumes', name: 'Legumes (Beans)' },
];

// Available products
export const products: Product[] = [
  // Tubers
  {
    id: 1,
    name: "Yam",
    price: 8.50,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
    description: "Fresh white yam, perfect for pounding or boiling with palm nut soup",
    category: 'tubers',
    unit: 'per tuber',
    inStock: true,
  },
  {
    id: 2,
    name: "Cassava",
    price: 3.00,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
    description: "Fresh cassava root, ideal for gari, fufu, or boiling",
    category: 'tubers',
    unit: 'per kg',
    inStock: true,
  },
  {
    id: 3,
    name: "Sweet Potato",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
    description: "Sweet orange potatoes, great for roasting or boiling",
    category: 'tubers',
    unit: 'per kg',
    inStock: true,
  },
  {
    id: 4,
    name: "Cocoyam",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
    description: "Traditional cocoyam, perfect for ampesi or fufu",
    category: 'tubers',
    unit: 'per kg',
    inStock: true,
  },
  
  // Grains
  {
    id: 5,
    name: "Rice (Local)",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description: "Premium local Ghanaian rice, perfect for jollof or plain rice",
    category: 'grains',
    unit: '5kg bag',
    inStock: true,
  },
  {
    id: 6,
    name: "Maize",
    price: 8.00,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description: "Fresh maize corn, ideal for kenkey, banku, or roasting",
    category: 'grains',
    unit: '3kg bag',
    inStock: true,
  },
  {
    id: 7,
    name: "Millet",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description: "Traditional northern Ghana millet for porridge and tuo zaafi",
    category: 'grains',
    unit: '2kg bag',
    inStock: true,
  },
  {
    id: 8,
    name: "Sorghum",
    price: 13.50,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description: "Quality sorghum grain for traditional northern dishes",
    category: 'grains',
    unit: '2kg bag',
    inStock: true,
  },

  // Vegetables
  {
    id: 9,
    name: "Garden Eggs",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
    description: "Fresh white garden eggs, perfect for stew and shito",
    category: 'vegetables',
    unit: 'per kg',
    inStock: true,
  },
  {
    id: 10,
    name: "Okra",
    price: 3.50,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
    description: "Fresh okra pods, ideal for okra stew and soup",
    category: 'vegetables',
    unit: 'per kg',
    inStock: true,
  },
  {
    id: 11,
    name: "Kontomire (Cocoyam Leaves)",
    price: 4.00,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
    description: "Fresh kontomire leaves for traditional Ghanaian kontomire stew",
    category: 'vegetables',
    unit: 'per bunch',
    inStock: true,
  },
  {
    id: 12,
    name: "Tomatoes",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
    description: "Fresh red tomatoes for stew, jollof rice, and cooking",
    category: 'vegetables',
    unit: 'per kg',
    inStock: true,
  },
  {
    id: 13,
    name: "Onions",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
    description: "Fresh onions, essential for all Ghanaian cooking",
    category: 'vegetables',
    unit: 'per kg',
    inStock: true,
  },

  // Oils
  {
    id: 14,
    name: "Palm Oil (Red Oil)",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
    description: "Authentic Ghanaian red palm oil for traditional cooking",
    category: 'oils',
    unit: '1L bottle',
    inStock: true,
  },
  {
    id: 15,
    name: "Palm Kernel Oil",
    price: 30.00,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
    description: "Pure palm kernel oil, perfect for frying and cooking",
    category: 'oils',
    unit: '750ml bottle',
    inStock: true,
  },
  {
    id: 16,
    name: "Coconut Oil",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
    description: "Local coconut oil for cooking and traditional uses",
    category: 'oils',
    unit: '500ml bottle',
    inStock: true,
  },

  // Fruits
  {
    id: 17,
    name: "Plantain",
    price: 2.00,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224",
    description: "Fresh plantain for kelewele, ampesi, or frying",
    category: 'fruits',
    unit: 'per hand',
    inStock: true,
  },
  {
    id: 18,
    name: "Oranges",
    price: 1.50,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    description: "Sweet Ghanaian oranges, perfect for fresh juice",
    category: 'fruits',
    unit: 'per kg',
    inStock: true,
  },
  {
    id: 19,
    name: "Pineapple",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    description: "Sweet Ghana Gold pineapple, locally grown",
    category: 'fruits',
    unit: 'per piece',
    inStock: true,
  },
  {
    id: 20,
    name: "Watermelon",
    price: 8.00,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    description: "Fresh watermelon, perfect for the Ghanaian heat",
    category: 'fruits',
    unit: 'per piece',
    inStock: true,
  },

  // Legumes
  {
    id: 21,
    name: "Black-eyed Peas",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description: "Quality black-eyed peas for red red and koose",
    category: 'legumes',
    unit: '2kg bag',
    inStock: true,
  },
  {
    id: 22,
    name: "Cowpeas",
    price: 10.00,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description: "Fresh cowpeas, traditional protein source",
    category: 'legumes',
    unit: '2kg bag',
    inStock: true,
  },
  {
    id: 23,
    name: "Groundnuts (Peanuts)",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description: "Fresh groundnuts for groundnut soup and snacking",
    category: 'legumes',
    unit: '1kg bag',
    inStock: true,
  },
  {
    id: 24,
    name: "Bambara Beans",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description: "Traditional bambara groundnuts, rich in protein",
    category: 'legumes',
    unit: '1kg bag',
    inStock: true,
  },
];
