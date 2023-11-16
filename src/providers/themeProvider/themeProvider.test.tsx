import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ThemeProvider from './themeProvider';

describe('ThemeyProvider', () => {
  it('renders child', () => {
    render(
      <ThemeProvider>
        <div>test</div>
      </ThemeProvider>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
