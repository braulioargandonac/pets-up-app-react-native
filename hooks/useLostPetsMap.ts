import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import api from '@/services/api';
import { LostPetMapItem } from '@/types/lost-pet.types';
import { API_ROUTES } from '@/constants/ApiRoutes';

export function useLostPetsMap() {
  const [mapData, setMapData] = useState<LostPetMapItem[]>([]);
  const [isLoadingMap, setIsLoadingMap] = useState(false);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const fetchNearbyPets = useCallback(async (lat: number, lon: number, radius: number = 20) => {
    setIsLoadingMap(true);
    try {
      const response = await api.get<LostPetMapItem[]>(API_ROUTES.LOST_PETS.BASE, {
        params: { lat, lon, radiusKm: radius },
      });

      setMapData((prevData) => {
        const existingIds = new Set(prevData.map((p) => p.id));
        const newUniquePets = response.data.filter((pet) => !existingIds.has(pet.id));
        
        if (newUniquePets.length === 0) return prevData;

        const combined = [...prevData, ...newUniquePets];

        if (combined.length > 100) {
           return combined.slice(combined.length - 100);
        }

        return combined;
      });
    } catch (err) {
      console.error('Error cargando mapa:', err);
    } finally {
      setIsLoadingMap(false);
    }
  }, []);

  const getUserLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso de ubicación denegado');
        return;
      }
      setPermissionGranted(true);
      
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
      
      fetchNearbyPets(location.coords.latitude, location.coords.longitude, 20);
    } catch (err) {
      console.error('Error obteniendo ubicación:', err);
    }
  }, [fetchNearbyPets]);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  return { 
    mapData, 
    userLocation, 
    isLoadingMap, 
    permissionGranted,
    refreshMap: getUserLocation,
    searchInArea: fetchNearbyPets
  };
}