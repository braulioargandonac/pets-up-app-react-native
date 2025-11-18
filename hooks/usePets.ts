import { useState, useEffect } from 'react';
import api from '@/services/api';
import { PetSummary, PaginatedPetsResponse } from '@/types/pet.types';

export function usePets() {
  const [pets, setPets] = useState<PetSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPets = async (currentPage: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<PaginatedPetsResponse>('/pets', {
        params: {
          page: currentPage,
          limit: 10,
        },
      });

      const { data, meta } = response.data;
      
      setPets((prevPets) => (currentPage === 1 ? data : [...prevPets, ...data]));
      setTotalPages(meta.totalPages);
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('Ocurrió un error desconocido al cargar las mascotas.'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPets(1);
  }, []);

  const loadMore = () => {
    if (page < totalPages && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPets(nextPage);
    }
  };

  const refetch = () => {
    setPage(1);
    fetchPets(1);
  };

  return { pets, isLoading, error, loadMore, refetch };
}