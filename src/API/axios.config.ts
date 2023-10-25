import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://api.kinopoisk.dev/',
  timeout: 0,
  headers: { 'X-API-KEY': 'YNPY24A-F6J4ACW-G0MY3DV-NDQXMJA' },
});
