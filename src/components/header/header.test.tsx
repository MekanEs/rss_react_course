import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Header from './header';
import { ErrorBoundary } from '..';

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockUsedNavigate,
}));

describe('Header', () => {
  it('render buttons', async () => {
    render(<Header />);
    screen.getAllByRole('button').forEach((el) => {
      expect(el).toBeInTheDocument();
    });
    const errorButton = screen.getByText('error');
    expect(errorButton).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Theme')).toBeInTheDocument();
  });
  it('handle error button click', async () => {
    render(
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
    );
    screen.getAllByRole('button').forEach((el) => {
      expect(el).toBeInTheDocument();
    });
    const errorButton = screen.getByText('error');
    fireEvent.click(errorButton);
    expect(screen.getByText('back')).toBeInTheDocument();
  });
});
