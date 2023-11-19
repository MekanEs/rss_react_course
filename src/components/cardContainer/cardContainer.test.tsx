import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import CardContainer from './cardContainer';
import { MemoryRouter } from 'react-router-dom';
import DetailedWindow from '../detaliedWindow/detailedWindow';
import { renderWithProviders } from '../../tests/renderWithProviders';
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
  imageURL: '',
};
vi.mock('../detaliedWindow/detailedWindow', () => ({
  default: () => DetailedWindow,
}));

describe('CardContainer', () => {
  const initialState = {
    search: {
      searchValue: '',
      savedValue: '',
      limit: 1,
      personArr: [person, person],
      getItemsPending: false,
      getPersonPending: false,
    },
    api: undefined,
  };
  it('renders the specified number of cards', () => {
    const { getAllByText } = renderWithProviders(
      <MemoryRouter initialEntries={['/page/1/']}>
        <CardContainer />
      </MemoryRouter>,
      { preloadedState: { search: initialState.search } }
    );

    expect(getAllByText('R2-D2').length).toBe(2);
  });
  it('message is displayed if no cards are present', () => {
    const { getByText } = renderWithProviders(
      <MemoryRouter initialEntries={['/page/1/']}>
        <CardContainer />
      </MemoryRouter>,
      {
        preloadedState: {
          search: {
            searchValue: '',
            savedValue: '',
            limit: 1,
            personArr: [],
            getItemsPending: false,
            getPersonPending: false,
          },
        },
      }
    );
    expect(getByText('nothing is found')).toBeInTheDocument();
  });
});
