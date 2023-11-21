export interface IPerson {
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
export type ResponseType = {
  total: number;
  items: IPerson[];
  detail?: string;
};

export type DataType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPerson[];
};

export type GetPeopleArgType = {
  query: string;
  limit: number;
  page: number;
};
