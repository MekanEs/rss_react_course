import { IPerson } from '../../API/apiTypes';

export interface ISearchSlice {
  searchValue: string;
  savedValue: string;
  limit: number;
  personArray: IPerson[];
  getItemsPending: boolean;
  getPersonPending: boolean;
}
