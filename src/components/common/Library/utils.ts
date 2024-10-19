export const getPathAsset = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return REACT_CDN_URL + path;
};
