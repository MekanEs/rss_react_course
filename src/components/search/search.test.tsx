import React from 'react';
import { fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Search from './search';
import { renderWithProviders } from '../../tests/renderWithProviders';

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockUsedNavigate,
}));

describe('Search', () => {
  const initialState = {
    search: {
      searchValue: 'test',
      savedValue: 'test',
      limit: 1,
      personArray: [],
      getItemsPending: false,
      getPersonPending: false,
    },
    api: undefined,
  };
  it('renders Component', () => {
    const { getByRole, getByText, getByDisplayValue } = renderWithProviders(
      <Search />,
      {
        preloadedState: { search: initialState.search },
      }
    );
    expect(getByRole('button')).toBeInTheDocument();

    expect(getByText('Search')).toBeInTheDocument();

    expect(getByDisplayValue('test')).toHaveAttribute('name', 'search');
  });

  it('reducer called on input change', () => {
    const { getByDisplayValue, store } = renderWithProviders(<Search />, {
      preloadedState: { search: initialState.search },
    });
    const input = getByDisplayValue('test');
    fireEvent.change(input, { target: { value: 'text' } });
    expect(store.getState().search.searchValue).toBe('text');
  });
  it('reducer called on click', () => {
    const { getByRole, getByDisplayValue, store } = renderWithProviders(
      <Search />,
      {
        preloadedState: { search: initialState.search },
      }
    );
    const input = getByDisplayValue('test');
    const button = getByRole('button');
    fireEvent.change(input, { target: { value: 'text' } });
    fireEvent.click(button);

    expect(store.getState().search.savedValue).toBe('text');
  });
});
