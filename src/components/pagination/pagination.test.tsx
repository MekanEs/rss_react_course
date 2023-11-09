import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from '..';
import { QueryContext } from '../../providers';

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockUsedNavigate,
  useParams: () => ({ id: 1 }),
}));

describe('Pagination', () => {
  it('render component', () => {
    render(<Pagination page={1} total={10} />);
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('<<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByText('>>')).toBeInTheDocument();
    expect(screen.getByText('limit:')).toBeInTheDocument();
  });
  it('updates URL query parameter when page changes', () => {
    render(
      <QueryContext.Provider
        value={{
          saveLimit: vi.fn(),
          limit: 1,
          searchValue: '',
          inputValue: '5',
          personArr: [],
        }}
      >
        <Pagination page={1} total={10} />
      </QueryContext.Provider>
    );
    const nexPage = screen.getByText('>');
    fireEvent.click(nexPage);
    expect(mockUsedNavigate).toBeCalled();
  });
  it('handle events', () => {
    const saveLimit = vi.fn();
    render(
      <QueryContext.Provider
        value={{
          saveLimit: saveLimit,
          limit: 1,
          searchValue: '',
          inputValue: '5',
          personArr: [],
        }}
      >
        <Pagination page={1} total={10} />
      </QueryContext.Provider>
    );
    const input = screen.getByDisplayValue('1');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: '10' } });
    expect(saveLimit).toBeCalled();
  });
});
