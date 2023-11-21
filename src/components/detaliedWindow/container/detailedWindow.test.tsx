import { describe, expect, it } from 'vitest';
import React from 'react';
import DetailedWindow from './detailedWindowContainer';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../tests/renderWithProviders';

describe('DetailedWindow', () => {
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
  it('render', () => {
    const { getByText } = renderWithProviders(
      <MemoryRouter initialEntries={['/page/1/id/1']}>
        <DetailedWindow />
      </MemoryRouter>,
      { preloadedState: { search: initialState.search, api: undefined } }
    );
    expect(getByText('Nothing Fetched')).toBeInTheDocument();
  });
});
