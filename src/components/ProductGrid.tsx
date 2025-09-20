import { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Sparkles, Grid3X3 } from "lucide-react";
import { AnimateOnScroll } from "./AnimateOnScroll";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  return (
    <div className="relative">
      {/* Grid header with decorative elements */}
      <AnimateOnScroll className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/50 shadow-lg">
          <Grid3X3 className="h-5 w-5 text-emerald-600" />
          <span className="text-lg font-semibold text-gray-700">Fresh Products</span>
          <Sparkles className="h-4 w-4 text-orange-500 animate-pulse" />
        </div>
      </AnimateOnScroll>

      {/* Enhanced grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {products.map((product, index) => (
          <AnimateOnScroll key={product.id} delay={index * 50}>
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
            />
          </AnimateOnScroll>
        ))}
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto border border-white/50 shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Grid3X3 className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        </div>
      )}
    </div>
  );
};