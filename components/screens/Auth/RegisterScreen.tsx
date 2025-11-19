import React, { useState, useMemo } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useCatalog } from '@/context/CatalogContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import api from '@/services/api';
import { styles } from './Register.styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import LogoWhite from '@/assets/brand/logo-fondo-color.png';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function RegisterScreen() {
  const { login } = useAuth();
  const { catalogs } = useCatalog();

  const backgroundColor = useThemeColor({}, 'background');
  const mutedBackgroundColor = useThemeColor({}, 'backgroundMuted');
  const textColor = useThemeColor({}, 'text');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = textSecondaryColor; 

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    region: null as { id: number; name: string } | null,
    commune: null as { id: number; name: string } | null,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegionModalVisible, setRegionModalVisible] = useState(false);
  const [isCommuneModalVisible, setCommuneModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const filteredCommunes = useMemo(() => {
    if (!formData.region) return [];
    return catalogs.communes.filter(c => c.regionId === formData.region!.id);
  }, [formData.region, catalogs.communes]);

  const updateForm = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setError(null);
  };

  const nextStep = () => {
    if (currentStep === 1 && formData.name.length < 2) return setError('Ingresa tu nombre.');
    if (currentStep === 2 && !formData.email.includes('@')) return setError('Email inválido.');
    if (currentStep === 3 && (!formData.region || !formData.commune)) return setError('Selecciona ubicación.');
    
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCurrentStep(currentStep + 1);
    setError(null);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleRegister = async () => {
    if (formData.password.length < 8) return setError('Mínimo 8 caracteres.');
    if (formData.password !== formData.confirmPassword) return setError('No coinciden.');

    setIsLoading(true);
    setError(null);
    try {
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
        communeId: formData.commune!.id,
      });
      await login(formData.email, formData.password);
    } catch (e: any) {
      const msg = e.response?.data?.message;
      setError(Array.isArray(msg) ? msg[0] : msg || e.message || 'Error desconocido');
      setIsLoading(false);
    }
  };

  const renderInput = (
    icon: keyof typeof Ionicons.glyphMap, 
    placeholder: string, 
    value: string, 
    key: string,
    props: any = {}
  ) => (
    <View style={[styles.inputWrapper, { backgroundColor: mutedBackgroundColor, borderColor: 'transparent' }]}>
      <Ionicons name={icon} size={20} color={iconColor} style={styles.inputIcon} />
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder={placeholder}
        placeholderTextColor={textSecondaryColor}
        value={value}
        onChangeText={(t) => updateForm(key, t)}
        {...props}
      />
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View>
            <Text style={[styles.stepTitle, { color: textColor }]}>¿Cómo te llamas?</Text>
            <Text style={[styles.stepSubtitle, { color: textSecondaryColor }]}>Para personalizar tu experiencia.</Text>
            {renderInput('person-outline', 'Nombre completo', formData.name, 'name', { autoFocus: true })}
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={[styles.stepTitle, { color: textColor }]}>Hola, {formData.name.split(' ')[0]}! 👋</Text>
            <Text style={[styles.stepSubtitle, { color: textSecondaryColor }]}>¿Cómo podemos contactarte?</Text>
            {renderInput('mail-outline', 'Correo electrónico', formData.email, 'email', { keyboardType: 'email-address', autoCapitalize: 'none' })}
            {renderInput('call-outline', 'Teléfono (Opcional)', formData.phone, 'phone', { keyboardType: 'phone-pad' })}
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={[styles.stepTitle, { color: textColor }]}>¿Dónde te encuentras?</Text>
            <Text style={[styles.stepSubtitle, { color: textSecondaryColor }]}>Para mostrarte mascotas cercanas.</Text>

            <TouchableOpacity 
              style={[styles.selectorButton, { backgroundColor: mutedBackgroundColor, borderColor: 'transparent' }]} 
              onPress={() => setRegionModalVisible(true)}
            >
              <View style={styles.selectorContent}>
                <Ionicons name="map-outline" size={20} color={iconColor} style={styles.inputIcon} />
                <Text style={[
                  formData.region ? styles.selectorText : styles.placeholderText, 
                  { color: formData.region ? textColor : textSecondaryColor }
                ]}>
                  {formData.region ? formData.region.name : 'Selecciona tu Región'}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={20} color={iconColor} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.selectorButton, 
                { backgroundColor: mutedBackgroundColor, borderColor: 'transparent' }, 
                !formData.region && { opacity: 0.5 }
              ]}
              onPress={() => formData.region && setCommuneModalVisible(true)}
              disabled={!formData.region}
            >
              <View style={styles.selectorContent}>
                <Ionicons name="location-outline" size={20} color={iconColor} style={styles.inputIcon} />
                <Text style={[
                  formData.commune ? styles.selectorText : styles.placeholderText,
                  { color: formData.commune ? textColor : textSecondaryColor }
                ]}>
                  {formData.commune ? formData.commune.name : 'Selecciona tu Comuna'}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={20} color={iconColor} />
            </TouchableOpacity>
          </View>
        );
      case 4:
        return (
          <View>
            <Text style={[styles.stepTitle, { color: textColor }]}>Protege tu cuenta</Text>
            <Text style={[styles.stepSubtitle, { color: textSecondaryColor }]}>Crea una contraseña segura.</Text>
            
            <View style={[styles.inputWrapper, { backgroundColor: mutedBackgroundColor, borderColor: 'transparent' }]}>
              <Ionicons name="lock-closed-outline" size={20} color={iconColor} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Contraseña"
                placeholderTextColor={textSecondaryColor}
                value={formData.password}
                onChangeText={(t) => updateForm('password', t)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={iconColor} />
              </TouchableOpacity>
            </View>

            <View style={[styles.inputWrapper, { backgroundColor: mutedBackgroundColor, borderColor: 'transparent' }]}>
              <Ionicons name="lock-closed-outline" size={20} color={iconColor} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Confirmar contraseña"
                placeholderTextColor={textSecondaryColor}
                value={formData.confirmPassword}
                onChangeText={(t) => updateForm('confirmPassword', t)}
                secureTextEntry={!showPassword}
              />
            </View>
          </View>
        );
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={LogoWhite} style={styles.logo} resizeMode="contain" />
        <Text style={styles.headerSlogan}>Un espacio para ellos.</Text>
        <Text style={styles.headerTitle}>Únete a la manada! 🐾</Text>
        <Text style={styles.headerSubtitle}>Cuéntanos un poco de ti para crear tu perfil.</Text>
      </View>

      <View style={[styles.formContainer, { backgroundColor }]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={[styles.progressBarContainer, { backgroundColor: mutedBackgroundColor }]}>
            <View style={[styles.progressBarFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
          </View>

          <View style={styles.stepContent}>
            {renderStepContent()}
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.navigationButtons}>
            {currentStep > 1 && (
              <TouchableOpacity style={styles.backButton} onPress={prevStep}>
                <Text style={[styles.backButtonText, { color: textSecondaryColor }]}>Atrás</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.button, 
                { flex: 1 },
                currentStep > 1 && { marginLeft: 10 }
              ]}
              onPress={currentStep === totalSteps ? handleRegister : nextStep}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={styles.buttonText}>
                  {currentStep === totalSteps ? 'Crear Cuenta' : 'Siguiente'}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {currentStep === 1 && (
            <View style={styles.linkContainer}>
              <Text style={[styles.linkTextNormal, { color: textSecondaryColor }]}>¿Ya tienes cuenta?</Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.linkTextBold}>Inicia Sesión</Text>
                </TouchableOpacity>
              </Link>
            </View>
          )}
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
                    updateForm('region', item); updateForm('commune', null); setRegionModalVisible(false);
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
                    updateForm('commune', item); setCommuneModalVisible(false);
                  }}><Text style={[styles.modalItemText, { color: textColor }]}>{item.name}</Text></TouchableOpacity>
              )} />
          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
}