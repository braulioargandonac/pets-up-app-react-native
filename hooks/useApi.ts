import { useState, useCallback, useEffect } from 'react';
import api from '@/services/api';
import { AxiosRequestConfig } from 'axios';

export function useQuery<T>(endpoint: string, options?: { enabled?: boolean }) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const enabled = options?.enabled ?? true;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<T>(endpoint);
      setData(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error desconocido';
      setError(new Error(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage));
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [fetchData, enabled]);

  return { data, isLoading, error, refetch: fetchData };
}

export function useMutation<T = any, B = any>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(async (
    method: 'POST' | 'PATCH' | 'DELETE',
    endpoint: string,
    body?: B,
    config?: AxiosRequestConfig
  ) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      let response;
      switch (method) {
        case 'POST':
          response = await api.post<T>(endpoint, body, config);
          break;
        case 'PATCH':
          response = await api.patch<T>(endpoint, body, config);
          break;
        case 'DELETE':
          response = await api.delete<T>(endpoint, config);
          break;
      }
      setData(response.data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Error desconocido';
      const finalError = Array.isArray(errorMessage) ? errorMessage[0] : errorMessage;
      setError(finalError);
      throw new Error(finalError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const post = (url: string, body: B, config?: AxiosRequestConfig) => execute('POST', url, body, config);
  const patch = (url: string, body: B, config?: AxiosRequestConfig) => execute('PATCH', url, body, config);
  const remove = (url: string, config?: AxiosRequestConfig) => execute('DELETE', url, undefined, config);

  return { isLoading, error, data, post, patch, remove };
}