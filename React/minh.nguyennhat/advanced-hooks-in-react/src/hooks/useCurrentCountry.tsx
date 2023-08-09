import { useEffect, useState } from "react";

const DEFAULT_COUNTRY = "vn";

const useCurrentCountry = () => {
  const [currentCountry, setCurrentCountry] = useState(DEFAULT_COUNTRY);

  useEffect(() => {
    setCurrentCountry(localStorage.get("CURRENT_COUNTRY", DEFAULT_COUNTRY));
  }, []);

  return currentCountry;
};

export default useCurrentCountry;
