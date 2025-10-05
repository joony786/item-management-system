export enum ItemStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISCONTINUED = 'discontinued',
}

export interface Item {
  id: string;
  title: string;
  description?: string;
  category: string;
  price: number;
  quantity: number;
  tags: string[];
  status: ItemStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemData {
  title: string;
  description?: string;
  category: string;
  price?: number;
  quantity?: number;
  tags?: string[];
  status: ItemStatus;
}

export interface UpdateItemData {
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  quantity?: number;
  tags?: string[];
  status?: ItemStatus;
}

export interface ItemQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  sortBy?: 'title' | 'price' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface ItemStats {
  totalItems: number;
  activeItems: number;
  totalValue: number;
  categories: number;
}
