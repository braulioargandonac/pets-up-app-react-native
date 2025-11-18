import { Commune } from './api.types';
import { User } from './user.types';

export interface PetImage {
  id: number;
  imageUrl: string;
  caption?: string | null;
  order: number;
  isActive: boolean;
}

export interface PetSummary {
  id: number;
  name: string;
  communeId: number | null;
  isActive: boolean;
  images: PetImage[];
  commune: Commune | null;
  specieId: number | null;
  breedId: number | null;
  sizeId: number | null;
}

export interface PaginatedPetsResponse {
  data: PetSummary[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface PetDetail {
  id: number;
  name: string;
  communeId: number | null;
  isActive: boolean;
  
  description?: string | null;
  shortDescription?: string | null;
  birthDate?: string | null;
  gender?: string | null;
  color?: string | null;
  distinguishingMarks?: string | null;

  sizeId: number | null;
  energyLevelId: number | null;
  homeTypeId: number | null;
  conditionId: number | null;
  statusId: number | null;
  specieId: number | null;
  breedId: number | null;
  hairTypeId: number | null;

  images: PetImage[];
  owner: Partial<User> | null;
  commune: Commune | null;
}