import React from 'react';
import { describe, expect, it } from 'vitest';
import NothingFound from './nothingFound';
import { renderWithProviders } from '../../tests/renderWithProviders';
import { fireEvent } from '@testing-library/react';

const initialState = {
  search: {
    searchValue: 'test',
    savedValue: 'test',
    limit: 1,
    personArr: [],
    getItemsPending: false,
    getPersonPending: false,
  },
  api: undefined,
};
describe('NothingFound', () => {
  it('render component', () => {
    const { getByText } = renderWithProviders(<NothingFound />, {
      preloadedState: { search: initialState.search },
    });

    expect(getByText('nothing is found')).toBeInTheDocument();
  });
  it('state changes on click', () => {
    const { getByText, store } = renderWithProviders(<NothingFound />, {
      preloadedState: { search: initialState.search },
    });
    const button = getByText('clear');
    fireEvent.click(button);
    expect(store.getState().search.searchValue).toBe('');
    expect(store.getState().search.savedValue).toBe('');
  });
});
