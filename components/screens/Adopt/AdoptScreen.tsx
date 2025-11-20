import React, { useRef, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { usePets } from '@/hooks/usePets';
import Colors from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { PetDeck } from '@/components/PetDeck';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PetDetailSheet } from '@/components/PetDetail/PetDetailSheet';
import { styles } from './AdoptScreen.styles';

export default function AdoptScreen() {
  const { pets, isLoading, error, loadMore } = usePets();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleShowPetDetails = (id: number) => {
    setSelectedPetId(id);
    bottomSheetRef.current?.present();
  };

  const handleClosePetDetails = () => {
    setSelectedPetId(null);
    bottomSheetRef.current?.dismiss();
  };

  if (isLoading && pets.length === 0) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor }]}>
        <Text style={styles.errorText}>Error al cargar: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {pets.length > 0 ? (
        <PetDeck
          pets={pets}
          onSwipeOff={loadMore}
          onShowDetails={handleShowPetDetails}
        />
      ) : (
        <View style={styles.centered}>
          <Text style={[styles.title, { color: textColor }]}>
            No hay más mascotas por ahora.
          </Text>
        </View>
      )}

      <PetDetailSheet
        petId={selectedPetId}
        bottomSheetRef={bottomSheetRef}
        onClose={handleClosePetDetails}
      />
    </View>
  );
}