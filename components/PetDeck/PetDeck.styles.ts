// components/PetDeck/PetDeck.styles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cardContainer: {
    position: 'absolute',
    width: width,
    height: height * 0.7,
  },
});