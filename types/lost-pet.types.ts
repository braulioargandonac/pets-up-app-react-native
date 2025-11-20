import { PetDetail } from './pet.types';
import { Commune } from './api.types';

export interface LostPet {
  id: number;
  petId: number;
  reportedById: number;
  communeId: number;

  latitude: number;
  longitude: number;

  lostAt: string;
  description?: string | null;
  isResolved: boolean;
  
  pet: PetDetail;
  commune: Commune | null;
}

export interface PaginatedLostPetsResponse {
  data: LostPet[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface LostPetMapItem {
  id: number;
  petId: number;
  reportedById: number;
  communeId: number;
  
  latitude: number;
  longitude: number;
  distanceInMeters: number;
  
  petName: string;
  petSpecieId: number;
  petImage: string | null;
  
  lostAt: string;
  description: string | null;
  isResolved: boolean;
}