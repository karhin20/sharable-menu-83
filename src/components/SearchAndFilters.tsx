
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Wheat, Carrot, Leaf, Droplet, Apple, Bean, ShoppingBasket, SlidersHorizontal } from "lucide-react";
import { categories } from "@/data/products";

interface SearchAndFiltersProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
  searchTerm: string;
}

export const SearchAndFilters = ({
  onSearchChange,
  onCategoryChange,
  selectedCategory,
  searchTerm,
}: SearchAndFiltersProps) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setLocalSearch("");
    onSearchChange("");
  };

  const getCategoryIcon = (category: string) => {
    const iconProps = { className: "h-4 w-4 mr-2" };
    const icons: { [key: string]: React.ElementType } = {
      all: ShoppingBasket,
      tubers: Carrot,
      grains: Wheat,
      vegetables: Leaf,
      oils: Droplet,
      fruits: Apple,
      legumes: Bean,
    };
    const IconComponent = icons[category] || ShoppingBasket;
    return <IconComponent {...iconProps} />;
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Search Bar */}
      <div className="flex gap-2 items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search products..."
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {localSearch && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          variant={filtersVisible ? 'default' : 'outline'}
          onClick={() => setFiltersVisible(!filtersVisible)}
          className={`shrink-0 transition-all duration-300 ${
            filtersVisible
              ? 'bg-emerald-600 text-white border-transparent shadow-lg hover:opacity-95'
              : ''
          }`}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Category Filters */}
      {filtersVisible && (
        <div className="animate-in fade-in-0 slide-in-from-top-2 duration-300 animate-out fade-out-0 slide-out-to-top-2">
          <div className="flex flex-wrap gap-3">
            <Badge
              key="all"
              className={`cursor-pointer px-4 py-2 text-sm flex items-center transition-all duration-300 rounded-full ${
                selectedCategory === 'all' 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent shadow-lg' 
                  : 'bg-white/80 hover:bg-white text-gray-800'
              }`}
              onClick={() => onCategoryChange('all')}
            >
              {getCategoryIcon('all')}
              All
            </Badge>
            {categories.filter(category => category.id !== 'all').map((category) => (
              <Badge
                key={category.id}
                className={`cursor-pointer px-4 py-2 text-sm flex items-center transition-all duration-300 rounded-full ${
                  selectedCategory === category.id 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent shadow-lg' 
                    : 'bg-white/80 hover:bg-white text-gray-800'
                }`}
                onClick={() => onCategoryChange(category.id)}
              >
                {getCategoryIcon(category.id)}
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(() => {
        const activeCategory = selectedCategory !== 'all' ? categories.find(c => c.id === selectedCategory) : null;
        const hasActiveFilters = activeCategory || searchTerm;

        if (!hasActiveFilters) return null;

        return (
          <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-3 animate-in fade-in-0 duration-300">
            <div className="flex items-center justify-between flex-wrap gap-y-2">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm font-semibold text-gray-700 mr-2">Active filters:</span>
                {activeCategory && (
                  <Badge variant="outline" className="gap-1.5 pl-2 pr-1 py-1 bg-white shadow-sm font-normal">
                    {getCategoryIcon(activeCategory.id)}
                    {activeCategory.name}
                    <button onClick={() => onCategoryChange('all')} className="rounded-full p-0.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {searchTerm && (
                  <Badge variant="outline" className="gap-1.5 pl-2 pr-1 py-1 bg-white shadow-sm font-normal">
                    <Search className="h-3 w-3" />
                    <span className="max-w-[150px] truncate">"{searchTerm}"</span>
                    <button onClick={clearSearch} className="rounded-full p-0.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100/50 h-auto px-2 py-1"
                onClick={() => {
                  onCategoryChange('all');
                  clearSearch();
                }}
              >
                Clear all
              </Button>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
