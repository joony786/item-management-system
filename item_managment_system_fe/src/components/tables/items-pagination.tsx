'use client';

import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ItemsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: string) => void;
}

export const ItemsPagination = ({
  currentPage,
  totalPages,
  totalItems,
  limit,
  onPageChange,
  onPageSizeChange,
}: ItemsPaginationProps) => {
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
      {/* Mobile Layout */}
      <div className="block md:hidden space-y-4">
        {/* Page size selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="text-xs font-medium text-gray-700">Rows:</p>
            <Select value={limit.toString()} onValueChange={onPageSizeChange}>
              <SelectTrigger className="w-16 h-8 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-xs text-gray-600">
            <span className="font-medium text-gray-900">{startItem}-{endItem}</span>
            <span className="text-gray-500"> of </span>
            <span className="font-semibold text-gray-900">{totalItems}</span>
          </div>
        </div>
        
        {/* Mobile pagination - simplified */}
        <div className="flex items-center justify-center space-x-2">
          <PaginationPrevious 
            onClick={() => onPageChange(currentPage - 1)}
            className={`h-8 px-3 rounded-lg transition-all duration-150 text-xs ${
              currentPage <= 1 
                ? 'pointer-events-none opacity-50 bg-gray-100 text-gray-400' 
                : 'cursor-pointer hover:bg-blue-50 hover:text-blue-700 border border-gray-300 hover:border-blue-300'
            }`}
          />
          
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-600">Page</span>
            <span className="text-sm font-medium text-gray-900">{currentPage}</span>
            <span className="text-xs text-gray-600">of {totalPages}</span>
          </div>
          
          <PaginationNext 
            onClick={() => onPageChange(currentPage + 1)}
            className={`h-8 px-3 rounded-lg transition-all duration-150 text-xs ${
              currentPage >= totalPages 
                ? 'pointer-events-none opacity-50 bg-gray-100 text-gray-400' 
                : 'cursor-pointer hover:bg-blue-50 hover:text-blue-700 border border-gray-300 hover:border-blue-300'
            }`}
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <p className="text-sm font-medium text-gray-700">Rows per page:</p>
            <Select value={limit.toString()} onValueChange={onPageSizeChange}>
              <SelectTrigger className="w-20 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">
              Showing {startItem} to {endItem}
            </span>
            <span className="text-gray-500"> of </span>
            <span className="font-semibold text-gray-900">{totalItems} items</span>
          </div>
        </div>
      
        <Pagination>
          <PaginationContent className="gap-2">
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange(currentPage - 1)}
                className={`h-10 px-4 rounded-lg transition-all duration-150 ${
                  currentPage <= 1 
                    ? 'pointer-events-none opacity-50 bg-gray-100 text-gray-400' 
                    : 'cursor-pointer hover:bg-blue-50 hover:text-blue-700 border border-gray-300 hover:border-blue-300'
                }`}
              />
            </PaginationItem>
            
            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => onPageChange(pageNumber)}
                    isActive={currentPage === pageNumber}
                    className={`h-10 w-10 rounded-lg transition-all duration-150 cursor-pointer ${
                      currentPage === pageNumber
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'hover:bg-blue-50 hover:text-blue-700 border border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            {totalPages > 5 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis className="h-10 w-10 flex items-center justify-center text-gray-500" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => onPageChange(totalPages)}
                    isActive={currentPage === totalPages}
                    className={`h-10 w-10 rounded-lg transition-all duration-150 cursor-pointer ${
                      currentPage === totalPages
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'hover:bg-blue-50 hover:text-blue-700 border border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange(currentPage + 1)}
                className={`h-10 px-4 rounded-lg transition-all duration-150 ${
                  currentPage >= totalPages 
                    ? 'pointer-events-none opacity-50 bg-gray-100 text-gray-400' 
                    : 'cursor-pointer hover:bg-blue-50 hover:text-blue-700 border border-gray-300 hover:border-blue-300'
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
