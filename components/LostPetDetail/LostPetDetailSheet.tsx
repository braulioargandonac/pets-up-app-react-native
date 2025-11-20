import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import {
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';

import { useCatalog } from '@/context/CatalogContext';
import { useImageViewer } from '@/hooks/useImageViewer';
import { useLostPetDetail } from '@/hooks/useLostPetDetail';
import { useThemeColor } from '@/hooks/useThemeColor';

import { styles } from '@/components/PetDetail/PetDetail.styles';
import Colors from '@/constants/Colors';

import { AttributeBubble, CharacteristicRow } from '@/components/PetDetail/ui/PetAttributes';
import { PetImageCarousel } from '@/components/PetDetail/ui/PetImageCarousel';
import { PetImageViewer } from '@/components/PetDetail/ui/PetImageViewer';

interface Props {
  lostPetId: number | null;
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  onClose: () => void;
  onReportPress: (id: number) => void;
}

export function LostPetDetailSheet({
  lostPetId,
  bottomSheetRef,
  onClose,
  onReportPress,
}: Props) {
  const { lostPet, isLoading, error, fetchLostPetDetail, clearLostPetDetail } = useLostPetDetail();
  const { isViewerVisible, initialIndex, openViewer, closeViewer } = useImageViewer();
  
  const { getCommuneName, getBreedName, getSizeName, getSpecieName } = useCatalog();

  const snapPoints = useMemo(() => ['75%', '90%'], []);
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  const borderColor = useThemeColor({}, 'border');

  useEffect(() => {
    if (lostPetId) {
      fetchLostPetDetail(lostPetId);
    } else {
      clearLostPetDetail();
    }
  }, [lostPetId, fetchLostPetDetail, clearLostPetDetail]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.functional.danger} />
        </View>
      );
    }
    if (error || !lostPet) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={{ color: textColor }}>No se pudo cargar la información.</Text>
        </View>
      );
    }

    const pet = lostPet.pet;
    const dateLost = new Date(lostPet.lostAt).toLocaleDateString('es-CL', { dateStyle: 'full' });

    const petCommune = getCommuneName(lostPet.communeId);
    const petBreed = getBreedName(pet.breedId);
    const petSize = getSizeName(pet.sizeId);
    const petSpecie = getSpecieName(pet.specieId);

    return (
      <BottomSheetScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => openViewer(0)}>
          <Image
            source={{ uri: pet.images[0]?.imageUrl || 'https://via.placeholder.com/500' }}
            style={styles.headerImage}
          />
        </TouchableOpacity>

        <View style={[styles.infoBox, { 
            backgroundColor: backgroundColor,
        }]}>
          <View style={styles.infoTextContainer}>
            <Text style={{ color: Colors.extras.mint, fontWeight: 'bold', marginBottom: 4 }}>
              ¡SE BUSCA!
            </Text>
            <Text style={[styles.name, { color: textColor }]}>{pet.name}</Text>
            <Text style={[styles.location, { color: textSecondaryColor }]}>
              <Ionicons name="location-sharp" color={Colors.primary} size={16} /> Perdido en {petCommune}
            </Text>
          </View>
          <View style={[styles.likeButton, { backgroundColor: Colors.primary }]}>
             <FontAwesome5 name="exclamation" size={28} color={Colors.white} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Detalles</Text>
          <Text style={{ color: textColor, marginBottom: 5, fontWeight: '600' }}>
            📅 Fecha: {dateLost}
          </Text>
          <Text style={[styles.description, { color: textSecondaryColor }]}>
            {lostPet.description || 'Sin detalles adicionales.'}
          </Text>
        </View>

        <PetImageCarousel 
          images={pet.images} 
          petName={pet.name} 
          onImagePress={openViewer} 
        />

        <View style={styles.section}>
          <View style={styles.bubblesContainer}>
            <AttributeBubble icon="paw" text={petSpecie} />
            <AttributeBubble icon="ruler-vertical" text={petSize} />
            <AttributeBubble icon="palette" text={pet.color || 'N/A'} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Identificación</Text>
          <View>
             <CharacteristicRow label="Raza" value={petBreed} />
             <CharacteristicRow label="Marcas Distintivas" value={pet.distinguishingMarks || 'Ninguna'} />
             <CharacteristicRow label="Género" value={pet.gender || 'N/A'} />
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.adoptButton, { backgroundColor: Colors.extras.mint, marginTop: 40 }]}
          onPress={() => onReportPress(lostPet.id)}
        >
          <Ionicons name="camera" size={24} color={Colors.white} />
          <Text style={styles.adoptButtonText}>Reportar Avistamiento</Text>
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
        backgroundStyle={{ backgroundColor }}
        handleIndicatorStyle={{ backgroundColor: borderColor }}
      >
        {renderContent()}
      </BottomSheetModal>

      <PetImageViewer 
        images={lostPet?.pet.images} 
        isVisible={isViewerVisible} 
        initialIndex={initialIndex} 
        onClose={closeViewer} 
      />
    </>
  );
}