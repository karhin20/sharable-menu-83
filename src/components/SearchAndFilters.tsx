
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
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

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setLocalSearch("");
    onSearchChange("");
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Search Bar */}
      <div className="relative">
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

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "secondary"}
            className="cursor-pointer px-3 py-1 text-sm"
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </Badge>
        ))}
      </div>

      {/* Active Filters Display */}
      {(selectedCategory !== 'all' || searchTerm) && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Active filters:</span>
          {selectedCategory !== 'all' && (
            <Badge variant="outline" className="gap-1">
              {categories.find(c => c.id === selectedCategory)?.name}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onCategoryChange('all')}
              />
            </Badge>
          )}
          {searchTerm && (
            <Badge variant="outline" className="gap-1">
              "{searchTerm}"
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={clearSearch}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
