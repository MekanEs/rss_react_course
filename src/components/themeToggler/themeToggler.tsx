import React, { FC, useContext } from 'react';

import { ThemeContext } from '../../providers';

import styles from './themeToggler.module.scss';
import { Theme } from '../../providers/themeProvider/themeContext';

const ThemeToggler: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const themeToogle = () => {
    if (setTheme) {
      if (theme === Theme.LIGHT) {
        setTheme(Theme.DARK);
      } else {
        setTheme(Theme.LIGHT);
      }
    }
  };
  return (
    <button onClick={themeToogle} className={styles.themeToggler}>
      Theme
    </button>
  );
};

export default ThemeToggler;
