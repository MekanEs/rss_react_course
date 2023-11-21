export const getIdFromURL = (url: string): string => {
  const splittedURL = url.split('/');
  return splittedURL[splittedURL.length - 2];
};
