import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    overflow: 'hidden',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: Colors.light.backgroundMuted,
  },

  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  badgeDiagonal: {
    position: 'absolute',
    top: 15,
    left: -25,
    width: 100,
    backgroundColor: Colors.extras.mint,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-45deg' }],
    zIndex: 1,
  },
  badgeTextDiagonal: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    marginLeft: 4,
  },
  dateText: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
  },
});