import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../tests/renderWithProviders';
import { ErrorBoundary, Header } from '..';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
describe('Header', () => {
  it('render', () => {
    const { getByText } = renderWithProviders(
      <MemoryRouter initialEntries={['/page/1']}>
        <Header />
      </MemoryRouter>
    );
    expect(getByText('error')).toBeInTheDocument();
  });
  it('return errorBoundary message', () => {
    const { getByText } = renderWithProviders(
      <MemoryRouter initialEntries={['/page/1']}>
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
      </MemoryRouter>
    );
    const error = getByText('error');
    fireEvent.click(error);
    expect(getByText('back')).toBeInTheDocument();
  });
});
