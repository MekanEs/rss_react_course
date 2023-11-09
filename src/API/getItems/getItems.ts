import { personArr } from '../../providers/queryProvider/queryProvider';
import { instance } from '../axios.config';

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
  imageURL: string;
}
export type responsetype = {
  total: number;
  items: person[];
};

export const getItems = async (
  query: string,
  page: number,
  limit: number
): Promise<{
  items: personArr;
  total: number | undefined;
  detail?: string;
}> => {
  try {
    const ind = limit === 10 ? [0] : (limit * page) % 10 === 0 ? [5] : [0, 5];
    const curPage = Math.ceil((limit * page) / 10);

    const result: { items: personArr; total: number } = await instance
      .get('people/', {
        params: {
          page: curPage || 1,
          search: query,
        },
      })
      .then((data) => {
        const resObj = { items: [], total: 0 };
        resObj.items = data.data.results
          .map((el: person) => ({
            ...el,
            imageURL: `${imageBaseUrl}${el.url.split('/')[5]}.jpg?raw=true`,
          }))
          .slice(...ind);
        resObj.total = data.data.count;
        return resObj;
      });

    return result;
  } catch (e) {
    console.log(e);

    return { items: [], total: 0, detail: 'not found' };
  }
};
