// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const imageBaseUrl =
  'https://raw.githubusercontent.com/vieraboschkova/swapi-gallery/main/static/assets/img/people/';

export interface person {
  birth_year?: string;
  eye_color?: string;
  films?: string[];
  gender: string;
  hair_color: string;
  height?: string;
  homeworld?: string;
  mass?: string;
  name: string;
  skin_color: string;
  species?: never[];
  starships?: string[];
  url: string;
  vehicles?: string[];
  imageURL?: string;
}
export type responsetype = {
  total: number;
  items: person[];
  detail?: string;
};
// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPeople: builder.query({
      query: ({
        query,
        limit = 10,
        page = 1,
      }: {
        query: string;
        limit: number;
        page: number;
      }) => {
        const currentPage = Math.ceil((limit * page) / 10) || 1;
        return `people/?search=${query}&page=${currentPage}`;
      },
      transformResponse: (data: {
        count: number;
        next: string | null;
        previous: string | null;
        results: person[];
      }) => {
        const resObj: { items: person[]; total: number } = {
          items: [],
          total: 0,
        };

        resObj.items = data.results.map((el: person) => ({
          ...el,
          imageURL: `${imageBaseUrl}${el.url.split('/')[5]}.jpg?raw=true`,
        }));
        resObj.total = data.count;
        return resObj;
      },
    }),
    getPerson: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (id: string) => `/people/${id}`,
      transformResponse: (data: person) => {
        data.imageURL = `${imageBaseUrl}${data.url.split('/')[5]}.jpg?raw=true`;
        return data;
      },
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPersonQuery, useGetPeopleQuery } = apiSlice;
