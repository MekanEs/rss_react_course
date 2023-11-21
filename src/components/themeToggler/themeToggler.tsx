import React, { FC, useContext } from 'react';

import { ThemeContext } from '../../providers';
import { Theme } from '../../providers/themeProvider/themeContext';

import styles from './themeToggler.module.scss';

const ThemeToggler: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const themeToogle = () => {
    if (!setTheme) return;

    theme === Theme.LIGHT ? setTheme(Theme.DARK) : setTheme(Theme.LIGHT);
  };

  return (
    <button onClick={themeToogle} className={styles.themeToggler}>
      Theme
    </button>
  );
};

export default ThemeToggler;
