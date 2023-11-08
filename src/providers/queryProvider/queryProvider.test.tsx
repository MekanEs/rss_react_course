import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import QueryProvider from './queryProvider';

describe('QueryProvider', () => {
  it('renders child', () => {
    render(
      <QueryProvider>
        <div>test</div>
      </QueryProvider>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
