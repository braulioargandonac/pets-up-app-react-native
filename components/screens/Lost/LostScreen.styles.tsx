import { StyleSheet, Dimensions } from 'react-native';
import Colors from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  toggleButton: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: { fontWeight: 'bold', color: Colors.primary, marginLeft: 8 },
  reportButton: {
    backgroundColor: Colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  map: { width: width, height: height },
  
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 130,
    paddingBottom: 120,
  },

  pinContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },

  calloutContainer: {
    width: 200,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
  },
  calloutImage: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: Colors.light.backgroundMuted,
  },
  calloutTextContainer: {
    width: '100%',
    paddingHorizontal: 4,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
  },
  calloutSubtitle: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  calloutCta: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});