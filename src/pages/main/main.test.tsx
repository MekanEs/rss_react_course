import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Main from '.';
import { QueryContext } from '../../providers';
const params:
  | {
      page: number | undefined;
      id: number | undefined;
    }
  | undefined = { page: 1, id: 1 };
const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockUsedNavigate,
  useParams: () => params,
  Navigate: () => mockUsedNavigate,
}));

vi.mock('../../components', () => ({
  CardContainer: () => <div>CardContainer</div>,
  Loader: () => <Loader />,
  Pagination: () => <div>Pagination</div>,
}));
const Loader: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div>
      Loader
      <div>{children}</div>
    </div>
  );
};

describe('Main', () => {
  it('render', () => {
    render(
      <QueryContext.Provider
        value={{
          personArr: [],
          setInputValue: vi.fn(),
          saveSearchValue: vi.fn(),
          limit: 1,
          searchValue: '',
          inputValue: '5',
        }}
      >
        <Main />
      </QueryContext.Provider>
    );
    expect(screen.getByText('Loader')).toBeInTheDocument();
    expect(mockUsedNavigate).not.toBeCalled();
  });
});
