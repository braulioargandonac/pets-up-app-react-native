import React, { memo } from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import { LostPetMapItem } from '@/types/lost-pet.types';
import { styles } from './LostPetMarker.styles';
import Colors from '@/constants/Colors';

interface Props {
  pet: LostPetMapItem;
  onPress: (pet: LostPetMapItem) => void;
}

const LostPetMarkerComponent = ({ pet, onPress }: Props) => {
  const iconName = pet.petSpecieId === 2 ? 'cat' : 'dog';
  const markerColor = pet.petSpecieId === 2 ? Colors.extras.peach : Colors.extras.mint;
  
  return (
    <Marker
      coordinate={{ latitude: pet.latitude, longitude: pet.longitude }}
      tracksViewChanges={false}
      onPress={(e) => {
        e.stopPropagation();
        onPress(pet);
      }}
    >
      <View style={[styles.pinContainer, { backgroundColor: markerColor, borderColor: Colors.white }]} pointerEvents="none">
        <FontAwesome5 name={iconName} size={20} color={Colors.white} />
      </View>
    </Marker>
  );
};

export const LostPetMarker = memo(LostPetMarkerComponent, (prev, next) => {
  return (
    prev.pet.id === next.pet.id && 
    prev.pet.latitude === next.pet.latitude &&
    prev.pet.longitude === next.pet.longitude
  );
});