import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itemsApi } from '../api/endpoints';
import { ItemQueryParams, CreateItemData, UpdateItemData } from '@/types/item';
import { toast } from 'sonner';

// Query keys
export const itemsKeys = {
  all: ['items'] as const,
  lists: () => [...itemsKeys.all, 'list'] as const,
  list: (params: ItemQueryParams) => [...itemsKeys.lists(), params] as const,
  details: () => [...itemsKeys.all, 'detail'] as const,
  detail: (id: string) => [...itemsKeys.details(), id] as const,
  categories: () => [...itemsKeys.all, 'categories'] as const,
  stats: () => [...itemsKeys.all, 'stats'] as const,
};

// Get items with pagination and search
export const useItems = (params: ItemQueryParams) => {
  return useQuery({
    queryKey: itemsKeys.list(params),
    queryFn: () => itemsApi.getItems(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get single item
export const useItem = (id: string) => {
  return useQuery({
    queryKey: itemsKeys.detail(id),
    queryFn: () => itemsApi.getItem(id),
    enabled: !!id,
  });
};

// Get categories
export const useCategories = () => {
  return useQuery({
    queryKey: itemsKeys.categories(),
    queryFn: () => itemsApi.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Get item statistics
export const useItemStats = () => {
  return useQuery({
    queryKey: itemsKeys.stats(),
    queryFn: () => itemsApi.getItemStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create item mutation
export const useCreateItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: itemsApi.createItem,
    onSuccess: (newItem) => {
      // Invalidate and refetch items list
      queryClient.invalidateQueries({ queryKey: itemsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: itemsKeys.stats() });
      toast.success('Item created successfully');
    },
    onError: (error) => {
      console.error('Create item error:', error);
      // Error handling is done in axios interceptor
    },
  });
};

// Update item mutation
export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateItemData }) => 
      itemsApi.updateItem(id, data),
    onSuccess: (updatedItem, { id }) => {
      // Update the specific item in cache
      queryClient.setQueryData(itemsKeys.detail(id), updatedItem);
      // Invalidate items list
      queryClient.invalidateQueries({ queryKey: itemsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: itemsKeys.stats() });
      toast.success('Item updated successfully');
    },
    onError: (error) => {
      console.error('Update item error:', error);
    },
  });
};

// Delete item mutation
export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: itemsApi.deleteItem,
    onSuccess: (_, deletedId) => {
      // Remove item from cache
      queryClient.removeQueries({ queryKey: itemsKeys.detail(deletedId) });
      // Invalidate items list
      queryClient.invalidateQueries({ queryKey: itemsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: itemsKeys.stats() });
      toast.success('Item deleted successfully');
    },
    onError: (error) => {
      console.error('Delete item error:', error);
    },
  });
};
