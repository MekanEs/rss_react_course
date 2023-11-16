import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Loader from './loader';

describe('Loader', () => {
  it('Component rendered', () => {
    render(<Loader showLoader={true} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  it('Child rendered', () => {
    render(
      <Loader showLoader={false}>
        <div>test</div>
      </Loader>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
