import React, { useState, useMemo, ReactNode } from 'react';

import { Theme, ThemeContext } from './themeContext';

interface ThemeProviderProps {
  children: ReactNode;
}
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const defaultThemeValue = useMemo(() => ({ theme, setTheme }), [theme]);
  return (
    <ThemeContext.Provider value={defaultThemeValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
