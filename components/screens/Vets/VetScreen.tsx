import React, { useState, useRef } from 'react';
import { View, Text, ActivityIndicator, Platform, Switch } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useVetsMap } from '@/hooks/useVetsMap';
import { useThemeColor } from '@/hooks/useThemeColor';
import { styles } from './VetsScreen.styles';
import Colors from '@/constants/Colors';
import { VetMapItem } from '@/types/vet.types';
import { VetDetailSheet } from '@/components/VetDetail';

export function VetsScreen() {
    const { vets, userLocation, searchVets, permissionGranted } = useVetsMap();
    const [selectedVet, setSelectedVet] = useState<VetMapItem | null>(null);
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const backgroundColor = useThemeColor({}, 'background');
    const mutedBackgroundColor = useThemeColor({}, 'backgroundMuted');
    const textColor = useThemeColor({}, 'text');
    const textSecondary = useThemeColor({}, 'textSecondary');

    const [filterOpenNow, setFilterOpenNow] = useState(false);
    const debounceRef = useRef<any>(null);

    const handleRegionChange = (region: Region) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            const radiusKm = Math.round(region.latitudeDelta * 111);
            const searchRadius = Math.min(Math.max(radiusKm, 5), 100);
            searchVets(region.latitude, region.longitude, searchRadius, filterOpenNow, false);
        }, 1000);
    };

    const toggleOpenNow = (newValue: boolean) => {
        setFilterOpenNow(newValue);

        if (userLocation) {
            searchVets(
                userLocation.coords.latitude,
                userLocation.coords.longitude,
                20,
                newValue,
                true
            );
        }
    };

    const handleCalloutPress = (vet: VetMapItem) => {
        setSelectedVet(vet);
        bottomSheetRef.current?.present();
    };

    const handleCloseSheet = () => {
        setSelectedVet(null);
        bottomSheetRef.current?.dismiss();
    };

    if (!permissionGranted && !userLocation) {
        return (
            <View style={[styles.centerContainer, { backgroundColor }]}>
                <Text style={styles.errorText}>Necesitamos tu ubicación.</Text>
            </View>
        );
    }

    if (!userLocation) {
        return (
            <View style={[styles.centerContainer, { backgroundColor }]}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={[styles.switchContainer, { backgroundColor: Colors.primary }]}>
                    <Text style={[styles.switchLabel, { color: Colors.white }]}>Solo Abiertos</Text>
                    <Switch
                        trackColor={{ false: "#f8f8f8", true: Colors.extras.mint }}
                        thumbColor={Colors.white}
                        ios_backgroundColor={"#f8f8f8"}
                        onValueChange={toggleOpenNow}
                        value={filterOpenNow}
                        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                    />
                </View>
            </View>

            <MapView
                style={styles.map}
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                showsUserLocation={true}
                initialRegion={{
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                onRegionChangeComplete={handleRegionChange}
            >
                {vets.map((vet) => {
                    const pinColor = vet.isOpen ? Colors.extras.mint : Colors.extras.peach;

                    return (
                        <Marker
                            key={vet.id}
                            coordinate={{ latitude: vet.latitude, longitude: vet.longitude }}
                            tracksViewChanges={false}
                        >
                            <View style={styles.vetMarkerContainer}>
                                <View style={[styles.vetPin, { backgroundColor: pinColor }]}>
                                    <FontAwesome5
                                        name="clinic-medical"
                                        size={18}
                                        color={Colors.white}
                                    />
                                </View>
                            </View>

                            <Callout tooltip onPress={() => handleCalloutPress(vet)}>
                                <View style={[styles.calloutContainer, { backgroundColor: mutedBackgroundColor }]}>
                                    <Text style={[styles.calloutTitle, { color: textColor }]}>{vet.name}</Text>
                                    <Text style={[styles.calloutAddress, { color: textSecondary }]} numberOfLines={2}>{vet.address}</Text>

                                    {vet.isVerified && (
                                        <View style={styles.verifiedBadge}>
                                            <Ionicons name="checkmark-circle" size={12} color={Colors.functional.success} />
                                            <Text style={styles.verifiedText}>Verificado</Text>
                                        </View>
                                    )}
                                    <View style={{ marginTop: 8, backgroundColor: Colors.primary, padding: 6, borderRadius: 4, alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>Ver Detalles</Text>
                                    </View>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })}
            </MapView>
            <VetDetailSheet
                vetId={selectedVet?.id || null}
                location={selectedVet ? { lat: selectedVet.latitude, lon: selectedVet.longitude } : null}
                bottomSheetRef={bottomSheetRef}
                onClose={handleCloseSheet}
            />
        </View>
    );
}