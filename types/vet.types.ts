import { Commune, VetService, DayOfWeek } from './api.types';

export interface VetMapItem {
    id: number;
    name: string;
    address: string;
    isVerified: boolean;
    googleMapsUrl?: string | null;
    latitude: number;
    longitude: number;
    distanceInMeters: number;
    isOpen: boolean;
}

export interface VetDetail {
    id: number;
    name: string;
    phone?: string | null;
    email?: string | null;
    address: string;
    description?: string | null;
    googleMapsUrl?: string | null;
    isVerified: boolean;

    commune: Commune | null;

    images: {
        id: number;
        imageUrl: string;
        isLogo: boolean;
    }[];

    vetServices: {
        service: VetService;
    }[];

    vetOpeningTimes: {
        dayOfWeek: DayOfWeek;
        startTime: string;
        endTime: string;
    }[];
}