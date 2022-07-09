export const clearScrollposition = (path: string, storage) => {
  try {
    if (path.search(/work/i) == -1) {
      storage.removeItem("scrollPosition");
    }
    return { complete: true, error: null, storage };
  } catch (error) {
    return { complete: false, error, storage };
  }
};
