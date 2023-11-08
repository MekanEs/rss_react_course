import React, { FC, useState, ReactNode, useMemo } from 'react';

import { QueryContext } from './queryContext';
import { person } from '../../API/getItems/getItems';

interface QueryProviderProps {
  children: ReactNode;
}
export type personArr = person[];

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  const savedValue = localStorage.getItem('search_value') || '';
  const [searchValue, setSearchValue] = useState<string>(savedValue);
  const [inputValue, setInputValue] = useState<string>(savedValue);
  const [personArr, setPersonArr] = useState<personArr>([]);
  const [limit, setLimit] = useState<number>(
    Number(localStorage.getItem('limits')) || 10
  );
  const saveSearchValue = (value: string) => {
    localStorage.setItem('search_value', value);
    setSearchValue(value);
  };
  const saveLimit = (value: number) => {
    localStorage.setItem('limits', `${value}`);
    setLimit(value);
  };
  const defaultProviderValue = useMemo(
    () => ({
      searchValue,
      saveSearchValue,
      limit,
      saveLimit,
      inputValue,
      setInputValue,
      personArr,
      setPersonArr,
    }),
    [searchValue, limit, inputValue, personArr]
  );
  return (
    <QueryContext.Provider value={defaultProviderValue}>
      {children}
    </QueryContext.Provider>
  );
};

export default QueryProvider;
