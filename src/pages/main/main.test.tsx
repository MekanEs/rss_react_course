import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../tests/renderWithProviders';
import Main from '.';
import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
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
describe('main page', () => {
  const initialState = {
    search: {
      searchValue: 'test',
      savedValue: 'test',
      limit: 1,
      personArr: [person],
      getItemsPending: false,
      getPersonPending: false,
    },
    api: undefined,
  };
  it('renders', () => {
    const { getByText } = renderWithProviders(
      <MemoryRouter initialEntries={['/page/1/id/1']}>
        <Main />
      </MemoryRouter>,
      {
        preloadedState: { search: initialState.search },
      }
    );
    waitFor(() => expect(getByText('R2-D2')).toBeInTheDocument());
  });
});
