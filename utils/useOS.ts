import { useState, useEffect } from "react";

export const useOS = () => {
  const [os, setOs] = useState<string | null>(null);

  useEffect(() => {
    const nav = window.navigator as any;
    if (nav) {
      setOs(nav.userAgentData?.platform);
    }
  }, []);

  return os;
};
