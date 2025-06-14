import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              Ghana Fresh Market
            </span>
          </a>
        </div>
        <div className="flex md:hidden">
          <span className="font-bold text-lg">Ghana Fresh Market</span>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button
            variant="ghost"
            className="relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
