import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import api from '@/services/api';
import { VetMapItem } from '@/types/vet.types';
import { API_ROUTES } from '@/constants/ApiRoutes';

export function useVetsMap() {
    const [vets, setVets] = useState<VetMapItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [permissionGranted, setPermissionGranted] = useState(false);

    const getUserLocation = useCallback(async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permiso de ubicación denegado');
                return;
            }
            setPermissionGranted(true);

            const location = await Location.getCurrentPositionAsync({});
            setUserLocation(location);
            searchVets(location.coords.latitude, location.coords.longitude, 20);
        } catch (err) {
            console.error('Error ubicación:', err);
            setError('Error al obtener ubicación');
        }
    }, []);

    const searchVets = async (
        lat: number,
        lon: number,
        radiusKm: number = 20,
        openNow: boolean = false,
        shouldClear: boolean = false
    ) => {
        setIsLoading(true);
        try {
            const response = await api.get<VetMapItem[]>(API_ROUTES.VETS.BASE, {
                params: { lat, lon, radiusKm, openNow: openNow ? 'true' : undefined },
            });

            setVets((prevVets) => {
                if (shouldClear) {
                    return response.data;
                }
                const existingIds = new Set(prevVets.map((v) => v.id));
                const newUniqueVets = response.data.filter((v) => !existingIds.has(v.id));

                if (newUniqueVets.length === 0) return prevVets;

                const combined = [...prevVets, ...newUniqueVets];
                if (combined.length > 100) return combined.slice(combined.length - 100);
                return combined;
            });

        } catch (err) {
            console.error('Error cargando veterinarias:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUserLocation();
    }, [getUserLocation]);

    return {
        vets,
        userLocation,
        isLoading,
        error,
        permissionGranted,
        refreshMap: getUserLocation,
        searchVets
    };
}