import { StyleSheet, Dimensions } from 'react-native';
import Colors from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingBottom: 100,
  },

  headerImage: {
    width: '100%',
    height: 300,
  },
  infoBox: {
    padding: 20,
    borderRadius: 20,
    marginTop: -20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
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

  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },

  carouselImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },

  charGrid: {
  },
  charRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  charLabel: {
    fontSize: 16,
  },
  charValue: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },

  bubblesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  bubble: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  bubbleIcon: {
    color: Colors.white,
  },
  bubbleText: {
    justifyContent: 'center',
    fontSize: 8,
    textAlign: 'center',
    color: Colors.white,
    fontWeight: '600',
    marginTop: 4,
  },

  ownerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 12,
  },
  ownerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ownerRole: {
    fontSize: 14,
  },

  adoptButton: {
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 20,
    marginTop: 40,
  },
  adoptButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  viewerModalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewerCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
  },
  viewerImageContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewerImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
});