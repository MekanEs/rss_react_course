import React, { useContext } from 'react';

import { QueryContext } from '../../providers';

import styles from './search.module.scss';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
  const { inputValue, saveSearchValue, setInputValue, searchValue } =
    useContext(QueryContext);
  const nav = useNavigate();
  return (
    <>
      <input
        className={`${styles.searchInput}`}
        type="search"
        name="search"
        value={inputValue}
        onChange={(e) => setInputValue && setInputValue(e.target.value)}
      />
      <button
        className={`${styles.searchButton}`}
        onClick={() => {
          if (inputValue !== searchValue) {
            nav('/');
            saveSearchValue && saveSearchValue(inputValue);
          }
        }}
      >
        Search
      </button>
    </>
  );
};

export default Search;
