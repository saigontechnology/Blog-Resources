import { useTransition, useState } from "react";

interface IData {
  message: string;
}

const AsyncContent = () => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<IData | null>(null);

  const fetchData = async () => {
    startTransition(() => {
      setData(null);
    });

    const response = await fetch("https://api.example.com/data");
    const newData = await response.json();

    startTransition(() => {
      setData(newData);
    });
  };

  return (
    <div>
      {isPending ? <p>Loading...</p> : null}
      {data ? <p>{data.message}</p> : null}
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

export default AsyncContent;
