import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DataType, GetPeopleArgType, IPerson, ResponseType } from './apiTypes';
import { imageURLGenerator } from '../utils';
import { BASE_URL, DEF_LIMIT } from '../constants/constants';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPeople: builder.query({
      query: ({ query, limit = DEF_LIMIT, page = 1 }: GetPeopleArgType) => {
        const currentPage = Math.ceil((limit * page) / 10) || 1;
        return { url: 'people/', params: { search: query, page: currentPage } };
      },
      transformResponse: (data: DataType) => {
        const resObj: ResponseType = {
          items: [],
          total: 0,
        };

        resObj.items = data.results.map((el: IPerson) => ({
          ...el,
          imageURL: imageURLGenerator(el.url),
        }));
        resObj.total = data.count;
        return resObj;
      },
    }),
    getPerson: builder.query({
      query: (id: string) => `/people/${id}`,
      transformResponse: (data: IPerson) => {
        data.imageURL = imageURLGenerator(data.url);
        return data;
      },
    }),
  }),
});

export const { useGetPersonQuery, useGetPeopleQuery } = apiSlice;
