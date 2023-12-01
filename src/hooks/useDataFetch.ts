import { useState, useEffect } from "react";

const useDataFetch = (fetchDataFunction: () => any) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchDataFunction();
        //  setData(result.data);
      } catch (err) {
        setError(err);
      } finally {
        //  setLoading(false);
      }
    }

    fetchData();
  }, [fetchDataFunction]);

  return { data, loading, error };
};

export default useDataFetch;
