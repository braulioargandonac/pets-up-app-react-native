import React, { useState, useRef } from 'react';
import { View, Text, ActivityIndicator, Platform, ActionSheetIOS, Alert, Linking, Switch } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import { useVetsMap } from '@/hooks/useVetsMap';
import { useThemeColor } from '@/hooks/useThemeColor';
import { styles } from './VetsScreen.styles';
import Colors from '@/constants/Colors';
import { VetMapItem } from '@/types/vet.types';

export function VetsScreen() {
    const { vets, userLocation, searchVets, permissionGranted } = useVetsMap();
    const backgroundColor = useThemeColor({}, 'background');

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

    const openMapApp = (url: string) => {
        Linking.canOpenURL(url).then((supported) => {
            if (supported) Linking.openURL(url);
            else Alert.alert('Error', 'No se pudo abrir la aplicación de mapas.');
        });
    };

    const handleCalloutPress = (vet: VetMapItem) => {
        const lat = vet.latitude;
        const lon = vet.longitude;
        const label = encodeURIComponent(vet.name);

        const options = [
            { text: 'Cancelar', style: 'cancel', onPress: () => { } },
            {
                text: 'Google Maps',
                onPress: () => openMapApp(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`)
            },
            {
                text: 'Waze',
                onPress: () => openMapApp(`https://waze.com/ul?ll=${lat},${lon}&navigate=yes`)
            },
            ...(Platform.OS === 'ios' ? [{
                text: 'Apple Maps',
                onPress: () => openMapApp(`http://maps.apple.com/?q=${label}&ll=${lat},${lon}`)
            }] : [])
        ];

        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: options.map(o => o.text),
                    cancelButtonIndex: 0,
                    title: '¿Cómo quieres llegar?',
                },
                (buttonIndex) => {
                    options[buttonIndex]?.onPress();
                }
            );
        } else {
            Alert.alert(
                '¿Cómo quieres llegar?',
                'Elige una aplicación:',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Waze', onPress: () => openMapApp(`https://waze.com/ul?ll=${lat},${lon}&navigate=yes`) },
                    { text: 'Google Maps', onPress: () => openMapApp(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`) },
                ]
            );
        }
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
                        trackColor={{ false: Colors.extras.peach, true: Colors.extras.mint }}
                        thumbColor={Colors.white}
                        ios_backgroundColor={Colors.extras.peach}
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
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutTitle}>{vet.name}</Text>
                                    <Text style={styles.calloutAddress} numberOfLines={2}>{vet.address}</Text>

                                    {vet.isVerified && (
                                        <View style={styles.verifiedBadge}>
                                            <Ionicons name="checkmark-circle" size={12} color={Colors.functional.success} />
                                            <Text style={styles.verifiedText}>Verificado</Text>
                                        </View>
                                    )}
                                    <View style={{ marginTop: 8, backgroundColor: Colors.primary, padding: 6, borderRadius: 4, alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>Cómo llegar ➔</Text>
                                    </View>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })}
            </MapView>
        </View>
    );
}