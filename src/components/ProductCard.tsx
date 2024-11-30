import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
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
    onAddToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} has been added to your order.`,
    });
    setQuantity(1); // Reset quantity after adding to cart
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 99));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 animate-fade-in">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
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
            <Button onClick={handleAddToCart}>Add to Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
};