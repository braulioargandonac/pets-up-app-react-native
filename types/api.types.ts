// --- Tipo Base ---
export interface CatalogItem {
  id: number;
  name: string;
}

// --- Catálogos de Pet ---
export type PetSpecie = CatalogItem;
export type PetBreed = CatalogItem;
export type PetSize = CatalogItem;
export type EnergyLevel = CatalogItem;
export type HomeType = CatalogItem;
export type PetCondition = CatalogItem;
export type PetHairType = CatalogItem;
export type PetStatus = CatalogItem;

// --- Catálogos de Ubicación ---
export type Region = CatalogItem;
export type Commune = CatalogItem & { regionId: number };

// --- Catálogos de CommunityPet ---
export type LogType = string;
export type Temperament = string;

// --- Catálogos de Reportes ---
export type ReportType = CatalogItem;

// --- Catálogos de Vet ---
export type VetService = CatalogItem & { description?: string | null };
export type DayOfWeek = CatalogItem;