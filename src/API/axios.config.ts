import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://swapi.dev/api/',
  timeout: 0,
});
