import { useEffect, useState } from "react";

const useFetchData = (url: string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [url]); // Don't forget to include 'url' in the dependency array

  return data;
};

// Usage of the useFetchData hook
const DataComponent = () => {
  const data = useFetchData("https://api.example.com/data");

  return (
    <div>
      {/* Display the data here */}
      {data.map((item, index) => (
        <p key={index}>{item}</p>
      ))}{" "}
    </div>
  );
};

export default DataComponent;
