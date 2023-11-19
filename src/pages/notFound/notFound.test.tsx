import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NotFound from '.';
vi.mock('react-router-dom', () => ({
  Link: () => <></>,
}));
describe('NotFound', () => {
  it('404 page is displayed when navigating to an invalid route', () => {
    render(<NotFound />);
    expect(screen.getByText('Page is not found')).toBeInTheDocument();
  });
});
