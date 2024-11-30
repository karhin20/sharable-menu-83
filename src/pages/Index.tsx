import { useState } from "react";
import { Product, fetchProducts, defaultProducts } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { useQuery } from "@tanstack/react-query";

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { data: products = defaultProducts, isLoading } = useQuery({
    queryKey: ['menu-items'],
    queryFn: fetchProducts,
  });

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
      />
      <main className="container mx-auto py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
        )}
      </main>
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
};

export default Index;