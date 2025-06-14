
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    
    onAddToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} has been added to your order.`,
    });
    setQuantity(1);
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 99));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      tubers: "bg-orange-100 text-orange-800",
      grains: "bg-yellow-100 text-yellow-800",
      vegetables: "bg-green-100 text-green-800",
      oils: "bg-purple-100 text-purple-800",
      fruits: "bg-red-100 text-red-800",
      legumes: "bg-blue-100 text-blue-800",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 animate-fade-in ${!product.inStock ? 'opacity-60' : ''}`}>
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <Badge 
          className={`absolute top-2 left-2 ${getCategoryColor(product.category)}`}
        >
          {product.category}
        </Badge>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1 text-sm">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary">
              ₵{product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 ml-1">{product.unit}</span>
          </div>
          {product.inStock ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={decrementQuantity}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleAddToCart}>Add to Cart</Button>
            </div>
          ) : (
            <Button disabled>Out of Stock</Button>
          )}
        </div>
      </div>
    </div>
  );
};
