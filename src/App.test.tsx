import { describe, expect, it } from 'vitest';
import React from 'react';
import App from './App';
import { renderWithProviders } from './tests/renderWithProviders';
describe('App', () => {
  it('render', () => {
    const { getByText } = renderWithProviders(<App />);
    expect(getByText('error')).toBeInTheDocument();
  });
});
