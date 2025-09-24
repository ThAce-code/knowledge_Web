import { useEffect, useState } from 'react';
import { apiClient } from '../api';

export function useFetch(path, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!!path);

  useEffect(() => {
    let canceled = false;
    async function run() {
      if (!path) return;
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.get(path, options);
        if (!canceled) setData(res);
      } catch (e) {
        if (!canceled) setError(e);
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    run();
    return () => { canceled = true; };
  }, [path]);

  return { data, error, loading };
}