import { IMAGE_BASE_URL } from '../../constants/constants';

export const imageURLGenerator = (URL: string): string => {
  return `${IMAGE_BASE_URL}${URL.split('/')[5]}.jpg?raw=true`;
};
