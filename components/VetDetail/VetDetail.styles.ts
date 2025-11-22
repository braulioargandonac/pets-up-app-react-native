import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        paddingBottom: 100,
    },
    headerImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        backgroundColor: Colors.light.backgroundMuted,
    },
    headerInfo: {
        padding: 20,
        marginTop: -25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    badgesRow: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
    },
    badgeText: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    addressText: {
        fontSize: 16,
        marginLeft: 6,
        flex: 1,
    },
    section: {
        paddingHorizontal: 20,
        marginTop: 20,
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
    serviceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    serviceText: {
        fontSize: 16,
        marginLeft: 10,
    },
    scheduleContainer: {
        backgroundColor: Colors.light.backgroundMuted,
        borderRadius: 12,
        padding: 12,
    },
    scheduleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    dayText: {
        fontSize: 14,
        fontWeight: '600',
        width: 100,
    },
    hoursColumn: {
        flex: 1,
        alignItems: 'flex-end',
    },
    timeText: {
        fontSize: 14,
        marginBottom: 2,
    },
    todayText: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    actionsContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        marginTop: 20,
    },
    actionButton: {
        flex: 1,
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    callButton: {
        backgroundColor: Colors.primary,
    },
    mapButton: {
        backgroundColor: Colors.primary,
    },
    actionButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    serviceChip: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    serviceChipText: {
        fontSize: 14,
        fontWeight: '500',
    },
    galleryImage: {
        width: 140,
        height: 100,
        borderRadius: 12,
        marginRight: 12,
        resizeMode: 'cover',
    },
});