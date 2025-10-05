'use client';

import { useCallback } from 'react';

interface UseNumberInputProps {
  onChange: (value: number | undefined) => void;
  parseFunction?: (value: string) => number;
}

export const useNumberInput = ({ 
  onChange, 
  parseFunction = parseFloat 
}: UseNumberInputProps) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value === '' ? undefined : parseFunction(value));
  }, [onChange, parseFunction]);

  const getValue = useCallback((value: number | undefined) => {
    return value ?? '';
  }, []);

  return {
    handleChange,
    getValue,
  };
};
