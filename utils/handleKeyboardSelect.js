export const handleKeyboardSelect = (e, callBack) => {
  if (e.key !== "Enter" && e.key !== " ") {
    return;
  }
  callBack();
};
