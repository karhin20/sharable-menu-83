
import { useState, useMemo, useEffect } from "react";
import { Product, fetchProducts, products } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { SearchAndFilters } from "@/components/SearchAndFilters";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  const { data: productList = products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('foodMarketCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('foodMarketCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return productList.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [productList, searchTerm, selectedCategory]);

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

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handlePlaceOrder = () => {
    const orderSummary = {
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        unit: item.unit,
        category: item.category,
        total: item.price * item.quantity
      })),
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    };

    // Send order data to parent window (chatbot)
    if (window.parent) {
      window.parent.postMessage({
        type: 'ORDER_SELECTED',
        data: orderSummary
      }, '*');
    }

    toast({
      title: "Order confirmed!",
      description: "Your selection has been sent to continue the purchase process.",
    });

    setCartItems([]);
    setIsCartOpen(false);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
      />
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fresh Food Market</h1>
          <p className="text-gray-600">Quality groceries delivered to your door</p>
        </div>
        
        <SearchAndFilters
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredProducts.length} of {productList.length} products
            </div>
            <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
          </>
        )}
      </main>
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
};

export default Index;
