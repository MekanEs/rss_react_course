import { createContext } from 'react';
import { personArr } from './queryProvider';

interface QueryContextProps {
  searchValue: string;
  limit: number;
  inputValue: string;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
  saveSearchValue?: (value: string) => void;
  setLimit?: (value: number) => void;
  personArr: personArr;
  setPersonArr?: React.Dispatch<React.SetStateAction<personArr>>;
}
export const QueryContext = createContext<QueryContextProps>({
  searchValue: '',
  limit: Number(localStorage.getItem('limits')) || 10,
  saveSearchValue: () => {},
  inputValue: '',
  personArr: [],
});
