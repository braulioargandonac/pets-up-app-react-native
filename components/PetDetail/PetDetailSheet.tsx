import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { usePetDetail } from '@/hooks/usePetDetail';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCatalog } from '@/context/CatalogContext';
import { styles } from './PetDetail.styles';
import Colors from '@/constants/Colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

interface PetDetailSheetProps {
  petId: number | null;
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

const AttributeBubble = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <View style={styles.bubble}>
      <FontAwesome5 name={icon as any} size={24} color={Colors.white} />
      <Text numberOfLines={2} style={styles.bubbleText}>{text}</Text>
    </View>
  );
};

const CharacteristicRow = ({ label, value }: { label: string; value: string }) => {
  const textColor = useThemeColor({}, 'text');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  const borderColor = useThemeColor({}, 'border');

  return (
    <View style={[styles.charRow, { borderBottomColor: borderColor }]}>
      <Text style={[styles.charLabel, { color: textSecondaryColor }]}>{label}</Text>
      <Text style={[styles.charValue, { color: textColor }]}>{value}</Text>
    </View>
  );
};

export function PetDetailSheet({
  petId,
  bottomSheetRef,
  onClose,
}: PetDetailSheetProps) {
  const { pet, isLoading, error, fetchPetDetail, clearPetDetail } = usePetDetail();
  const {
    getCommuneName,
    getBreedName,
    getSizeName,
    getHomeTypeName,
    getEnergyLevelName,
    getHairTypeName,
  } = useCatalog();
  const snapPoints = useMemo(() => ['75%', '90%'], []);
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  const mutedBackgroundColor = useThemeColor({}, 'backgroundMuted');
  const borderColor = useThemeColor({}, 'border');

  const [isViewerVisible, setViewerVisible] = useState(false);
  const [initialViewerIndex, setInitialViewerIndex] = useState(0);

  useEffect(() => {
    if (petId) {
      fetchPetDetail(petId);
    } else {
      clearPetDetail();
    }
  }, [petId, fetchPetDetail, clearPetDetail]);

  const openImageViewer = (index: number) => {
    setInitialViewerIndex(index);
    setViewerVisible(true);
  };

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
    const petEnergy = getEnergyLevelName(pet.homeTypeId);
    const petHairType = getHairTypeName(pet.hairTypeId);

    const petAge = pet.birthDate ? `${new Date().getFullYear() - new Date(pet.birthDate).getFullYear()} años` : 'N/A';

    return (
      <BottomSheetScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity 
          activeOpacity={0.9} 
          onPress={() => openImageViewer(0)}
        >
          <Image
            source={{ uri: pet.images[0]?.imageUrl }}
            style={styles.headerImage}
          />
        </TouchableOpacity>

        <View style={[styles.infoBox, { backgroundColor: backgroundColor }]}>
          <View>
            <Text style={[styles.name, { color: textColor }]}>{pet.name}</Text>
            <Text style={[styles.location, { color: textSecondaryColor }]}>
              <Ionicons name="location-sharp" color={Colors.primary} size={16} /> {petCommune || 'Ubicación desconocida'}
            </Text>
          </View>
          <TouchableOpacity style={styles.likeButton}>
            <FontAwesome5 name="heart" size={28} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Sobre {pet.name}</Text>
          <Text style={[styles.description, { color: textSecondaryColor }]}>{pet.description || pet.shortDescription}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Galería</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={pet.images}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => openImageViewer(index)}>
                <Image source={{ uri: item.imageUrl }} style={styles.carouselImage} />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.bubblesContainer}>
            <AttributeBubble icon="child" text={pet.isKidFriendly ? 'Amigable con niños' : 'No amigable con niños'} />
            <AttributeBubble icon="dog" text={pet.isPetFriendly ? 'Amigable con mascotas' : 'No amigable con mascotas'} />
            <AttributeBubble icon="notes-medical" text={pet.isSterilized ? 'Esterilizado' : 'No esterilizado'} />
            <AttributeBubble icon="bolt" text={`${petEnergy}`} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Características</Text>
          <View>
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
                  {pet.owner.shortDescription || ''}
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

    {pet && (
        <Modal
          visible={isViewerVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setViewerVisible(false)}
        >
          <View style={styles.viewerModalContainer}>
            <TouchableOpacity 
              style={styles.viewerCloseButton} 
              onPress={() => setViewerVisible(false)}
            >
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>

            <FlatList
              data={pet.images}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              initialScrollIndex={initialViewerIndex} 
              getItemLayout={(data, index) => (
                { length: width, offset: width * index, index }
              )}
              
              renderItem={({ item }) => (
                <View style={styles.viewerImageContainer}>
                  <Image 
                    source={{ uri: item.imageUrl }} 
                    style={styles.viewerImage} 
                  />
                </View>
              )}
            />
          </View>
        </Modal>
      )}
    </>
  );
}