import { StyleSheet, Dimensions } from 'react-native';
import Colors from '@/constants/Colors';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    headerContainer: {
        height: height * 0.35,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingBottom: 40
    },
    logo: {
        alignSelf: 'center',
        height: 50,
    },
    headerSlogan: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.9)',
        fontStyle: 'italic',
        marginBottom: 20,
        paddingHorizontal: 40,
        lineHeight: 20,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
    },
    headerTitle: {
        marginTop: 10,
        fontSize: 28,
        fontWeight: '600',
        color: Colors.white,
        paddingHorizontal: 24,
    },
    headerSubtitle: {
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 5,
        paddingHorizontal: 24,
    },
    formContainer: {
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 24,
        paddingTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        height: 56,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: '100%',
    },
    selectorButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        height: 56,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
    },
    selectorContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectorText: {
        fontSize: 16,
    },
    placeholderText: {
        fontSize: 16,
    },
    navigationButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    backButton: {
        padding: 16,
        marginRight: 10,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    button: {
        height: 56,
        backgroundColor: Colors.primary,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    stepSubtitle: {
        fontSize: 16,
        marginBottom: 24,
    },
    stepContent: {
        minHeight: 200,
    },
    progressBarContainer: {
        height: 6,
        borderRadius: 3,
        marginBottom: 30,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 3,
    },
    errorText: {
        color: Colors.functional.danger,
        textAlign: 'center',
        marginBottom: 16,
        backgroundColor: 'rgba(255, 59, 48, 0.1)',
        padding: 10,
        borderRadius: 8,
        overflow: 'hidden',
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40,
    },
    linkTextNormal: {
        fontSize: 14,
    },
    linkTextBold: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '60%',
        padding: 24,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    modalItemText: {
        fontSize: 16,
    },
});