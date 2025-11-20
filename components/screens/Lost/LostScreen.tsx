import React, { useState, useRef, useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

import { useLostPets } from '@/hooks/useLostPets';
import { useLostPetsMap } from '@/hooks/useLostPetsMap';
import { useThemeColor } from '@/hooks/useThemeColor';
import { styles } from './LostScreen.styles';
import Colors from '@/constants/Colors';
import { LostPetCard } from '@/components/LostPetCard/LostPetCard';
import { LostPetMapItem } from '@/types/lost-pet.types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { MapPetCard } from '@/components/LostPetMap/MapPetCard';
import { LostPetDetailSheet } from '@/components/LostPetDetail';
import { LostPetMarker } from '@/components/LostPetMap/LostPetMarker';

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radio de la tierra en km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function LostScreen() {
  const { mapData, userLocation, searchInArea } = useLostPetsMap();
  const { lostPets: listData, isLoading: loadingList, loadMore, refresh } = useLostPets();

  const backgroundColor = useThemeColor({}, 'background');
  const mutedBackgroundColor = useThemeColor({}, 'backgroundMuted');
  const textColor = useThemeColor({}, 'text');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedPet, setSelectedPet] = useState<LostPetMapItem | null>(null);

  const debounceRef = useRef<any>(null);
  const lastFetchLocation = useRef<{ lat: number; lon: number } | null>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [detailId, setDetailId] = useState<number | null>(null);

  const handleToggleView = () => {
    setViewMode(prev => prev === 'map' ? 'list' : 'map');
  };

  const handleMarkerPress = useCallback((pet: LostPetMapItem) => {
    setSelectedPet(pet);
  }, []);

  const handleCloseCard = () => {
    setSelectedPet(null);
  };

  const handlePetPress = useCallback((id: number) => {
    setDetailId(id);
    bottomSheetRef.current?.present();
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailId(null);
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleReportSighting = useCallback((id: number) => {
    console.log("Reportar avistamiento para ID:", id);
  }, []);

  const handleRegionChange = (region: Region) => {

    if (lastFetchLocation.current) {
      const dist = getDistanceFromLatLonInKm(
        region.latitude,
        region.longitude,
        lastFetchLocation.current.lat,
        lastFetchLocation.current.lon
      );
      if (dist < 3) {
        return;
      }
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const radiusKm = Math.round(region.latitudeDelta * 111);
      const searchRadius = Math.min(Math.max(radiusKm, 5), 100);
      searchInArea(region.latitude, region.longitude, searchRadius);
    }, 1000);
  };

  const renderMap = () => {
    if (!userLocation) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text>Obteniendo ubicación...</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
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
          onPress={() => setSelectedPet(null)}
        >
          {mapData.map((pet) => (
            <LostPetMarker
              key={pet.id}
              pet={pet}
              onPress={handleMarkerPress}
            />
          ))}
        </MapView>
        {selectedPet && (
          <MapPetCard
            pet={selectedPet}
            onClose={handleCloseCard}
            onDetailPress={handlePetPress}
          />
        )}
      </View>
    );
  };

  const renderList = () => (
    <FlatList
      data={listData}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => <LostPetCard data={item} onPress={handlePetPress} />}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      onRefresh={refresh}
      refreshing={loadingList}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.toggleButton, { backgroundColor: mutedBackgroundColor }]} onPress={handleToggleView}>
          <Ionicons name={viewMode === 'map' ? 'list' : 'map'} size={20} color={Colors.primary} />
          <Text style={[styles.toggleText, { color: textColor }]}>{viewMode === 'map' ? 'Ver Lista' : 'Ver Mapa'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reportButton}>
          <Ionicons name="add" size={28} color={Colors.white} />
        </TouchableOpacity>
      </View>
      {viewMode === 'map' ? renderMap() : renderList()}
      <LostPetDetailSheet
        lostPetId={detailId}
        bottomSheetRef={bottomSheetRef}
        onClose={handleCloseDetail}
        onReportPress={handleReportSighting}
      />
    </View>
  );
}