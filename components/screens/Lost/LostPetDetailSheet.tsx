import React, { useEffect, useMemo } from 'react';
import { View, Text, ActivityIndicator, Image, FlatList, TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useLostPetDetail } from '@/hooks/useLostPetDetail';
import { useThemeColor } from '@/hooks/useThemeColor';
import { styles } from '@/components/PetDetail/PetDetail.styles';
import Colors from '@/constants/Colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

interface Props {
  lostPetId: number | null;
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  onClose: () => void;
  onReportPress: (id: number) => void;
}

export function LostPetDetailSheet({ lostPetId, bottomSheetRef, onClose, onReportPress }: Props) {
  const { lostPet, isLoading, error, fetchLostPetDetail, clearLostPetDetail } = useLostPetDetail();
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

    return (
      <BottomSheetScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: pet.images[0]?.imageUrl }} style={styles.headerImage} />
        <View style={[styles.infoBox, { backgroundColor: backgroundColor}]}>
          <View>
            <Text style={{ color: Colors.extras.mint, fontWeight: 'bold', marginBottom: 4 }}>
              SE BUSCA!
            </Text>
            <Text style={[styles.name, { color: textColor }]}>{pet.name}</Text>
            <Text style={[styles.location, { color: textSecondaryColor }]}>
              <Ionicons name="location-sharp" color={Colors.primary} size={16} /> {lostPet.commune?.name}
            </Text>
          </View>
          <View style={[styles.likeButton, { backgroundColor: Colors.primary }]}>
             <FontAwesome5 name="exclamation" size={28} color={Colors.white} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Detalles de la Desaparición</Text>
          <Text style={{ color: textColor, marginBottom: 5, fontWeight: '600' }}>Fecha: {dateLost}</Text>
          <Text style={[styles.description, { color: textSecondaryColor }]}>{lostPet.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Fotos de {pet.name}</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={pet.images}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item.imageUrl }} style={styles.carouselImage} />
            )}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Identificación</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
             <Text style={{ color: textSecondaryColor, marginRight: 20 }}>Color: <Text style={{color: textColor, fontWeight:'bold'}}>{pet.color}</Text></Text>
             <Text style={{ color: textSecondaryColor }}>Marcas: <Text style={{color: textColor, fontWeight:'bold'}}>{pet.distinguishingMarks || 'Ninguna'}</Text></Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.adoptButton, { backgroundColor: Colors.primary, marginTop: 40 }]}
          onPress={() => onReportPress(lostPet.id)}
        >
          <Ionicons name="camera" size={24} color={Colors.white} />
          <Text style={styles.adoptButtonText}>Reportar Avistamiento</Text>
        </TouchableOpacity>

      </BottomSheetScrollView>
    );
  };

  return (
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
  );
}