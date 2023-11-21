export const pathGen = (
  page: number | string | undefined,
  id?: number | string
) => {
  const pagePath = `/page/${page || 1}`;
  const detailsPath = id ? `/details/${id}` : '';
  return `${pagePath}${detailsPath}`;
};
