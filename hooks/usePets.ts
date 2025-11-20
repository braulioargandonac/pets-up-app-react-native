import { usePaginatedQuery } from './usePaginatedQuery';
import { PetSummary } from '@/types/pet.types';
import { API_ROUTES } from '@/constants/ApiRoutes';

export function usePets() {
  const { 
    data: pets, 
    isLoading, 
    error, 
    loadMore, 
    refresh: refetch 
  } = usePaginatedQuery<PetSummary>(API_ROUTES.PETS.BASE, 10);

  return { pets, isLoading, error, loadMore, refetch };
}