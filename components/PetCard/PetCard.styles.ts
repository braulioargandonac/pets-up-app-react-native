import { StyleSheet, Dimensions } from 'react-native';
import Colors from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({

  card: {
    marginTop: 20,
    width: width*0.9,
    height: height*0.75,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.light.backgroundMuted,
  },
  
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '40%',
  },
  
  infoContainer: {
    padding: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
  },
  location: {
    fontSize: 16,
    color: Colors.white,
    marginTop: 4,
  },

  likeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});