import React, { ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QueryContext } from '../../providers/index.ts';
import DetailedWindow from './detailedWindow.tsx';

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockUsedNavigate,
  useParams: () => ({ id: 1, page: 1 }),
  Navigate: () => mockUsedNavigate,
}));

vi.mock('./detailedWindowContent', () => ({
  default: () => <div>test</div>,
}));
vi.mock('../../API/getItems/getPerson', () => ({
  default: () => Promise.resolve(person),
}));
vi.mock('../loader/loader', () => ({
  default: () => <Loader />,
}));

const Loader: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div>
      Loader
      <div>{children}</div>
    </div>
  );
};
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
describe('DetailedWindow', () => {
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
        <DetailedWindow />
      </QueryContext.Provider>
    );
    waitFor(() => expect(screen.getByText('Loader')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('test')).toBeInTheDocument());
  });
});
