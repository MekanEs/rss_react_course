import React, { FC, useState } from 'react';

import styles from './header.module.scss';
import Search from '../search/search';
import ThemeToggler from '../themeToggler/themeToggler';

const Header: FC = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  if (hasError) {
    throw new Error();
  }
  return (
    <header className={styles.header}>
      <Search />
      <ThemeToggler />
      <button
        className={styles.errorButton}
        onClick={() => {
          setHasError(true);
        }}
      >
        error
      </button>
    </header>
  );
};

export default Header;
