'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

export const useDebouncedSearch = (initialValue: string = '', delay: number = 300) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedSearchTerm] = useDebounce(searchTerm, delay);
  
  // Update search term when initial value changes (e.g., from URL)
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);
  
  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    isSearching: searchTerm !== debouncedSearchTerm,
  };
};
