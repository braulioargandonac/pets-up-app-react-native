import React, { useEffect, useMemo } from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity, Linking, Alert, FlatList } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import { useVetDetail } from '@/hooks/useVetDetail';
import { useThemeColor } from '@/hooks/useThemeColor';
import { styles } from './VetDetail.styles';
import Colors from '@/constants/Colors';
import { showNavigationOptions } from '@/utils/mapNavigation';

interface Props {
    vetId: number | null;
    location: { lat: number; lon: number } | null;
    bottomSheetRef: React.RefObject<BottomSheetModal | null>;
    onClose: () => void;
}

export function VetDetailSheet({ vetId, location, bottomSheetRef, onClose }: Props) {
    const { vet, isLoading, error, fetchVetDetail, clearVetDetail } = useVetDetail();

    const snapPoints = useMemo(() => ['60%', '90%'], []);
    const textColor = useThemeColor({}, 'text');
    const textSecondary = useThemeColor({}, 'textSecondary');
    const backgroundColor = useThemeColor({}, 'background');
    const mutedBg = useThemeColor({}, 'backgroundMuted');
    const borderColor = useThemeColor({}, 'border');

    useEffect(() => {
        if (vetId) {
            fetchVetDetail(vetId);
        } else {
            clearVetDetail();
        }
    }, [vetId, fetchVetDetail, clearVetDetail]);

    const { scheduleByDay, isOpenNow } = useMemo(() => {
        if (!vet) return { scheduleByDay: [], isOpenNow: false };

        const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        const now = new Date();
        const currentDayIndex = now.getDay() || 7;
        const currentTime = now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false });

        let isOpen = false;
        const grouped = [];

        for (let i = 1; i <= 7; i++) {
            const daySchedules = vet.vetOpeningTimes
                .filter(t => t.dayOfWeek.id === i)
                .sort((a, b) => a.startTime.localeCompare(b.startTime));

            if (i === currentDayIndex) {
                isOpen = daySchedules.some(schedule => {
                    if (schedule.startTime <= schedule.endTime) {
                        return currentTime >= schedule.startTime && currentTime <= schedule.endTime;
                    }
                    return currentTime >= schedule.startTime || currentTime <= schedule.endTime;
                });
            }

            grouped.push({
                dayName: days[i - 1],
                schedules: daySchedules,
                id: i,
                isToday: i === currentDayIndex
            });
        }

        return { scheduleByDay: grouped, isOpenNow: isOpen };
    }, [vet]);

    const handleNavigation = () => {
        if (location && vet) showNavigationOptions(location.lat, location.lon, vet.name);
    };

    const handleOpenGoogleProfile = () => {
        if (!vet) return;
        if (vet.googleMapsUrl) {
            Linking.openURL(vet.googleMapsUrl);
        } else {
            const query = encodeURIComponent(`${vet.name} ${vet.address}`);
            Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
        }
    };

    const handleCall = () => {
        if (vet?.phone) Linking.openURL(`tel:${vet.phone}`);
        else Alert.alert('Sin teléfono', 'No hay número registrado.');
    };

    const renderContent = () => {
        if (isLoading) return <View style={styles.loadingContainer}><ActivityIndicator size="large" color={Colors.primary} /></View>;
        if (error || !vet) return <View style={styles.loadingContainer}><Text style={{ color: textColor }}>Error al cargar.</Text></View>;

        const badgeColor = isOpenNow ? Colors.extras.mint : Colors.extras.peach;
        const badgeText = isOpenNow ? 'ABIERTO' : 'CERRADO';
        const badgeIcon = isOpenNow ? 'door-open' : 'door-closed';
        const galleryImages = vet.images.filter(img => !img.isLogo);

        return (
            <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                <Image
                    source={{ uri: vet.images.find(i => i.isLogo)?.imageUrl || 'https://via.placeholder.com/400x200' }}
                    style={styles.headerImage}
                />

                <View style={[styles.headerInfo, { backgroundColor: backgroundColor }]}>
                    <View style={styles.badgesRow}>
                        <View style={[styles.badge, { backgroundColor: badgeColor }]}>
                            <FontAwesome5 name={badgeIcon} size={12} color="white" />
                            <Text style={styles.badgeText}>{badgeText}</Text>
                        </View>

                        {vet.isVerified && (
                            <View style={[styles.badge, { backgroundColor: '#4A90E2' }]}>
                                <Ionicons name="checkmark-circle" size={12} color="white" />
                                <Text style={styles.badgeText}>Verificado</Text>
                            </View>
                        )}
                    </View>

                    <Text style={[styles.title, { color: textColor }]}>{vet.name}</Text>

                    <View style={styles.addressRow}>
                        <Ionicons name="location-sharp" size={18} color={Colors.primary} />
                        <Text style={[styles.addressText, { color: textSecondary }]}>{vet.address}, {vet.commune?.name}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Sobre nosotros</Text>
                    <Text style={[styles.description, { color: textSecondary }]}>
                        {vet.description || 'Sin descripción disponible.'}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Servicios</Text>
                    <View style={styles.servicesContainer}>
                        {vet.vetServices.map((vs, index) => (
                            <View key={index} style={[styles.serviceChip, { backgroundColor: mutedBg }]}>
                                <Text style={[styles.serviceChipText, { color: textColor }]}>
                                    {vs.service.name}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {galleryImages.length > 0 && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: textColor }]}>Galería</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={galleryImages}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <Image source={{ uri: item.imageUrl }} style={styles.galleryImage} />
                            )}
                        />
                    </View>
                )}

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Horarios</Text>
                    <View style={[styles.scheduleContainer, { backgroundColor: mutedBg }]}>
                        {scheduleByDay.map((item) => (
                            <View key={item.id} style={styles.scheduleRow}>
                                <Text style={[
                                    styles.dayText,
                                    { color: item.isToday ? Colors.primary : textColor }
                                ]}>
                                    {item.dayName}
                                </Text>
                                <View style={styles.hoursColumn}>
                                    {item.schedules.length > 0 ? (
                                        item.schedules.map((s, idx) => (
                                            <Text key={idx} style={[
                                                styles.timeText,
                                                { color: item.isToday ? Colors.primary : textSecondary }
                                            ]}>
                                                {s.startTime} - {s.endTime}
                                            </Text>
                                        ))
                                    ) : (
                                        <Text style={[
                                            styles.timeText,
                                            { color: item.isToday ? Colors.primary : textSecondary }
                                        ]}>
                                            Cerrado
                                        </Text>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={[styles.actionButton, styles.callButton]} onPress={handleCall}>
                        <Ionicons name="call" size={24} color="white" />
                        <Text style={styles.actionButtonText}>Llamar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, styles.mapButton]} onPress={handleNavigation}>
                        <FontAwesome5 name="location-arrow" size={18} color="white" />
                        <Text style={styles.actionButtonText}>Ir ahora</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, backgroundColor: mutedBg, borderRadius: 12 }}
                        onPress={handleOpenGoogleProfile}
                    >
                        <Ionicons name="logo-google" size={20} color={textColor} />
                        <Text style={{ marginLeft: 8, fontWeight: '600', color: textColor }}>Ver reseñas en Google Maps</Text>
                    </TouchableOpacity>
                </View>

            </BottomSheetScrollView>
        );
    };

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onDismiss={onClose}
            backgroundStyle={{ backgroundColor }}
            handleIndicatorStyle={{ backgroundColor: borderColor }}
        >
            {renderContent()}
        </BottomSheetModal>
    );
}