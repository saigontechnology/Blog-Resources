import { useState, useEffect } from "react";

type Options = "min-width" | "max-width";

const useMediaQuery = (query: Options, value: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(${query}: ${value})`);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query, value]);

  return matches;
};

export default useMediaQuery;
