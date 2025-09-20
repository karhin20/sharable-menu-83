import { useState, useMemo, useEffect } from "react";
import { Product, fetchProducts } from "@/data/products";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { ProductGrid } from "@/components/ProductGrid";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { SearchAndFilters } from "@/components/SearchAndFilters";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Leaf, 
  Truck, 
  Heart, 
  Star, 
  Zap, 
  Shield,
  Clock,
  Users,
  TrendingUp,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Loader2
} from "lucide-react";
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
  const [showHero, setShowHero] = useState(true);
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

  // Auto-hide hero section after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHero(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-200/30 to-emerald-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-100/20 to-orange-100/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Header
        cartItemCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      {showHero && (
        <div className="relative z-10 animate-in slide-in-from-top duration-1000">
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 text-white py-8 px-4">
            <div className="container mx-auto text-center">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 mr-2 animate-pulse" />
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                  Ghana Fresh Market
                </h1>
                <Sparkles className="h-8 w-8 ml-2 animate-pulse" />
              </div>
              <p className="text-xl md:text-2xl text-emerald-100 mb-6 max-w-3xl mx-auto">
                🌱 Quality local produce delivered to your door - Supporting Ghanaian farmers
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                  <Leaf className="h-4 w-4 mr-2" />
                  Fresh Daily
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                  <Truck className="h-4 w-4 mr-2" />
                  Fast Delivery
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                  <Shield className="h-4 w-4 mr-2" />
                  Secure Payment
                </Badge>
              </div>
              <Button 
                onClick={() => setShowHero(false)}
                variant="secondary" 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Start Shopping <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto py-8 px-4 relative z-10">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <AnimateOnScroll delay={0}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-emerald-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-emerald-600">{productList.length}</p>
                  <p className="text-sm text-gray-600">Products</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-emerald-500" />
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-orange-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-600">{totalItems}</p>
                  <p className="text-sm text-gray-600">In Cart</p>
                </div>
                <Heart className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">24/7</p>
                  <p className="text-sm text-gray-600">Available</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={300}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">5★</p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
                <Star className="h-8 w-8 text-purple-500" />
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Enhanced Header */}
        <AnimateOnScroll className="text-center mb-8">
          <h2 className="text-2xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text text-transparent mb-4">
           Carefully sourced from farmers and delivered fresh to your doorstep
          </h2>
        </AnimateOnScroll>
        
        <AnimateOnScroll>
          <SearchAndFilters
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
          />
        </AnimateOnScroll>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-emerald-600 animate-pulse" />
              </div>
            </div>
            <p className="mt-4 text-lg text-gray-600">Loading fresh products...</p>
          </div>
        ) : productsError ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
              <p className="text-red-600 mb-4">Failed to load products. Please try again.</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline" 
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Refresh Page
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-medium text-gray-700">
                  Showing {filteredProducts.length} of {productList.length} products
                </span>
              </div>
              {filteredProducts.length > 0 && (
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  All Fresh
                </Badge>
              )}
            </div>
            <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
          </>
        )}

        {/* Call to Action */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom duration-500">
            <div className="bg-gradient-to-r from-emerald-600 to-orange-500 text-white rounded-2xl p-4 shadow-2xl border border-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="font-semibold">{totalItems} items in cart</span>
                </div>
                <Button 
                  onClick={() => setIsCartOpen(true)}
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  View Cart
                </Button>
              </div>
            </div>
          </div>
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
