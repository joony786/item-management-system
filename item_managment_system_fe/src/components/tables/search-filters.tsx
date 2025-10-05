'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X, Plus } from 'lucide-react';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOrder: string;
  onSortOrderChange: (value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onCreateItem: () => void;
}

export const SearchFilters = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  hasActiveFilters,
  onClearFilters,
  onCreateItem,
}: SearchFiltersProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
      {/* Mobile Layout */}
      <div className="block md:hidden space-y-4">
        {/* Search Input - Full width on mobile */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-10 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>
        
        {/* Sort Controls - Stacked on mobile */}
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="flex-1 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="created_at">Date Created</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortOrder} onValueChange={onSortOrderChange}>
            <SelectTrigger className="w-24 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Asc</SelectItem>
              <SelectItem value="desc">Desc</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Action Buttons - Full width on mobile */}
        <div className="flex gap-2">
          {hasActiveFilters && (
            <Button 
              onClick={onClearFilters} 
              variant="outline" 
              className="flex-1 h-10 px-4 border-gray-300 hover:bg-gray-50 text-sm"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
          <Button 
            onClick={onCreateItem} 
            className="flex-1 h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between gap-6">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-48 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="created_at">Date Created</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortOrder} onValueChange={onSortOrderChange}>
              <SelectTrigger className="w-36 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <Button 
              onClick={onClearFilters} 
              variant="outline" 
              size="lg"
              className="flex items-center gap-2 h-12 px-6 border-gray-300 hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
          <Button 
            onClick={onCreateItem} 
            className="flex items-center gap-2 h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            Add Item
          </Button>
        </div>
      </div>
    </div>
  );
};
