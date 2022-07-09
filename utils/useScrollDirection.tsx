import { useState, useEffect } from "react";

export const useScrollDirection = (): { scrollDirection: string; isScrolling: boolean } => {
  const [direction, setDirection] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  let oldVal: number;

  const calculateDirection = () => {
    if (oldVal < window.scrollY) {
      setIsScrolling(true);
      setDirection("down");
    }
    if (oldVal > window.scrollY) {
      setDirection("up");
    }
    oldVal = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", calculateDirection);

    return () => window.addEventListener("scroll", calculateDirection);
  }, [direction]);

  return {
    scrollDirection: direction,
    isScrolling,
  };
};
