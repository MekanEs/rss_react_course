import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('render', () => {
    render(<App />);
    const search = screen.getByText('Search');
    expect(search).toBeInTheDocument();
  });
});
