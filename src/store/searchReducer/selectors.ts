import { RootState } from '../store';

export const search = (state: RootState) => state.search;
export const personArray = (state: RootState) => search(state).personArray;
export const limit = (state: RootState) => search(state).limit;
export const SearchSelectors = { search, personArray, limit };
