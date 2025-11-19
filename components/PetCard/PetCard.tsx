import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles } from './PetCard.styles';
import { PetSummary } from '@/types/pet.types';
import Colors from '@/constants/Colors';
import { useCatalog } from '@/context/CatalogContext';

interface PetCardProps {
  pet: PetSummary;
}

export function PetCard({ pet }: PetCardProps) {
  const { getCommuneName } = useCatalog();
  const petCommune = getCommuneName(pet.communeId);
  const imageUrl =
    pet.images && pet.images.length > 0
      ? pet.images[0].imageUrl
      : 'https://via.placeholder.com/500';

  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{pet.name}</Text>
            <View style={styles.location}>
              <Ionicons style={styles.locationIcon} name="location-sharp" size={18} />
              <Text style={styles.locationText}>{petCommune || 'Ubicación desconocida'}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.likeButton}>
            <FontAwesome name="heart" size={28} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}