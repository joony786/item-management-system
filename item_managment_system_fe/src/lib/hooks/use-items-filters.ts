'use client';

import { useCallback, useMemo } from 'react';
import { useQueryParams } from './use-query-params';
import { useDebouncedSearch } from './use-debounced-search';

export const useItemsFilters = () => {
  const { queryParams, updateQueryParams, clearFilters } = useQueryParams();
  const { searchTerm, setSearchTerm, debouncedSearchTerm, isSearching } = useDebouncedSearch(
    queryParams.search || ''
  );

  const handleSearchChange = useCallback((searchTerm: string) => {
    setSearchTerm(searchTerm);
    updateQueryParams({ search: searchTerm });
  }, [setSearchTerm, updateQueryParams]);

  const handleSortChange = useCallback((value: string) => {
    updateQueryParams({ sortBy: value as 'title' | 'price' | 'created_at' });
  }, [updateQueryParams]);

  const handleSortOrderChange = useCallback((value: string) => {
    updateQueryParams({ sortOrder: value as 'asc' | 'desc' });
  }, [updateQueryParams]);

  const handlePageChange = useCallback((newPage: number) => {
    updateQueryParams({ page: newPage });
  }, [updateQueryParams]);

  const handlePageSizeChange = useCallback((newPageSize: string) => {
    updateQueryParams({ 
      limit: Number(newPageSize),
      page: 1 
    });
  }, [updateQueryParams]);

  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    clearFilters();
  }, [setSearchTerm, clearFilters]);

  const hasActiveFilters = useMemo(() => {
    return !!(
      queryParams.search ||
      queryParams.category ||
      queryParams.status ||
      queryParams.page !== 1 ||
      queryParams.limit !== 10 ||
      queryParams.sortBy !== 'created_at' ||
      queryParams.sortOrder !== 'desc'
    );
  }, [queryParams]);

  return {
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
  };
};
