export const clearScrollposition = (path: string, storage: Storage) => {
  if (path.search(/work/i) == -1) {
    storage.removeItem("scrollPosition");
  }
  return { complete: true, error: null, storage };
};
