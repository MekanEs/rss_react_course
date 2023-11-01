import { itemsArrtype } from '../../App';
import { instance } from '../axios.config';

export type responsetype = {
  docs: itemsArrtype;
  limit: number;
  pages: number;
  total: number;
};
export const getItems = async (searchValue: string, page: number) => {
  try {
    const response: { data: responsetype; status: number } = await instance.get(
      '/v1.3/movie',
      {
        params: {
          page: page,
          name: searchValue,
        },
      }
    );

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
