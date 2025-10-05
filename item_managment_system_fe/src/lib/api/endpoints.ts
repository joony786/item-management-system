import apiClient from './client';
import { Item, CreateItemData, UpdateItemData, ItemQueryParams, PaginatedResponse, ItemStats } from '@/types/item';

// Items API endpoints
export const itemsApi = {
  // Get all items with pagination and search
  getItems: (params: ItemQueryParams) => 
    apiClient.get<PaginatedResponse<Item>>('/items', { params }),
  
  // Get single item
  getItem: (id: string) => 
    apiClient.get<Item>(`/items/${id}`),
  
  // Create new item
  createItem: (data: CreateItemData) => 
    apiClient.post<Item>('/items', data),
  
  // Update item
  updateItem: (id: string, data: UpdateItemData) => 
    apiClient.patch<Item>(`/items/${id}`, data),
  
  // Delete item
  deleteItem: (id: string) => 
    apiClient.delete(`/items/${id}`),
  
  // Get categories
  getCategories: () => 
    apiClient.get<string[]>('/items/categories'),
  
  // Get item statistics
  getItemStats: () => 
    apiClient.get<ItemStats>('/items/stats'),
};
