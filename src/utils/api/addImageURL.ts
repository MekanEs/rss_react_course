import { imageBaseUrl, person } from '../../API/getItems/getItems';

const addImage = (data: person) => {
  const result = structuredClone(data);
  result.imageURL = `${imageBaseUrl}${data.url.split('/')[5]}.jpg?raw=true`;
  return result;
};

export default addImage;
