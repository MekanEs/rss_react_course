import { itemsArrtype } from '../../App';
import { instance } from '../axios.config';

export type responsetype = {
  docs: itemsArrtype;
  limit: number;
  pages: number;
  total: number;
};
export const getItems = async (searchValue: string, page: number) => {
  const response: { data: responsetype } = await instance.get('/v1.3/movie', {
    params: {
      page: page,
      name: searchValue,
    },
  });
  console.log(response);

  return response.data;
};
