import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { styles } from './PetAttributes.styles';

export const AttributeBubble = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <View style={styles.bubble}>
      <FontAwesome5 name={icon as any} size={20} color={Colors.white} />
      <Text numberOfLines={2} style={styles.bubbleText}>{text}</Text>
    </View>
  );
};

export const CharacteristicRow = ({ label, value }: { label: string; value: string }) => {
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