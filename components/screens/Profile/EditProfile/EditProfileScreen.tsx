import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useCatalog } from '@/context/CatalogContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useMutation } from '@/hooks/useApi';
import { styles } from './EditProfile.styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { API_ROUTES } from '@/constants/ApiRoutes';

export function EditProfileScreen() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();

  const { catalogs } = useCatalog();
  const { patch, isLoading } = useMutation();

  const backgroundColor = useThemeColor({}, 'background');
  const mutedBackgroundColor = useThemeColor({}, 'backgroundMuted');
  const textColor = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const borderColor = useThemeColor({}, 'border');

  const initialCommune = catalogs.communes.find(c => c.id === user?.communeId);
  const initialRegion = catalogs.regions.find(r => r.id === initialCommune?.regionId);

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [shortDescription, setShortDescription] = useState(user?.shortDescription || '');
  const [description, setDescription] = useState(user?.description || '');

  const [selectedRegion, setSelectedRegion] = useState(initialRegion || null);
  const [selectedCommune, setSelectedCommune] = useState(initialCommune || null);

  const [isRegionModalVisible, setRegionModalVisible] = useState(false);
  const [isCommuneModalVisible, setCommuneModalVisible] = useState(false);

  const filteredCommunes = useMemo(() => {
    if (!selectedRegion) return [];
    return catalogs.communes.filter(c => c.regionId === selectedRegion.id);
  }, [selectedRegion, catalogs.communes]);

  const handleSave = async () => {
    try {
      await patch(API_ROUTES.USERS.ME, {
        name,
        phone,
        shortDescription,
        description,
        communeId: selectedCommune?.id,
      });

      Alert.alert('Éxito', 'Perfil actualizado correctamente', [
        { text: 'OK', onPress: () => router.back() }
      ]);

      await refreshUser();

      Alert.alert('Éxito', 'Perfil actualizado correctamente', [
        { text: 'OK', onPress: () => router.back() }
      ]);

    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo actualizar');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Perfil</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <View style={[styles.formContainer, { backgroundColor }]}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <Text style={[styles.label, { color: textSecondary }]}>Nombre</Text>
          <View style={[styles.inputWrapper, { backgroundColor: mutedBackgroundColor, borderColor: 'transparent' }]}>
            <Ionicons name="person-outline" size={20} color={textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: textColor }]}
              value={name}
              onChangeText={setName}
            />
          </View>

          <Text style={[styles.label, { color: textSecondary }]}>Teléfono</Text>
          <View style={[styles.inputWrapper, { backgroundColor: mutedBackgroundColor, borderColor: 'transparent' }]}>
            <Ionicons name="call-outline" size={20} color={textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: textColor }]}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <Text style={[styles.label, { color: textSecondary }]}>Estado</Text>
          <View style={[styles.inputWrapper, { backgroundColor: mutedBackgroundColor, borderColor: 'transparent' }]}>
            <Ionicons name="information-circle-outline" size={20} color={textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: textColor }]}
              value={shortDescription}
              onChangeText={setShortDescription}
              maxLength={50}
              placeholder="Ej: Amante de los gatos 🐱"
              placeholderTextColor={textSecondary}
            />
          </View>

          <Text style={[styles.label, { color: textSecondary }]}>Sobre mí</Text>
          <View style={[
            styles.inputWrapper,
            {
              backgroundColor: mutedBackgroundColor,
              borderColor: 'transparent',
              height: 120,
              alignItems: 'flex-start',
              paddingVertical: 12
            }
          ]}>
            <Ionicons name="document-text-outline" size={20} color={textSecondary} style={[styles.inputIcon, { marginTop: 4 }]} />
            <TextInput
              style={[styles.input, { color: textColor, textAlignVertical: 'top' }]}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              placeholder="Cuéntanos más sobre ti, tu experiencia con mascotas, etc."
              placeholderTextColor={textSecondary}
            />
          </View>

          <Text style={[styles.label, { color: textSecondary }]}>Ubicación</Text>

          <TouchableOpacity
            style={[styles.selectorButton, { backgroundColor: mutedBackgroundColor }]}
            onPress={() => setRegionModalVisible(true)}
          >
            <View style={styles.selectorContent}>
              <Ionicons name="map-outline" size={20} color={textSecondary} style={styles.inputIcon} />
              <Text style={[styles.selectorText, { color: textColor }]}>
                {selectedRegion ? selectedRegion.name : 'Selecciona Región'}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={20} color={textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.selectorButton, { backgroundColor: mutedBackgroundColor }, !selectedRegion && { opacity: 0.5 }]}
            onPress={() => selectedRegion && setCommuneModalVisible(true)}
            disabled={!selectedRegion}
          >
            <View style={styles.selectorContent}>
              <Ionicons name="location-outline" size={20} color={textSecondary} style={styles.inputIcon} />
              <Text style={[styles.selectorText, { color: textColor }]}>
                {selectedCommune ? selectedCommune.name : 'Selecciona Comuna'}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={20} color={textSecondary} />
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.saveButtonText}>Guardar Cambios</Text>
            )}
          </TouchableOpacity>

        </ScrollView>
      </View>

      <Modal visible={isRegionModalVisible} animationType="slide" transparent={true} onRequestClose={() => setRegionModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: textColor }]}>Selecciona Región</Text>
              <TouchableOpacity onPress={() => setRegionModalVisible(false)}><Ionicons name="close" size={24} color={textColor} /></TouchableOpacity>
            </View>
            <FlatList data={catalogs.regions} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
              <TouchableOpacity style={[styles.modalItem, { borderBottomColor: borderColor }]} onPress={() => {
                setSelectedRegion(item); setSelectedCommune(null); setRegionModalVisible(false);
              }}><Text style={[styles.modalItemText, { color: textColor }]}>{item.name}</Text></TouchableOpacity>
            )} />
          </View>
        </View>
      </Modal>

      <Modal visible={isCommuneModalVisible} animationType="slide" transparent={true} onRequestClose={() => setCommuneModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: textColor }]}>Selecciona Comuna</Text>
              <TouchableOpacity onPress={() => setCommuneModalVisible(false)}><Ionicons name="close" size={24} color={textColor} /></TouchableOpacity>
            </View>
            <FlatList data={filteredCommunes} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
              <TouchableOpacity style={[styles.modalItem, { borderBottomColor: borderColor }]} onPress={() => {
                setSelectedCommune(item); setCommuneModalVisible(false);
              }}><Text style={[styles.modalItemText, { color: textColor }]}>{item.name}</Text></TouchableOpacity>
            )} />
          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
}