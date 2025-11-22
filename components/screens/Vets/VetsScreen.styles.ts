import { StyleSheet, Dimensions } from 'react-native';
import Colors from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: { flex: 1 },

    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        color: Colors.functional.danger,
        marginBottom: 20,
    },


    map: {
        width: width,
        height: height,
    },

    header: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    switchLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.black,
        marginRight: 10,
    },
    filterButton: {
        backgroundColor: Colors.white,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        overflow: 'visible',
    },
    filterButtonActive: {
        backgroundColor: Colors.extras.mint,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary,
        marginLeft: 6,
    },
    filterTextActive: {
        color: Colors.white,
    },
    activeDot: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.functional.success,
        borderWidth: 1.5,
        borderColor: Colors.white,
        zIndex: 10,
    },

    vetMarkerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    vetPin: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        color: Colors.white,
        borderColor: Colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        elevation: 4,
    },
    calloutContainer: {
        width: 200,
        borderRadius: 12,
        padding: 10,
    },
    calloutTitle: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    calloutAddress: {
        fontSize: 12,
        color: '#666',
    },
    verifiedBadge: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    verifiedText: {
        fontSize: 10,
        color: Colors.functional.success,
        marginLeft: 4,
        fontWeight: 'bold',
    },
});