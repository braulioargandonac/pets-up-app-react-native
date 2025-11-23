export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  PETS: {
    BASE: '/pets',
    BY_ID: (id: number) => `/pets/${id}`,
    REPORT_LOST: (id: number) => `/pets/${id}/report-lost`,
    PHOTOS: (id: number) => `/pets/${id}/photos`,
    PHOTOS_ORDER: (id: number) => `/pets/${id}/photos/order`,
    PHOTO_DELETE: (petId: number, photoId: number) => `/pets/${petId}/photos/${photoId}`,
    RESTORE: (id: number) => `/pets/${id}/restore`,
  },
  LOST_PETS: {
    BASE: '/lost-pets',
    BY_ID: (id: number) => `/lost-pets/${id}`,
    SIGHTING: (id: number) => `/lost-pets/${id}/sighting`,
    FOUND: (id: number) => `/lost-pets/${id}/found`,
  },
  COMMUNITY: {
    PETS: '/community-pets',
    BY_ID: (id: number) => `/community-pets/${id}`,
  },
  VETS: {
    BASE: '/vets',
    NEARBY: '/vets/nearby',
    BY_ID: (id: number) => `/vets/${id}`,
  },
  CATALOG: {
    SPECIES: '/catalog/pet-species',
    BREEDS: '/catalog/pet-breeds',
    SIZES: '/catalog/pet-sizes',
    ENERGY: '/catalog/energy-levels',
    HOME_TYPES: '/catalog/home-types',
    CONDITIONS: '/catalog/pet-conditions',
    HAIR_TYPES: '/catalog/pet-hair-types',
    STATUSES: '/catalog/pet-statuses',
    COMMUNES: '/catalog/communes',
    REGIONS: '/catalog/regions',
    LOG_TYPES: '/catalog/log-types',
    TEMPERAMENTS: '/catalog/temperaments',
  },
  USERS: {
    ME: '/users/me',
    PETS: '/users/me/pets'
  },
};