import React, { FC, useState, ReactNode, useMemo } from 'react';

import { QueryContext } from './queryContext';

interface QueryProviderProps {
  children: ReactNode;
}

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  const savedValue = localStorage.getItem('search_value') || '';
  const [searchValue, setSearchValue] = useState<string>(savedValue);
  const [inputValue, setInputValue] = useState<string>(savedValue);
  const [limit, setLimit] = useState<number>(10);
  const saveSearchValue = (value: string) => {
    localStorage.setItem('search_value', value);
    setSearchValue(value);
  };
  const defaultProviderValue = useMemo(
    () => ({
      searchValue,
      saveSearchValue,
      limit,
      setLimit,
      inputValue,
      setInputValue,
    }),
    [searchValue, limit, inputValue]
  );
  return (
    <QueryContext.Provider value={defaultProviderValue}>
      {children}
    </QueryContext.Provider>
  );
};

export default QueryProvider;
