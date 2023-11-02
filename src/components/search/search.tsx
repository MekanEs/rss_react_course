import React, { useContext } from 'react';

import { QueryContext } from '../../providers';

import styles from './search.module.scss';

const Search: React.FC = () => {
  const { saveSearchValue, inputValue, setInputValue } =
    useContext(QueryContext);

  return (
    <>
      <input
        className={`${styles.searchInput}`}
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue && setInputValue(e.target.value)}
      />
      <button
        className={`${styles.searchButton}`}
        onClick={() => saveSearchValue && saveSearchValue(inputValue)}
      >
        Search
      </button>
    </>
  );
};

export default Search;
