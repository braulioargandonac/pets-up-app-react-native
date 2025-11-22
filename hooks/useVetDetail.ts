import { useState, useCallback } from 'react';
import api from '@/services/api';
import { VetDetail } from '@/types/vet.types';
import { API_ROUTES } from '@/constants/ApiRoutes';

export function useVetDetail() {
    const [vet, setVet] = useState<VetDetail | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchVetDetail = useCallback(async (id: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get<VetDetail>(API_ROUTES.VETS.BY_ID(id));
            setVet(response.data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error('Error desconocido al cargar la veterinaria.'));
            }
            setVet(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearVetDetail = useCallback(() => {
        setVet(null);
        setError(null);
    }, []);

    return { vet, isLoading, error, fetchVetDetail, clearVetDetail };
}