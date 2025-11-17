import { StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.primary,
    height: 90,
    borderTopWidth: 0,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 20,
      },
    }),
  },
});