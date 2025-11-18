import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles } from './PetCard.styles';
import { PetSummary } from '@/types/pet.types';
import Colors from '@/constants/Colors';

interface PetCardProps {
  pet: PetSummary;
}

export function PetCard({ pet }: PetCardProps) {
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
            <Text style={styles.location}>
              <Ionicons name="location-sharp" size={18} />
              {pet.commune?.name || 'Ubicación desconocida'}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.likeButton}>
            <FontAwesome name="heart" size={28} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}