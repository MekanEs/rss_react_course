import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { personArr } from '../../providers/queryProvider/queryProvider';

interface ISearchSlice {
  searchValue: string;
  savedValue: string;
  limit: number;
  personArr: personArr;
  getItemsPending: boolean;
  getPersonPending: boolean;
}

const initialState: ISearchSlice = {
  searchValue: localStorage.getItem('search_value') || '',
  savedValue: localStorage.getItem('search_value') || '',
  limit: Number(localStorage.getItem('limits')) || 10,
  personArr: [],
  getItemsPending: false,
  getPersonPending: false,
};
const SearchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      return { ...state, searchValue: action.payload };
    },
    setSaveValue: (state, action: PayloadAction<string>) => {
      localStorage.setItem('search_value', action.payload);
      return { ...state, savedValue: action.payload };
    },
    saveLimit: (state, action: PayloadAction<number>) => {
      localStorage.setItem('limits', `${action.payload}`);
      return { ...state, limit: action.payload };
    },
    setPersonArr: (state, action: PayloadAction<personArr>) => {
      return { ...state, personArr: action.payload };
    },
    setGetItemsPending: (state, action: PayloadAction<boolean>) => {
      return { ...state, getItemsPending: action.payload };
    },
    setGetPersonPending: (state, action: PayloadAction<boolean>) => {
      return { ...state, getPersonPending: action.payload };
    },
  },
});

export const {
  setSearchValue,
  setSaveValue,
  saveLimit,
  setPersonArr,
  setGetItemsPending,
  setGetPersonPending,
} = SearchSlice.actions;
export default SearchSlice.reducer;
