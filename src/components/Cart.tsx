import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { Plus, Minus, Trash2, Loader2, Send, ShoppingCart, Sparkles, Leaf } from "lucide-react";
import { useState } from "react";

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onPlaceOrder: () => void;
  isPlacingOrder: boolean;
}

export const Cart = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem, 
  onUpdateQuantity,
  onPlaceOrder,
  isPlacingOrder,
}: CartProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Generate fallback image for cart items
  const getFallbackImage = (category: string) => {
    const fallbackImages = {
      tubers: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRkZCNzAwIi8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+UlDwvdGV4dD4KPC9zdmc+Cg==",
      grains: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRkZEMDAwIi8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+GvjwvdGV4dD4KPC9zdmc+Cg==",
      vegetables: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMDBDNzAwIi8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+SsDwvdGV4dD4KPC9zdmc+Cg==",
      oils: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjOUM0M0Y2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+StjwvdGV4dD4KPC9zdmc+Cg==",
      fruits: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRkY0NDQ0Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+SlDwvdGV4dD4KPC9zdmc+Cg==",
      legumes: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzM5OUZGIi8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+SuDwvdGV4dD4KPC9zdmc+Cg==",
    };
    return fallbackImages[category as keyof typeof fallbackImages] || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5OaPC90ZXh0Pgo8L3N2Zz4K";
  };

  const incrementQuantity = (productId: string, currentQuantity: number) => {
    onUpdateQuantity(productId, Math.min(currentQuantity + 1, 99));
  };

  const decrementQuantity = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      onUpdateQuantity(productId, currentQuantity - 1);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col bg-gradient-to-br from-emerald-50 via-white to-orange-50">
        <SheetHeader className="bg-emerald-600 text-white -mx-6 -mt-6 px-6 py-4 rounded-b-2xl">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6" />
            <SheetTitle className="text-xl font-bold">Your Cart</SheetTitle>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {totalItems} items
            </Badge>
          </div>
        </SheetHeader>
        
        {/* Make the middle section scrollable and flexible */}
        <div className="flex-1 overflow-y-auto -mx-6 px-6 mt-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto border border-white/50 shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
                <p className="text-gray-600">Add some fresh products to get started!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Desktop Layout */}
                  <div className="hidden sm:flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <img
                        src={item.image_url || getFallbackImage(item.category || '')}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl"
                        onError={(e) => {
                          e.currentTarget.src = getFallbackImage(item.category || '');
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-500">
                            ₵{item.price.toFixed(2)} {item.unit}
                          </p>
                          <div className="flex items-center gap-1 text-emerald-600">
                            <Leaf className="h-3 w-3" />
                            <span className="text-xs font-medium">Fresh</span>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-emerald-600">
                          Total: ₵{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 hover:bg-gray-100 rounded-none"
                          onClick={() => decrementQuantity(item.id, item.quantity)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center text-sm font-semibold text-gray-800">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 hover:bg-gray-100 rounded-none"
                          onClick={() => incrementQuantity(item.id, item.quantity)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="sm:hidden">
                    <div className="flex items-start space-x-3 mb-3">
                      <img
                        src={item.image_url || getFallbackImage(item.category || '')}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = getFallbackImage(item.category || '');
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-gray-800">{item.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-500">
                            ₵{item.price.toFixed(2)} {item.unit}
                          </p>
                          <div className="flex items-center gap-1 text-emerald-600">
                            <Leaf className="h-3 w-3" />
                            <span className="text-xs font-medium">Fresh</span>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-emerald-600">
                          Total: ₵{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 hover:bg-gray-100 rounded-none"
                          onClick={() => decrementQuantity(item.id, item.quantity)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center text-sm font-semibold text-gray-800">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 hover:bg-gray-100 rounded-none"
                          onClick={() => incrementQuantity(item.id, item.quantity)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <SheetFooter className="mt-auto bg-white/80 backdrop-blur-sm border-t border-white/50 -mx-6 -mb-6 px-6 py-4">
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-600" />
                <span className="font-bold text-lg text-gray-800">Subtotal</span>
              </div>
              <span className="text-2xl font-bold text-emerald-600">
                ₵{total.toFixed(2)}
              </span>
            </div>
            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold py-3 rounded-xl" 
              size="lg" 
              onClick={onPlaceOrder}
              disabled={items.length === 0 || isPlacingOrder}
            >
              {isPlacingOrder ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Confirm & Place Order
                </>
              )}
            </Button>
            <p className="text-xs text-center text-gray-500 mt-3 bg-gray-50 rounded-lg py-2 px-3">
              You will be redirected to WhatsApp to confirm delivery details and payment.
            </p>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
