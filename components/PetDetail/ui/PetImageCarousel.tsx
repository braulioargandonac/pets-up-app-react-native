import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { PetImage } from '@/types/pet.types';
import { useThemeColor } from '@/hooks/useThemeColor';
import { styles } from './PetImageCarousel.styles';

interface Props {
  images: PetImage[] | undefined;
  onImagePress: (index: number) => void;
  petName: string;
}

export function PetImageCarousel({ images, onImagePress, petName }: Props) {
  const textColor = useThemeColor({}, 'text');

  if (!images || images.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>Fotos de {petName}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onImagePress(index)}>
            <Image source={{ uri: item.imageUrl }} style={styles.carouselImage} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}