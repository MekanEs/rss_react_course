import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CardContainer from './cardContainer';
import { QueryContext } from '../../providers';
import DetailedWindow from '../detaliedWindow/detailedWindow';

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
const mockFunc = vi.fn();
vi.mock('../detaliedWindow/detailedWindow', () => ({
  default: () => DetailedWindow,
}));
const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockUsedNavigate,
  useParams: () => mockUsedNavigate,
}));
describe('CardContainer', () => {
  it('useNavigate is called onClick', () => {
    render(
      <QueryContext.Provider
        value={{
          personArr: [person],
          setInputValue: mockFunc,
          saveSearchValue: mockFunc,
          limit: 1,
          searchValue: '',
          inputValue: '5',
        }}
      >
        <CardContainer />
      </QueryContext.Provider>
    );
    const name = screen.getByText('R2-D2');
    fireEvent.click(name);

    expect(mockUsedNavigate).toBeCalled();
  });
});
