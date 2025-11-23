import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerBackground: {
        height: 280,
        width: '100%',
        backgroundColor: Colors.primary,
    },
    headerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(157, 135, 223, 0.6)',
        zIndex: 5,
    },
    bodyContainer: {
        flex: 1,
        zIndex: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 60,
        paddingHorizontal: 20,
        marginTop: -40,
    },
    avatarContainer: {
        position: 'absolute',
        top: -50,
        alignSelf: 'center',
        borderWidth: 4,
        borderRadius: 60,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    avatar: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4,
        marginTop: 20,
    },
    userLocation: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.extras.mint,
    },
    statLabel: {
        fontSize: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 10,
    },
    horizontalList: {
        paddingBottom: 20,
    },
    myPetCard: {
        width: 140,
        height: 180,
        borderRadius: 12,
        marginRight: 12,
        overflow: 'hidden',
    },
    myPetImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    myPetInfo: {
        padding: 8,
    },
    myPetName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    myPetStatus: {
        fontSize: 10,
        marginTop: 2,
        fontWeight: '600',
    },
    logoutButton: {
        marginTop: 30,
        marginBottom: 30,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
    },
    logoutText: {
        color: Colors.functional.danger,
        fontWeight: 'bold',
        fontSize: 16,
    },
});