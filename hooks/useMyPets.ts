import { useState, useCallback, useEffect } from 'react';
import api from '@/services/api';
import { PetSummary } from '@/types/pet.types';
import { API_ROUTES } from '@/constants/ApiRoutes';

export function useMyPets() {
    const [myPets, setMyPets] = useState<PetSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchMyPets = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get<PetSummary[]>(API_ROUTES.USERS.PETS);
            setMyPets(response.data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error('Error al cargar mis mascotas.'));
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMyPets();
    }, [fetchMyPets]);

    return { myPets, isLoading, error, refetch: fetchMyPets };
}