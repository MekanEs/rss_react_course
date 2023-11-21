import React, { FC, useState } from 'react';

import styles from './header.module.scss';
import Search from '../search/search';
import ThemeToggler from '../themeToggler/themeToggler';

const Header: FC = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  const handleClick = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error();
  }

  return (
    <header className={styles.header}>
      <Search />
      <ThemeToggler />
      <button className={styles.errorButton} onClick={handleClick}>
        error
      </button>
    </header>
  );
};

export default Header;
