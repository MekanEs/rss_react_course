import axios from 'axios';
import { imageBaseUrl, person } from './getItems';

const getPerson = async (url: string) => {
  try {
    const { data }: { data: person } = await axios.get(url);
    data.imageURL = `${imageBaseUrl}${url.split('/')[5]}.jpg?raw=true`;
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
export default getPerson;
