import {
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';

import { useCatalog } from '@/context/CatalogContext';
import { useImageViewer } from '@/hooks/useImageViewer';
import { usePetDetail } from '@/hooks/usePetDetail';
import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { styles } from './PetDetail.styles';

import { AttributeBubble, CharacteristicRow } from './ui/PetAttributes';
import { PetImageCarousel } from './ui/PetImageCarousel';
import { PetImageViewer } from './ui/PetImageViewer';

interface PetDetailSheetProps {
  petId: number | null;
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  onClose: () => void;
}

export function PetDetailSheet({
  petId,
  bottomSheetRef,
  onClose,
}: PetDetailSheetProps) {
  const { pet, isLoading, error, fetchPetDetail, clearPetDetail } = usePetDetail();
  const { isViewerVisible, initialIndex, openViewer, closeViewer } = useImageViewer();
  
  const {
    getCommuneName,
    getBreedName,
    getSizeName,
    getHomeTypeName,
    getEnergyLevelName,
    getHairTypeName,
    getSpecieName,
  } = useCatalog();

  const snapPoints = useMemo(() => ['75%', '90%'], []);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  const mutedBackgroundColor = useThemeColor({}, 'backgroundMuted');
  const borderColor = useThemeColor({}, 'border');

  useEffect(() => {
    if (petId) {
      fetchPetDetail(petId);
    } else {
      clearPetDetail();
    }
  }, [petId, fetchPetDetail, clearPetDetail]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }

    if (error || !pet) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={{ color: textColor }}>Error al cargar la mascota.</Text>
        </View>
      );
    }

    const petCommune = getCommuneName(pet.communeId);
    const petBreed = getBreedName(pet.breedId);
    const petSize = getSizeName(pet.sizeId);
    const petHome = getHomeTypeName(pet.homeTypeId);
    const petEnergy = getEnergyLevelName(pet.energyLevelId);
    const petHairType = getHairTypeName(pet.hairTypeId);
    const petSpecie = getSpecieName(pet.specieId);
    
    const petAge = pet.birthDate 
      ? `${new Date().getFullYear() - new Date(pet.birthDate).getFullYear()} años` 
      : 'N/A';

    return (
      <BottomSheetScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => openViewer(0)}>
          <Image
            source={{ uri: pet.images[0]?.imageUrl || 'https://via.placeholder.com/500' }}
            style={styles.headerImage}
          />
        </TouchableOpacity>

        <View style={[styles.infoBox, { backgroundColor: backgroundColor }]}>
          <View style={styles.infoTextContainer}>
            <Text style={[styles.name, { color: textColor }]}>{pet.name}</Text>
            <Text style={[styles.location, { color: textSecondaryColor }]}>
              <Ionicons name="location-sharp" color={Colors.primary} size={16} /> {petCommune}
            </Text>
          </View>
          <TouchableOpacity style={styles.likeButton}>
            <FontAwesome5 name="heart" size={28} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Sobre {pet.name}</Text>
          <Text style={[styles.description, { color: textSecondaryColor }]}>
            {pet.description || pet.shortDescription || 'Sin descripción.'}
          </Text>
        </View>

        <PetImageCarousel 
          images={pet.images} 
          petName={pet.name} 
          onImagePress={openViewer} 
        />

        <View style={styles.section}>
          <View style={styles.bubblesContainer}>
            <AttributeBubble icon="child" text={pet.isKidFriendly ? 'Amigable niños' : 'No niños'} />
            <AttributeBubble icon="dog" text={pet.isPetFriendly ? 'Amigable mascotas' : 'No mascotas'} />
            <AttributeBubble icon="notes-medical" text={pet.isSterilized ? 'Esterilizado' : 'No esterilizado'} />
            <AttributeBubble icon="bolt" text={petEnergy} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Características</Text>
          <View>
            <CharacteristicRow label="Especie" value={petSpecie} />
            <CharacteristicRow label="Edad (aprox)" value={petAge} />
            <CharacteristicRow label="Tamaño" value={petSize} />
            <CharacteristicRow label="Raza" value={petBreed} />
            <CharacteristicRow label="Hogar sugerido" value={petHome} />
            <CharacteristicRow label="Sexo" value={pet.gender || 'N/A'} />
            <CharacteristicRow label="Pelaje" value={petHairType} />
            <CharacteristicRow label="Color" value={pet.color || 'N/A'} />
          </View>
        </View>

        {pet.owner && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Rescatista</Text>
            <View style={[styles.ownerBox, { backgroundColor: mutedBackgroundColor }]}>
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.ownerAvatar}
              />
              <View>
                <Text style={[styles.ownerName, { color: textColor }]}>{pet.owner.name}</Text>
                <Text style={[styles.ownerRole, { color: textSecondaryColor }]}>
                  {pet.owner.shortDescription || 'Protector de animales'}
                </Text>
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.adoptButton}>
          <FontAwesome5 name="paw" size={20} color={Colors.white} />
          <Text style={styles.adoptButtonText}>Adoptar</Text>
        </TouchableOpacity>

      </BottomSheetScrollView>
    );
  };

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onDismiss={onClose}
        backgroundStyle={{ backgroundColor: backgroundColor }}
        handleIndicatorStyle={{ backgroundColor: borderColor }}
      >
        {renderContent()}
      </BottomSheetModal>

      <PetImageViewer 
        images={pet?.images} 
        isVisible={isViewerVisible} 
        initialIndex={initialIndex} 
        onClose={closeViewer} 
      />
    </>
  );
}