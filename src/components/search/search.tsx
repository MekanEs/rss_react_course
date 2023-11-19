import React from 'react';

import styles from './search.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks';
import {
  setSaveValue,
  setSearchValue,
} from '../../store/searchReducer/searchSlice';

const Search: React.FC = () => {
  const { searchValue, savedValue } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  return (
    <>
      <input
        className={`${styles.searchInput}`}
        type="search"
        name="search"
        value={searchValue}
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
      />
      <button
        className={`${styles.searchButton}`}
        onClick={() => {
          if (searchValue !== savedValue) {
            nav('/');
            dispatch(setSaveValue(searchValue));
          }
        }}
      >
        Search
      </button>
    </>
  );
};

export default Search;
