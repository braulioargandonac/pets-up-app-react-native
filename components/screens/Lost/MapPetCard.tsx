import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LostPetMapItem } from '@/types/lost-pet.types';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './MapPetCard.styles';
import { useThemeColor } from '@/hooks/useThemeColor';

interface Props {
    pet: LostPetMapItem;
    onClose: () => void;
    onDetailPress: (id: number) => void;
}

export function MapPetCard({ pet, onClose, onDetailPress }: Props) {
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Ionicons name="close" size={20} color={Colors.light.textSecondary} />
            </TouchableOpacity>

            <View style={styles.content}>
                <Image
                    source={{ uri: pet.petImage || 'https://via.placeholder.com/150' }}
                    style={styles.image}
                />

                <View style={styles.info}>
                    <Text style={[styles.name, { color: textColor }]}>{pet.petName}</Text>
                    <Text style={[styles.distance, { color: textColor }]}>
                        <Ionicons name="location-sharp" size={14} color={Colors.primary} />
                        {' '}A {Math.round(pet.distanceInMeters)}m de ti
                    </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onDetailPress(pet.id)}
                    >
                        <Text style={styles.buttonText}>Ver Detalle</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
