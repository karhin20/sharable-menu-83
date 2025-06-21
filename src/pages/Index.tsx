import { useState, useMemo, useEffect } from "react";
import { Product, fetchProducts } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { SearchAndFilters } from "@/components/SearchAndFilters";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { supabase } from "@/lib/supabaseClient";

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_KEY = import.meta.env.VITE_API_KEY;

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common["X-API-Key"] = API_KEY;

interface CartItem extends Product {
  quantity: number;
}

interface SessionUser {
  user_id: string;
  phone_number: string;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
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
      // Fetch session info from Supabase
      (supabase as any)
        .from("sessions")
        .select("*, users:user_id(*)")
        .eq("session_token", session)
        .limit(1)
        .then(({ data, error }: { data: any; error: any }) => {
          if (error) {
            console.error("Error fetching session:", error);
            toast({
              title: "Session Error",
              description: "Unable to load your session. Please try again.",
              variant: "destructive",
            });
            return;
          }
          if (data && data[0]) {
            setSessionUser({
              user_id: data[0].user_id || data[0].users?.id || "",
              phone_number: data[0].users?.phone_number || data[0].phone_number || "",
            });
          }
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
    if (!sessionUser?.user_id || !sessionUser?.phone_number) {
      toast({
        title: "Missing user info",
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
        user_id: sessionUser.user_id,
        phone_number: sessionUser.phone_number,
        items: cartItems.map(item => ({ product_id: item.id, quantity: item.quantity })),
        total_amount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };

      const res = await axios.post("/confirm-items", orderPayload);
      
      toast({
        title: "Order confirmed!",
        description: (
          <div className="space-y-2">
            <p>Please check your WhatsApp for delivery options and payment details.</p>
            <p className="text-sm text-gray-600">
              You'll be asked to choose between delivery or pickup, and if delivery is selected, 
              you'll need to share your location.
            </p>
          </div>
        ),
        duration: 15000,
      });

      // Clear cart and close it
      setCartItems([]);
      setIsCartOpen(false);
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
        onRemoveItem={(productId) => handleRemoveFromCart(String(productId))}
        onUpdateQuantity={(productId, newQuantity) => handleUpdateQuantity(String(productId), newQuantity)}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
};

export default Index;
