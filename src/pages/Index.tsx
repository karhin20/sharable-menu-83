import { useState, useMemo, useEffect } from "react";
import { Product, fetchProducts } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { SearchAndFilters } from "@/components/SearchAndFilters";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common["X-API-Key"] = API_KEY;

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { toast } = useToast();

  const { data: productList = [], isLoading, error: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Extract session token from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session = params.get("session");
    if (session) {
        setSessionToken(session);
    } else {
        toast({
            title: "Invalid Session",
            description: "No session token found. Please use the link provided in WhatsApp.",
            variant: "destructive",
        });
    }
  }, [toast]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('foodMarketCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // Clear invalid cart data
        localStorage.removeItem('foodMarketCart');
      }
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('foodMarketCart', JSON.stringify(cartItems));
  }, [cartItems]);


  const filteredProducts = useMemo(() => {
    return productList.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
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

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
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

  const handlePlaceOrder = async () => {
    if (!sessionToken) {
      toast({
        title: "Missing session token",
        description: "Please access this page from your WhatsApp link or contact support.",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }

    setIsPlacingOrder(true);
    try {
      const orderPayload = {
        session_token: sessionToken,
        items: cartItems.map(item => ({ product_id: item.id, quantity: item.quantity })),
        total_amount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };

      await axios.post("/confirm-items", orderPayload);
      
      toast({
        title: "Order Placed!",
        description: "We've received your order. Please return to WhatsApp to finalize delivery and payment.",
      });
      
      // Clear cart after successful order
      setCartItems([]);
      localStorage.removeItem('foodMarketCart');

      // Optional: Redirect back to WhatsApp after a short delay
      setTimeout(() => {
        // This is a common way to link back to WhatsApp
        window.location.href = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`;
      }, 2000);


    } catch (err: any) {
      console.error("Order placement error:", err);
      toast({
        title: "Order failed",
        description: err?.response?.data?.detail || err.message || "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Show error toast if products fail to load
  useEffect(() => {
    if (productsError) {
      toast({
        title: "Error loading products",
        description: "Please refresh the page to try again.",
        variant: "destructive",
      });
    }
  }, [productsError, toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
      />
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ghana Fresh Market</h1>
          <p className="text-gray-600">Quality local produce delivered to your door - Supporting Ghanaian farmers</p>
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
        ) : productsError ? (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load products. Please try again.</p>
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
        isPlacingOrder={isPlacingOrder}
      />
    </div>
  );
};

export default Index;
