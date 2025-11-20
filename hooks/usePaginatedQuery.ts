import { useState, useCallback, useEffect } from 'react';
import api from '@/services/api';

interface PaginatedApiResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export function usePaginatedQuery<T>(endpoint: string, limit: number = 10) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useCallback(async (currentPage: number) => {
    if (currentPage === 1) setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<PaginatedApiResponse<T>>(endpoint, {
        params: {
          page: currentPage,
          limit: limit,
        },
      });

      const { data: newData, meta } = response.data;

      setTotalPages(meta.totalPages);
      
      setData((prevData) => {
        return currentPage === 1 ? newData : [...prevData, ...newData];
      });

    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('Error desconocido al cargar datos.'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, limit]);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const loadMore = () => {
    if (page < totalPages && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage);
    }
  };

  const refresh = () => {
    setPage(1);
    fetchData(1);
  };

  return { data, isLoading, error, loadMore, refresh };
}