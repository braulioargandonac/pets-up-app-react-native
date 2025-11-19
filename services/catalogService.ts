import api from './api';
import {
  PetSpecie,
  PetBreed,
  PetSize,
  EnergyLevel,
  HomeType,
  PetCondition,
  PetHairType,
  PetStatus,
  Commune,
  Region,
} from '@/types/api.types';

export interface AllCatalogs {
  species: PetSpecie[];
  breeds: PetBreed[];
  sizes: PetSize[];
  energyLevels: EnergyLevel[];
  homeTypes: HomeType[];
  conditions: PetCondition[];
  hairTypes: PetHairType[];
  statuses: PetStatus[];
  communes: Commune[];
  regions: Region[];
}

/**
 * Obtiene todos los catálogos en paralelo.
 */
export async function fetchAllCatalogs(): Promise<AllCatalogs> {
  try {
    const [
      speciesRes,
      breedsRes,
      sizesRes,
      energyLevelsRes,
      homeTypesRes,
      conditionsRes,
      hairTypesRes,
      statusesRes,
      communesRes,
      regionsRes,
    ] = await Promise.all([
      api.get<PetSpecie[]>('/catalog/pet-species'),
      api.get<PetBreed[]>('/catalog/pet-breeds'),
      api.get<PetSize[]>('/catalog/pet-sizes'),
      api.get<EnergyLevel[]>('/catalog/energy-levels'),
      api.get<HomeType[]>('/catalog/home-types'),
      api.get<PetCondition[]>('/catalog/pet-conditions'),
      api.get<PetHairType[]>('/catalog/pet-hair-types'),
      api.get<PetStatus[]>('/catalog/pet-statuses'),
      api.get<Commune[]>('/catalog/communes'),
      api.get<Region[]>('/catalog/regions'),
    ]);

    return {
      species: speciesRes.data,
      breeds: breedsRes.data,
      sizes: sizesRes.data,
      energyLevels: energyLevelsRes.data,
      homeTypes: homeTypesRes.data,
      conditions: conditionsRes.data,
      hairTypes: hairTypesRes.data,
      statuses: statusesRes.data,
      communes: communesRes.data,
      regions: regionsRes.data,
    };
  } catch (error) {
    console.error('Error cargando catálogos:', error);
    return {
      species: [],
      breeds: [],
      sizes: [],
      energyLevels: [],
      homeTypes: [],
      conditions: [],
      hairTypes: [],
      statuses: [],
      communes: [],
      regions: [],
    };
  }
}