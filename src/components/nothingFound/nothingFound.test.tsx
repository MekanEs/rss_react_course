import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NothingFound from './nothingFound';
import { QueryContext } from '../../providers';

describe('NothingFound', () => {
  it('render component', () => {
    render(<NothingFound />);
    expect(screen.getByText('nothing is found')).toBeInTheDocument();
  });
  it('handle event', () => {
    const mockFunc = vi.fn();
    render(
      <QueryContext.Provider
        value={{
          setInputValue: mockFunc,
          saveSearchValue: mockFunc,
          limit: 1,
          searchValue: '',
          inputValue: '5',
          personArr: [],
        }}
      >
        <NothingFound />
      </QueryContext.Provider>
    );
    const clearButton = screen.getByText('clear');
    fireEvent.click(clearButton);
    expect(mockFunc).toBeCalledTimes(2);
  });
});
