import React from 'react';

import styles from './search.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/reduxHooks';
import {
  setSaveValue,
  setSearchValue,
} from '../../store/searchReducer/searchSlice';
import { HandleChangeType, HandleClickType } from '../types/common';
import { SearchSelectors } from '../../store/searchReducer/selectors';

const Search: React.FC = () => {
  const { searchValue, savedValue } = useAppSelector(SearchSelectors.search);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const handleChange: HandleChangeType = (e) =>
    dispatch(setSearchValue(e.target.value));

  const handleClick: HandleClickType = () => {
    if (searchValue !== savedValue) {
      nav('/');
      dispatch(setSaveValue(searchValue));
    }
  };

  return (
    <>
      <input
        className={`${styles.searchInput}`}
        type="search"
        name="search"
        value={searchValue}
        onChange={handleChange}
      />
      <button className={`${styles.searchButton}`} onClick={handleClick}>
        Search
      </button>
    </>
  );
};

export default Search;
