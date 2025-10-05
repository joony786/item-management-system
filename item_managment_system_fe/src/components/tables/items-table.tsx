'use client';

import { useState } from 'react';
import { useItems, useDeleteItem } from '@/lib/hooks/use-items';
import { useItemsFilters } from '@/lib/hooks/use-items-filters';
import { 
  Table, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ItemDialog } from '@/components/dialogs/item-dialog';
import { DeleteConfirmationDialog } from '@/components/dialogs/delete-confirmation-dialog';
import { SearchFilters } from './search-filters';
import { ItemsTableBody } from './items-table-body';
import { ItemsPagination } from './items-pagination';
import { Item } from '@/types/item';

export const ItemsTable = () => {
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);
  
  // Delete confirmation dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | undefined>(undefined);
  
  // Use the new filters hook
  const {
    queryParams,
    searchTerm,
    debouncedSearchTerm,
    isSearching,
    hasActiveFilters,
    handleSearchChange,
    handleSortChange,
    handleSortOrderChange,
    handlePageChange,
    handlePageSizeChange,
    handleClearFilters,
  } = useItemsFilters();
  
  const { data: itemsData, isLoading, error } = useItems({
    ...queryParams,
    search: debouncedSearchTerm,
  });
  
  const deleteItemMutation = useDeleteItem();
  
  const handleDelete = (item: Item) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      deleteItemMutation.mutate(itemToDelete.id);
      setIsDeleteDialogOpen(false);
      setItemToDelete(undefined);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setItemToDelete(undefined);
  };

  const handleCreateItem = () => {
    setEditingItem(undefined);
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(undefined);
  };
  
  if (error) {
    return <div>Error loading items</div>;
  }
  
  const totalPages = itemsData?.data.pagination.totalPages || 0;
  const items = itemsData?.data.data || [];
  
  return (
    <div className="space-y-4 md:space-y-8 p-4 md:p-6 bg-gray-50/30 min-h-screen">
      {/* Search and Filters */}
      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        sortBy={queryParams.sortBy || 'created_at'}
        onSortChange={handleSortChange}
        sortOrder={queryParams.sortOrder || 'desc'}
        onSortOrderChange={handleSortOrderChange}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={handleClearFilters}
        onCreateItem={handleCreateItem}
      />
      
      {/* Table - Responsive wrapper */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Mobile: Horizontal scroll */}
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50/50">
              <TableRow className="border-b border-gray-200 hover:bg-gray-50/50">
                <TableHead className="font-semibold text-gray-900 py-3 md:py-4 px-3 md:px-6 text-xs md:text-sm min-w-[200px]">Title</TableHead>
                <TableHead className="font-semibold text-gray-900 py-3 md:py-4 px-3 md:px-6 text-xs md:text-sm min-w-[120px]">Category</TableHead>
                <TableHead className="font-semibold text-gray-900 py-3 md:py-4 px-3 md:px-6 text-xs md:text-sm min-w-[80px]">Price</TableHead>
                <TableHead className="font-semibold text-gray-900 py-3 md:py-4 px-3 md:px-6 text-xs md:text-sm min-w-[80px]">Quantity</TableHead>
                <TableHead className="font-semibold text-gray-900 py-3 md:py-4 px-3 md:px-6 text-xs md:text-sm min-w-[100px]">Status</TableHead>
                <TableHead className="font-semibold text-gray-900 py-3 md:py-4 px-3 md:px-6 text-xs md:text-sm text-center min-w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <ItemsTableBody
              items={items}
              isLoading={isLoading}
              isSearching={isSearching}
              limit={queryParams.limit || 10}
              onEditItem={handleEditItem}
              onDeleteItem={handleDelete}
              isDeleting={deleteItemMutation.isPending}
            />
          </Table>
        </div>
      </div>
      
      {/* Pagination */}
      <ItemsPagination
        currentPage={queryParams.page || 1}
        totalPages={totalPages}
        totalItems={itemsData?.data.pagination.totalItems || 0}
        limit={queryParams.limit || 10}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
      
      {/* Item Dialog */}
      <ItemDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        item={editingItem}
      />
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Item"
        description={`Are you sure you want to delete "${itemToDelete?.title}"? This action cannot be undone.`}
        isLoading={deleteItemMutation.isPending}
      />
    </div>
  );
};
