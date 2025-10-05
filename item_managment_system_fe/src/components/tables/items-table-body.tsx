'use client';

import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  TableBody, 
  TableCell, 
  TableRow 
} from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { Item } from '@/types/item';

interface ItemsTableBodyProps {
  items: Item[];
  isLoading: boolean;
  isSearching: boolean;
  limit: number;
  onEditItem: (item: Item) => void;
  onDeleteItem: (item: Item) => void;
  isDeleting: boolean;
}

export const ItemsTableBody = memo(({
  items,
  isLoading,
  isSearching,
  limit,
  onEditItem,
  onDeleteItem,
  isDeleting,
}: ItemsTableBodyProps) => {
  if (isLoading || isSearching) {
    return (
      <TableBody>
        {Array.from({ length: limit }).map((_, i) => (
          <TableRow key={i} className="border-b border-gray-100">
            <TableCell className="py-4 md:py-6 px-3 md:px-6"><Skeleton className="h-4 md:h-5 w-24 md:w-32" /></TableCell>
            <TableCell className="py-4 md:py-6 px-3 md:px-6"><Skeleton className="h-4 md:h-5 w-16 md:w-20" /></TableCell>
            <TableCell className="py-4 md:py-6 px-3 md:px-6"><Skeleton className="h-4 md:h-5 w-12 md:w-16" /></TableCell>
            <TableCell className="py-4 md:py-6 px-3 md:px-6"><Skeleton className="h-4 md:h-5 w-8 md:w-12" /></TableCell>
            <TableCell className="py-4 md:py-6 px-3 md:px-6"><Skeleton className="h-5 md:h-6 w-12 md:w-16" /></TableCell>
            <TableCell className="py-4 md:py-6 px-3 md:px-6"><Skeleton className="h-6 md:h-8 w-16 md:w-20" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <TableBody>
      {items.map((item) => (
        <TableRow key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-150">
          <TableCell className="py-4 md:py-6 px-3 md:px-6">
            <div className="font-medium text-gray-900 text-sm md:text-base truncate max-w-[180px] md:max-w-none">
              {item.title || 'Untitled Item'}
            </div>
          </TableCell>
          <TableCell className="py-4 md:py-6 px-3 md:px-6">
            <span className="text-gray-700 text-xs md:text-sm bg-gray-100 px-2 md:px-3 py-1 rounded-full truncate max-w-[100px] md:max-w-none inline-block">
              {item.category || 'Uncategorized'}
            </span>
          </TableCell>
          <TableCell className="py-4 md:py-6 px-3 md:px-6">
            <span className="font-semibold text-gray-900 text-sm md:text-lg">
              ${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}
            </span>
          </TableCell>
          <TableCell className="py-4 md:py-6 px-3 md:px-6">
            <span className="text-gray-700 font-medium text-sm md:text-base">
              {typeof item.quantity === 'number' ? item.quantity : 0}
            </span>
          </TableCell>
          <TableCell className="py-4 md:py-6 px-3 md:px-6">
            <Badge 
              variant={item.status === 'active' ? 'default' : 'secondary'}
              className={`px-2 md:px-3 py-1 text-xs font-medium ${
                item.status === 'active' 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : item.status === 'inactive'
                  ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                  : 'bg-red-100 text-red-800 border-red-200'
              }`}
            >
              {item.status}
            </Badge>
          </TableCell>
          <TableCell className="py-4 md:py-6 px-3 md:px-6">
            <div className="flex items-center justify-center space-x-1 md:space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onEditItem(item)}
                className="h-8 w-8 md:h-9 md:w-9 p-0 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-150"
              >
                <Edit className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => onDeleteItem(item)}
                disabled={isDeleting}
                className="h-8 w-8 md:h-9 md:w-9 p-0 hover:bg-red-600 transition-all duration-150"
              >
                <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
});

ItemsTableBody.displayName = 'ItemsTableBody';
