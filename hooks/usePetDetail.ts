import { useState, useCallback } from 'react';
import api from '@/services/api';
import { PetDetail } from '@/types/pet.types';

export function usePetDetail() {
  const [pet, setPet] = useState<PetDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPetDetail = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<PetDetail>(`/pets/${id}`);
      
      setPet(response.data);
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('Ocurrió un error desconocido.'));
      }
      setPet(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearPetDetail = useCallback(() => {
    setPet(null);
    setError(null);
  }, []);

  return { pet, isLoading, error, fetchPetDetail, clearPetDetail };
}