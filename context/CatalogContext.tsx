import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAllCatalogs, AllCatalogs } from '@/services/catalogService';

const initialCatalogs: AllCatalogs = {
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

interface CatalogContextType {
  catalogs: AllCatalogs;
  isLoading: boolean;
  getCommuneName: (id?: number | null) => string;
  getRegionName: (id?: number | null) => string;
  getSpecieName: (id?: number | null) => string;
  getBreedName: (id?: number | null) => string;
  getSizeName: (id?: number | null) => string;
  getEnergyLevelName: (id?: number | null) => string;
  getHomeTypeName: (id?: number | null) => string;
  getConditionName: (id?: number | null) => string;
  getHairTypeName: (id?: number | null) => string;
  getStatusName: (id?: number | null) => string;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [catalogs, setCatalogs] = useState<AllCatalogs>(initialCatalogs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAllCatalogs();
        setCatalogs(data);
      } catch (e) {
        console.error('Error al cargar catálogos:', e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const getCommuneName = (id?: number | null) => 
    catalogs.communes.find((c) => c.id === id)?.name || 'Desconocida';

  const getRegionName = (id?: number | null) => 
    catalogs.regions.find((r) => r.id === id)?.name || 'Desconocida';

  const getSpecieName = (id?: number | null) => 
    catalogs.species.find((s) => s.id === id)?.name || 'N/A';

  const getBreedName = (id?: number | null) => 
    catalogs.breeds.find((b) => b.id === id)?.name || 'N/A';

  const getSizeName = (id?: number | null) => 
    catalogs.sizes.find((s) => s.id === id)?.name || 'N/A';

  const getEnergyLevelName = (id?: number | null) => 
    catalogs.energyLevels.find((e) => e.id === id)?.name || 'N/A';

  const getHomeTypeName = (id?: number | null) => 
    catalogs.homeTypes.find((h) => h.id === id)?.name || 'N/A';

  const getConditionName = (id?: number | null) => 
    catalogs.conditions.find((c) => c.id === id)?.name || 'N/A';

  const getHairTypeName = (id?: number | null) => 
    catalogs.hairTypes.find((h) => h.id === id)?.name || 'N/A';

  const getStatusName = (id?: number | null) => 
    catalogs.statuses.find((s) => s.id === id)?.name || 'N/A';

  return (
    <CatalogContext.Provider
      value={{
        catalogs,
        isLoading,
        getCommuneName,
        getRegionName,
        getSpecieName,
        getBreedName,
        getSizeName,
        getEnergyLevelName,
        getHomeTypeName,
        getConditionName,
        getHairTypeName,
        getStatusName,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (context === undefined) {
    throw new Error('useCatalog debe usarse dentro de CatalogProvider');
  }
  return context;
};