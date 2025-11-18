// app/(tabs)/index.tsx
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { usePets } from '@/hooks/usePets';
import Colors from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { PetDeck } from '@/components/PetDeck/PetDeck';

export default function AdoptScreen() {
  const { pets, isLoading, error, loadMore } = usePets();
  const backgroundColor = useThemeColor({}, 'background');

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
        />
      ) : (
        <View style={styles.centered}>
          <Text style={styles.title}>No hay más mascotas por ahora.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.textSecondary,
  },
  errorText: {
    color: Colors.functional.danger,
    fontSize: 16,
  },
});