import { useState, useEffect } from "react";

// recieves a DOM node ref and returns whether the user has scrolled to the bottom of it
export const useBottom = (el) => {
  const [isBottom, setIsBottom] = useState(false);

  const onScroll = () => {
    const scrollBarHeight = el.current.scrollHeight;
    const halfHeight = window.innerHeight * 1.5;
    const bottomOfBar = el.current.scrollTop + halfHeight;

    if (bottomOfBar > scrollBarHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    const element = el.current;

    //add eventlistener to window
    element.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      element.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);

  return isBottom;
};
