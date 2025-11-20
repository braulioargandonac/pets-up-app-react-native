import React from 'react';
import { View, Image, FlatList, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PetImage } from '@/types/pet.types';
import { styles } from './PetImageViewer.styles';

const { width } = Dimensions.get('window');

interface Props {
  images: PetImage[] | undefined;
  isVisible: boolean;
  initialIndex: number;
  onClose: () => void;
}

export function PetImageViewer({ images, isVisible, initialIndex, onClose }: Props) {
  if (!images || images.length === 0) return null;

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>

        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          initialScrollIndex={initialIndex}
          getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            </View>
          )}
        />
      </View>
    </Modal>
  );
}
