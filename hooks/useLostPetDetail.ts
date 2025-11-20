import { useState, useCallback } from 'react';
import api from '@/services/api';
import { LostPet } from '@/types/lost-pet.types';
import { API_ROUTES } from '@/constants/ApiRoutes';

export function useLostPetDetail() {
  const [lostPet, setLostPet] = useState<LostPet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchLostPetDetail = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<LostPet>(API_ROUTES.LOST_PETS.BY_ID(id));
      setLostPet(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('Error desconocido al cargar reporte.'));
      }
      setLostPet(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearLostPetDetail = useCallback(() => {
    setLostPet(null);
    setError(null);
  }, []);

  return { lostPet, isLoading, error, fetchLostPetDetail, clearLostPetDetail };
}