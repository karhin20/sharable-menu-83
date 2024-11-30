export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Professional Laptop",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "High-performance laptop for professionals",
  },
  {
    id: 2,
    name: "Developer Workstation",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    description: "Powerful workstation for developers",
  },
  {
    id: 3,
    name: "Student Laptop",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    description: "Perfect for students and everyday use",
  },
  {
    id: 4,
    name: "Business Laptop",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    description: "Ideal for business professionals",
  },
];