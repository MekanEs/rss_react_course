import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import DetailedWindowContent from './detailedWindow';

const person = {
  name: 'R2-D2',
  height: '96',
  mass: '32',
  hair_color: 'n/a',
  skin_color: 'white, blue',
  eye_color: 'red',
  birth_year: '33BBY',
  gender: 'n/a',
  homeworld: 'https://swapi.dev/api/planets/8/',
  films: [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/2/',
    'https://swapi.dev/api/films/3/',
    'https://swapi.dev/api/films/4/',
    'https://swapi.dev/api/films/5/',
    'https://swapi.dev/api/films/6/',
  ],
  species: [],
  vehicles: [],
  starships: [],
  created: '2014-12-10T15:11:50.376000Z',
  edited: '2014-12-20T21:17:50.311000Z',
  url: 'https://swapi.dev/api/people/3/',
  imageURL: '#',
};
const mockState = vi.fn();
vi.mock('react', () => ({
  default: () => React,
  useState: () => [true, mockState],
}));
describe('DetaledWindowContent', () => {
  it('correctly displays the detailed card data', () => {
    const close = () => {};
    render(<DetailedWindowContent person={person} handleClose={close} />);
    const img = screen.getByAltText('image of person');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '#');
    expect(screen.getByText('R2-D2')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  it('handle close', () => {
    const close = () => {};
    render(<DetailedWindowContent person={person} handleClose={close} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(close).toBeCalled;
  });
  it('loader not shown after loading image, useState is called', () => {
    const close = () => {};

    render(<DetailedWindowContent person={person} handleClose={close} />);

    waitFor(() => expect(screen.getByTestId('loader')).not.toBeInTheDocument());
    waitFor(() => expect(mockState).toBeCalled());
  });
});
