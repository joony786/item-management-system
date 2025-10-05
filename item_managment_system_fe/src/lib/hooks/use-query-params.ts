'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { ItemQueryParams } from '@/types/item';

export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParams = useMemo((): ItemQueryParams => {
    return {
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10,
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      status: searchParams.get('status') || undefined,
      sortBy: (searchParams.get('sortBy') as 'title' | 'price' | 'created_at') || 'created_at',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
    };
  }, [searchParams]);

  const updateQueryParams = useCallback((updates: Partial<ItemQueryParams>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });

    // Reset to page 1 when changing search or filters
    if (updates.search !== undefined || updates.category !== undefined || updates.status !== undefined) {
      params.set('page', '1');
    }

    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  const clearFilters = useCallback(() => {
    // Navigate to the current path without any query parameters
    router.push(window.location.pathname);
  }, [router]);

  return {
    queryParams,
    updateQueryParams,
    clearFilters,
  };
};
