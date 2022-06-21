export const countSlash = (url) => {
  let count = 0;
  for (let letter of url) {
    if (letter == "/") {
      count++;
    }
  }

  return count;
};
