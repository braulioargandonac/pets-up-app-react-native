import { Platform, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.primary,
    height: 90,
    borderTopWidth: 0,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
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
  
  tabItemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    height: 100,
    width: 100,
  },

  tabIconRaised: {
    width: 70,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -5 }],
    
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 5 },
      },
      android: {
        elevation: 10,
      },
    }),
  },
  
  tabLabelInactive: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
});