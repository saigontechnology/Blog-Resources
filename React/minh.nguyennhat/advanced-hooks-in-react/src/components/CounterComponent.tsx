import { useEffect, useState } from "react";

// Custom hook: useCounter
const useCounter = (interval: number) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return count;
};

// Usage of the useCounter hook
const CounterComponent = () => {
  const count = useCounter(1000);

  return <div>{count}</div>;
};

export default CounterComponent;
