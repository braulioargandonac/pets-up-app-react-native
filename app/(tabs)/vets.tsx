import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAuth } from '@/context/AuthContext';
import Colors from '@/constants/Colors';

export default function VetScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const { logout } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Pantalla de Veterinarias</Text>

      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={logout}
      >
        <Text style={styles.logoutButtonText}>Cerrar Sesión (Test)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: Colors.functional.danger,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});