import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { 
  Plus, 
  Minus, 
  ShoppingCart, 
  Heart, 
  Star, 
  Leaf, 
  Zap,
  CheckCircle2,
  XCircle,
  Sparkles,
  Loader2
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const isAvailable = product.available_stock === true;

  const handleAddToCart = async () => {
    if (!isAvailable) return;
    
    setIsAdding(true);
    
    // Simulate a brief loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onAddToCart(product, quantity);
    toast({
      title: "✨ Added to cart!",
      description: `${quantity}x ${product.name} has been added to your order.`,
    });
    setQuantity(1);
    setIsAdding(false);
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 99));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const getCategoryGradient = (category: string) => {
    const gradients = {
      tubers: "from-orange-400 to-orange-600",
      grains: "from-yellow-400 to-yellow-600",
      vegetables: "from-emerald-400 to-emerald-600",
      oils: "from-purple-400 to-purple-600",
      fruits: "from-red-400 to-red-600",
      legumes: "from-blue-400 to-blue-600",
    };
    return gradients[category as keyof typeof gradients] || "from-gray-400 to-gray-600";
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      tubers: "🥔",
      grains: "🌾",
      vegetables: "🥬",
      oils: "🫒",
      fruits: "🍎",
      legumes: "🫘",
    };
    return icons[category as keyof typeof icons] || "📦";
  };

  // Generate a fallback image based on category
  const getFallbackImage = (category: string) => {
    const fallbackImages = {
      tubers: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZCNzAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5SUPC90ZXh0Pgo8L3N2Zz4K",
      grains: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZEMDAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn4a+PC90ZXh0Pgo8L3N2Zz4K",
      vegetables: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMDBDNzAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5KwPC90ZXh0Pgo8L3N2Zz4K",
      oils: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOUM0M0Y2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5K2PC90ZXh0Pgo8L3N2Zz4K",
      fruits: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkY0NDQ0Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5KUPC90ZXh0Pgo8L3N2Zz4K",
      legumes: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzM5OUZGIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5K4PC90ZXh0Pgo8L3N2Zz4K",
    };
    return fallbackImages[category as keyof typeof fallbackImages] || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IiM2QjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfk5o8L3RleHQ+Cjwvc3ZnPgo=";
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div 
      className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 ${
        !isAvailable ? 'opacity-60 grayscale' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(product.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      {/* Image container with overlay effects */}
      <div className="relative overflow-hidden">
        {/* Loading skeleton */}
        {imageLoading && !imageError && (
          <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-400 rounded-full animate-pulse"></div>
          </div>
        )}
        
        {/* Product image with error handling */}
        <img
          src={imageError ? getFallbackImage(product.category) : product.image_url}
          alt={product.name}
          className={`w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category badge with modern styling */}
        <Badge 
          className={`absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 border-0 shadow-lg px-3 py-1 text-xs font-medium`}
        >
          <span className="mr-1">{getCategoryIcon(product.category)}</span>
          {product.category}
        </Badge>

        {/* Fallback image indicator */}
        {imageError && (
          <div className="absolute top-3 right-12 bg-amber-500/90 backdrop-blur-sm text-white rounded-full p-1.5 shadow-lg">
            <Zap className="h-3 w-3" />
          </div>
        )}

        {/* Availability indicator */}
        <div className="absolute top-3 right-3">
          {isAvailable ? (
            <div className="bg-emerald-500/90 backdrop-blur-sm text-white rounded-full p-1.5 shadow-lg">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          ) : (
            <div className="bg-red-500/90 backdrop-blur-sm text-white rounded-full p-1.5 shadow-lg">
              <XCircle className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Hover overlay with quick actions */}
        {isHovered && isAvailable && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-gray-800 border-0 shadow-lg"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-gray-800 border-0 shadow-lg"
              >
                <Star className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Out of stock overlay */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <Badge variant="destructive" className="bg-red-500/90 backdrop-blur-sm border-0 shadow-lg">
              <XCircle className="h-4 w-4 mr-1" />
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="p-5 relative">
        {/* Product name with gradient text */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price section with modern styling */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text text-transparent">
              ₵{product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 font-medium">{product.unit}</span>
          </div>
          
          {/* Fresh indicator */}
          <div className="flex items-center gap-1 text-emerald-600">
            <Leaf className="h-4 w-4" />
            <span className="text-xs font-medium">Fresh</span>
          </div>
        </div>

        {/* Quantity selector and add to cart */}
        {isAvailable && (
          <div className="space-y-3">
            {/* Quantity selector with modern styling */}
            <div className="flex items-center justify-center">
              <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 hover:bg-gray-100 rounded-none"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold text-gray-800">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 hover:bg-gray-100 rounded-none"
                  onClick={incrementQuantity}
                  disabled={quantity >= 99}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to cart button with modern styling */}
            <Button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full bg-gradient-to-r from-emerald-600 to-orange-500 hover:from-emerald-700 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold py-3 rounded-xl"
            >
              {isAdding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        )}

        {/* Out of stock button */}
        {!isAvailable && (
          <Button 
            disabled 
            className="w-full bg-gray-200 text-gray-500 border-0 rounded-xl py-3 font-semibold"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Out of Stock
          </Button>
        )}

        {/* Subtle sparkle effect on hover */}
        {isHovered && (
          <div className="absolute top-2 right-2 opacity-30">
            <Sparkles className="h-4 w-4 text-emerald-500 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};
