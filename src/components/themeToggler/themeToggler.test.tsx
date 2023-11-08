import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ThemeToggler from './themeToggler';
import { ThemeContext } from '../../providers';
import { Theme } from '../../providers/themeProvider/themeContext';

describe('ThemeToggler', () => {
  it('renders Component', () => {
    render(<ThemeToggler />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Theme')).toBeInTheDocument();
  });
  it('click handled', () => {
    const setTheme = vi.fn();
    render(
      <ThemeContext.Provider value={{ theme: Theme.LIGHT, setTheme }}>
        <ThemeToggler />
      </ThemeContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(setTheme).toBeCalled();
  });
  it('handle with dark value', () => {
    const setTheme = vi.fn();
    render(
      <ThemeContext.Provider value={{ theme: Theme.LIGHT, setTheme }}>
        <ThemeToggler />
      </ThemeContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(setTheme).toBeCalledWith(Theme.DARK);
  });
  it('handle with light value', () => {
    const setTheme = vi.fn();
    render(
      <ThemeContext.Provider value={{ theme: Theme.DARK, setTheme }}>
        <ThemeToggler />
      </ThemeContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(setTheme).toBeCalledWith(Theme.LIGHT);
  });
  it('not handled if setTheme is undefined', () => {
    const setTheme = vi.fn();
    render(
      <ThemeContext.Provider
        value={{ theme: Theme.LIGHT, setTheme: undefined }}
      >
        <ThemeToggler />
      </ThemeContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(setTheme).not.toBeCalled();
  });
});
