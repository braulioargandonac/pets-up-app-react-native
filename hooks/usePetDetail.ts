import { useState, useCallback } from 'react';
import { useQuery } from './useApi';
import { PetDetail } from '@/types/pet.types';
import { API_ROUTES } from '@/constants/ApiRoutes';

export function usePetDetail() {
  const [petId, setPetId] = useState<number | null>(null);

  const { 
    data: pet, 
    isLoading, 
    error, 
    refetch 
  } = useQuery<PetDetail>(
    petId ? API_ROUTES.PETS.BY_ID(petId) : '', 
    { enabled: !!petId }
  );

  const fetchPetDetail = useCallback((id: number) => {
    setPetId(id);
  }, []);

  const clearPetDetail = useCallback(() => {
    setPetId(null);
  }, []);

  return { pet, isLoading, error, fetchPetDetail, clearPetDetail, refetch };
}