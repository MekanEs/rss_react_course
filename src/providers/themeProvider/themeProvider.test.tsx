import React, { useContext } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ThemeProvider from './themeProvider';
import { ThemeContext } from '..';
import { Theme } from './themeContext';
const ThemeTest: React.FC = ({}) => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <div>{theme}</div>
      <button onClick={() => setTheme && setTheme(Theme.LIGHT)}>toggle</button>
    </>
  );
};
describe('ThemeyProvider', () => {
  it('renders child', () => {
    render(
      <ThemeProvider>
        <div>test</div>
      </ThemeProvider>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });
  it('get theme from localStorage', () => {
    localStorage.setItem('theme', 'test');
    render(
      <ThemeProvider>
        <ThemeTest />
      </ThemeProvider>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });
  it('toggle theme in localStorage', () => {
    localStorage.setItem('theme', 'test');
    render(
      <ThemeProvider>
        <ThemeTest />
      </ThemeProvider>
    );
    const button = screen.getByText('toggle');
    fireEvent.click(button);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
