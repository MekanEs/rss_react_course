import { describe, expect, it } from 'vitest';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { renderWithProviders } from '../tests/renderWithProviders';
describe('Layout', () => {
  it('render', () => {
    const { getByText } = renderWithProviders(
      <RouterProvider router={router} />
    );
    expect(getByText('error')).toBeInTheDocument();
  });
});
