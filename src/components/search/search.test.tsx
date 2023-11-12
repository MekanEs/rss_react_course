import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Search from './search';
import { QueryContext, QueryProvider } from '../../providers';

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockUsedNavigate,
}));

describe('Search', () => {
  it('renders Component', () => {
    render(
      <QueryContext.Provider
        value={{
          searchValue: '',
          limit: 10,
          saveSearchValue: () => {},
          inputValue: 'test',
          personArr: [],
        }}
      >
        <Search />
      </QueryContext.Provider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();

    expect(screen.getByText('Search')).toBeInTheDocument();

    expect(screen.getByDisplayValue('test')).toHaveAttribute('name', 'search');
  });
  it('handle events', () => {
    const setInputValue = vi.fn();
    const saveSearchValue = vi.fn();
    render(
      <QueryContext.Provider
        value={{
          searchValue: '11',
          limit: 10,
          saveSearchValue,
          inputValue: 'test',
          personArr: [],
          setInputValue,
        }}
      >
        <Search />
      </QueryContext.Provider>
    );

    const input = screen.getByDisplayValue('test');
    fireEvent.change(input, { target: { value: '23' } });
    expect(setInputValue).toBeCalled();

    const button = screen.getByText('Search');
    fireEvent.click(button);
    expect(saveSearchValue).toBeCalled();
  });
  it("conditionally don't handle click", () => {
    const setInputValue = vi.fn();
    const saveSearchValue = vi.fn();
    render(
      <QueryContext.Provider
        value={{
          searchValue: 'test',
          limit: 10,
          saveSearchValue,
          inputValue: 'test',
          personArr: [],
          setInputValue,
        }}
      >
        <Search />
      </QueryContext.Provider>
    );

    const button = screen.getByText('Search');
    fireEvent.click(button);
    expect(saveSearchValue).not.toBeCalled();
  });
  it('component retrieves the value from the local storage', () => {
    localStorage.setItem('search_value', 'test');
    render(
      <QueryProvider>
        <Search />
      </QueryProvider>
    );
    const input = screen.getByDisplayValue('test');

    expect(input).toBeInTheDocument();
  });
  it('Search button saves the entered value to the local storage', () => {
    localStorage.setItem('search_value', 'test');
    render(
      <QueryProvider>
        <Search />
      </QueryProvider>
    );
    const input = screen.getByDisplayValue('test');
    fireEvent.change(input, { target: { value: '23' } });
    const button = screen.getByText('Search');
    fireEvent.click(button);
    expect(localStorage.getItem('search_value') === '23').toBeTruthy();
  });
});
