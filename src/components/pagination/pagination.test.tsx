import React from 'react';
import { fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from './pagination';

import { renderWithProviders } from '../../tests/renderWithProviders';

const initialState = {
  search: {
    searchValue: 'test',
    savedValue: 'test',
    limit: 5,
    personArray: [],
    getItemsPending: false,
    getPersonPending: false,
  },
  api: undefined,
};
const mockUsedNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockUsedNavigate,
  useParams: () => ({ id: 1 }),
}));
describe('Pagination', () => {
  it('render component', () => {
    const { getByText } = renderWithProviders(
      <Pagination page={1} total={10} />,
      {
        preloadedState: { search: initialState.search },
      }
    );

    expect(getByText('<')).toBeInTheDocument();
    expect(getByText('<<')).toBeInTheDocument();
    expect(getByText('>')).toBeInTheDocument();
    expect(getByText('>>')).toBeInTheDocument();
    expect(getByText('limit:')).toBeInTheDocument();
  });
  it('updates URL query parameter when page changes', () => {
    const { getByText } = renderWithProviders(
      <Pagination page={5} total={100} />,
      {
        preloadedState: { search: initialState.search },
      }
    );
    const nextPage = getByText('>');
    const prevPage = getByText('<');
    const lastPage = getByText('>>');
    const firstPage = getByText('<<');
    fireEvent.click(nextPage);
    fireEvent.click(prevPage);
    fireEvent.click(lastPage);
    fireEvent.click(firstPage);

    expect(mockUsedNavigate).toBeCalledTimes(4);
  });
  it('handle events', () => {
    const { getByDisplayValue, store } = renderWithProviders(
      <Pagination page={1} total={10} />,
      {
        preloadedState: { search: initialState.search },
      }
    );
    const input = getByDisplayValue('5');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: '10' } });
    expect(store.getState().search.limit).toBe(10);
  });
});
