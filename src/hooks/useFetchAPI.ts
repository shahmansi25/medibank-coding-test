import { useState, useEffect } from "react";

interface UseFetchProps<T> {
  url: string;
  initialData: T;
}

const useFetchAPI = <T>({ url, initialData }: UseFetchProps<T>) => {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result: T = await response.json();
        setData(result);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchAPI;
