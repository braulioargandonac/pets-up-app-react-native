import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LostPet } from '@/types/lost-pet.types';
import { styles } from './LostPetCard.styles';
import { useThemeColor } from '@/hooks/useThemeColor';
import Colors from '@/constants/Colors';

interface Props {
  data: LostPet;
  onPress: (id: number) => void;
}

export function LostPetCard({ data, onPress }: Props) {
  const backgroundColor = useThemeColor({}, 'backgroundMuted');
  const textColor = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const borderColor = useThemeColor({}, 'border');

  const date = new Date(data.lostAt).toLocaleDateString('es-CL', {
    day: 'numeric', month: 'short'
  });

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor, borderColor }]} 
      onPress={() => onPress(data.id)}
      activeOpacity={0.8}
    >
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: data.pet.images[0]?.imageUrl }} 
          style={styles.image} 
        />
        <View style={styles.badgeDiagonal}>
          <Text style={styles.badgeTextDiagonal}>Se busca</Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: textColor }]}>{data.pet.name}</Text>
        
        <View style={styles.row}>
          <Ionicons name="location-sharp" size={14} color={Colors.primary} />
          <Text style={[styles.text, { color: textSecondary }]}>
            {data.commune?.name || 'Ubicación desconocida'}
          </Text>
        </View>
        
        <Text style={[styles.dateText, { color: textColor }]}>
          Perdido el {date}
        </Text>
      </View>
    </TouchableOpacity>
  );
}