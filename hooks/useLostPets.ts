import { usePaginatedQuery } from './usePaginatedQuery';
import { LostPet } from '@/types/lost-pet.types';
import { API_ROUTES } from '@/constants/ApiRoutes';

export function useLostPets() {
  const { 
    data: lostPets, 
    isLoading, 
    error, 
    loadMore, 
    refresh 
  } = usePaginatedQuery<LostPet>(API_ROUTES.LOST_PETS.BASE, 20);

  return { lostPets, isLoading, error, loadMore, refresh };
}