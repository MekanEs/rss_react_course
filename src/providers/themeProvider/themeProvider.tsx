import React, { useState, useMemo } from 'react';

import { Theme, ThemeContext } from './themeContext';
import { ThemeProviderProps } from './themeProvider.interface';

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const initTheme = localStorage.getItem('theme') as Theme;
  const [theme, setTheme] = useState<Theme>(initTheme || Theme.LIGHT);
  const setNewTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  };
  const defaultThemeValue = useMemo(
    () => ({ theme, setTheme: setNewTheme }),
    [theme]
  );
  return (
    <ThemeContext.Provider value={defaultThemeValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
