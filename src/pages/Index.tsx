import { useState } from "react";
import { Product, products } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";

const Index = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (productId: number) => {
    const index = cartItems.findIndex((item) => item.id === productId);
    if (index !== -1) {
      const newItems = [...cartItems];
      newItems.splice(index, 1);
      setCartItems(newItems);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
      />
      <main className="container mx-auto py-8">
        <ProductGrid products={products} onAddToCart={handleAddToCart} />
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