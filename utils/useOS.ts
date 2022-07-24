import { useState, useEffect } from "react";

export const useOS = () => {
  const [os, setOs] = useState<string | null>(null);

  useEffect(() => {
    const nav = window.navigator as any;
    setOs(nav.userAgentData.platform);
  }, []);

  return os;
};
