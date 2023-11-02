import { createContext } from 'react';

interface QueryContextProps {
  searchValue: string;
  limit: number;
  inputValue: string;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
  saveSearchValue?: (value: string) => void;
  setLimit?: React.Dispatch<React.SetStateAction<number>>;
}
export const QueryContext = createContext<QueryContextProps>({
  searchValue: '',
  limit: 10,
  saveSearchValue: () => {},
  inputValue: '',
});
