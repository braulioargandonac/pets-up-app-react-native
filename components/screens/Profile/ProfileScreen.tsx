import React, { useState, useRef, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useCatalog } from '@/context/CatalogContext';
import { useMyPets } from '@/hooks/useMyPets';
import { useThemeColor } from '@/hooks/useThemeColor';
import { styles } from './ProfileScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PetDetailSheet } from '@/components/PetDetail/PetDetailSheet';
import { useFocusEffect, useRouter } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolation
} from 'react-native-reanimated';
import Colors from '@/constants/Colors';

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
const HEADER_HEIGHT = 280;

export function ProfileScreen() {
    const router = useRouter();
    const { user, logout, deleteAccount } = useAuth();
    const { getCommuneName } = useCatalog();
    const { myPets, isLoading: loadingPets } = useMyPets();
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
    const [headerImageUrl, setHeaderImageUrl] = useState<string | null>(null);

    const backgroundColor = useThemeColor({}, 'background');
    const mutedBg = useThemeColor({}, 'backgroundMuted');
    const textColor = useThemeColor({}, 'text');
    const textSecondary = useThemeColor({}, 'textSecondary');
    const borderColor = useThemeColor({}, 'border');

    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [-150, 0],
                [HEADER_HEIGHT + 150, HEADER_HEIGHT],
                { extrapolateRight: Extrapolation.CLAMP }
            ),
            transform: [
                {
                    scale: interpolate(
                        scrollY.value,
                        [-150, 0],
                        [1.5, 1],
                        { extrapolateRight: Extrapolation.CLAMP }
                    ),
                },
            ],
        };
    });

    useFocusEffect(
        useCallback(() => {
            if (myPets.length > 0) {
                const petsWithPhotos = myPets.filter(p => p.images && p.images.length > 0);
                if (petsWithPhotos.length > 0) {
                    const randomPet = petsWithPhotos[Math.floor(Math.random() * petsWithPhotos.length)];
                    const randomImage = randomPet.images[0];
                    setHeaderImageUrl(randomImage.imageUrl);
                    return;
                }
            }
            setHeaderImageUrl(null);
        }, [myPets])
    );

    if (!user) return null;

    const communeName = getCommuneName(user.communeId);

    const handlePetPress = (id: number) => {
        setSelectedPetId(id);
        bottomSheetRef.current?.present();
    };

    const handleCloseDetail = () => {
        setSelectedPetId(null);
        bottomSheetRef.current?.dismiss();
    };

    const handleEditPet = (id: number) => {
        console.log('Ir a editar mascota:', id);
        handleCloseDetail();
    };

    const handleReportLost = (id: number) => {
        console.log('Reportar perdido:', id);
        handleCloseDetail();
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Eliminar Cuenta',
            '¿Estás seguro? Esta acción borrará todos tus datos permanentemente.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteAccount();
                        } catch (error) {
                            console.error(error)
                            Alert.alert('Error', 'No se pudo eliminar la cuenta.');
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: Colors.primary }]}>

            <AnimatedImageBackground
                source={headerImageUrl ? { uri: headerImageUrl } : undefined}
                style={[styles.headerBackground, headerAnimatedStyle, { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 0 }]}
                resizeMode="cover"
            >
                <View style={styles.headerOverlay} />
            </AnimatedImageBackground>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
            >
                <View style={{ height: HEADER_HEIGHT - 40 }} />

                <View style={[styles.bodyContainer, { backgroundColor, minHeight: 500 }]}>

                    <View style={[styles.avatarContainer, { borderColor: backgroundColor }]}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/150' }}
                            style={[styles.avatar, { backgroundColor: mutedBg }]}
                        />
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={[styles.userName, { color: textColor }]}>
                            {user.name || 'Usuario'}
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/profile/edit')}>
                            <Text style={{ color: Colors.primary, fontWeight: '600', marginBottom: 4 }}>
                                Editar Perfil
                            </Text>
                        </TouchableOpacity>

                        {user.shortDescription && (
                          <Text style={{ color: textSecondary, fontSize: 14, marginBottom: 10, textAlign: 'center', paddingHorizontal: 20 }}>
                            {user.shortDescription}
                          </Text>
                        )}
                    </View>

                    <Text style={[styles.userLocation, { color: textSecondary }]}>
                        <Ionicons name="location-sharp" size={14} color={Colors.primary} /> {communeName}
                    </Text>

                    <View style={[styles.statsContainer, { borderBottomColor: borderColor }]}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{myPets.length}</Text>
                            <Text style={[styles.statLabel, { color: textSecondary }]}>Mascotas</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{user.reportCount || 0}</Text>
                            <Text style={[styles.statLabel, { color: textSecondary }]}>Reportes</Text>
                        </View>
                    </View>

                    {user.description && (
                      <View style={{ marginBottom: 20 }}>
                        <Text style={[styles.sectionTitle, { color: textColor }]}>Sobre mí</Text>
                        <Text style={{ color: textSecondary, fontSize: 16, lineHeight: 24 }}>
                          {user.description}
                        </Text>
                      </View>
                    )}

                    <Text style={[styles.sectionTitle, { color: textColor }]}>Mis Mascotas</Text>

                    {loadingPets ? (
                        <ActivityIndicator color={Colors.primary} style={{ margin: 20 }} />
                    ) : myPets.length === 0 ? (
                        <Text style={{ color: textSecondary, fontStyle: 'italic' }}>Aún no tienes mascotas registradas.</Text>
                    ) : (
                        <FlatList
                            horizontal
                            data={myPets}
                            keyExtractor={(item) => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.horizontalList}
                            renderItem={({ item }) => {
                                const statusName = (item as any).status?.name || 'Desconocido';
                                const isLost = statusName === 'Perdido';

                                return (
                                    <TouchableOpacity
                                        style={[styles.myPetCard, { backgroundColor: mutedBg }]}
                                        onPress={() => handlePetPress(item.id)}>
                                        <Image
                                            source={{ uri: item.images[0]?.imageUrl || 'https://via.placeholder.com/150' }}
                                            style={styles.myPetImage}
                                        />
                                        <View style={styles.myPetInfo}>
                                            <Text style={[styles.myPetName, { color: textColor }]} numberOfLines={1}>{item.name}</Text>
                                            <Text style={[
                                                styles.myPetStatus,
                                                { color: isLost ? Colors.extras.peach : Colors.extras.mint }
                                            ]}>
                                                {statusName}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    )}

                    <TouchableOpacity
                        style={[styles.logoutButton, { backgroundColor: mutedBg, borderColor }]}
                        onPress={logout}
                    >
                        <Text style={[styles.logoutText, { color: textColor }]}>Cerrar Sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginTop: 20, marginBottom: 40, alignItems: 'center' }}
                        onPress={handleDeleteAccount}
                    >
                        <Text style={{ color: Colors.functional.danger, fontSize: 14, textDecorationLine: 'underline' }}>
                            Eliminar mi cuenta y datos
                        </Text>
                    </TouchableOpacity>
                </View>

            </Animated.ScrollView>

            <PetDetailSheet
                petId={selectedPetId}
                bottomSheetRef={bottomSheetRef}
                onClose={handleCloseDetail}
                mode="owner"
                onEditPress={handleEditPet}
                onReportLostPress={handleReportLost}
            />
        </View>
    );
}