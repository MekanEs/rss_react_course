import { IPerson, ResponseType } from '../API/apiTypes';
import { DEF_LIMIT } from '../constants/constants';

export const getDefinedItems = (
  data: ResponseType,
  limit: number,
  page: number | string
): IPerson[] => {
  const tenElements = [0];
  const firstFive = [0, 5];
  const lastFive = [5];
  const isDefaultLimit = limit === DEF_LIMIT;
  const isLastFive = (limit * Number(page)) % DEF_LIMIT === 0;
  const ind = isDefaultLimit ? tenElements : isLastFive ? lastFive : firstFive;
  return data.items.slice(...ind);
};
