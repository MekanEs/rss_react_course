import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../tests/renderWithProviders';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '.';
describe('Layout', () => {
  it('render', () => {
    const { getByText } = renderWithProviders(
      <MemoryRouter initialEntries={['page/1']}>
        <Layout />
      </MemoryRouter>
    );
    expect(getByText('error')).toBeInTheDocument();
  });
});
