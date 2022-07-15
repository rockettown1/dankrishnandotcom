import React from "react";

export const handleKeyboardSelect = (e: React.KeyboardEvent, callBack: Function) => {
  if (e.key !== "Enter" && e.key !== " ") {
    return false;
  }
  callBack();
  return true;
};
