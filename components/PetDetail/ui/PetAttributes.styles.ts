import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export const styles = StyleSheet.create({
  bubble: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    minWidth: 70,
  },
  bubbleText: {
    fontSize: 10,
    textAlign: 'center',
    color: Colors.white,
    fontWeight: '600',
    marginTop: 4,
  },
  charRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  charLabel: { fontSize: 16 },
  charValue: { fontSize: 16, fontWeight: '600', textTransform: 'capitalize' },
});