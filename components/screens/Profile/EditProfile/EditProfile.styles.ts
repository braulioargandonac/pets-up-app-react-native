import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingTop: 25,
    },
    headerContainer: {
        height: 100,
        justifyContent: 'flex-end',
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white,
        flex: 1,
        textAlign: 'center',
        marginRight: 40,
    },
    formContainer: {
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 24,
        paddingTop: 30,
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
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 4,
    },

    saveButton: {
        height: 56,
        backgroundColor: Colors.primary,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },

    selectorButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        height: 56,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    selectorContent: { flexDirection: 'row', alignItems: 'center' },
    selectorText: { fontSize: 16 },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, height: '60%', padding: 24 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    modalTitle: { fontSize: 20, fontWeight: 'bold' },
    modalItem: { paddingVertical: 16, borderBottomWidth: 1 },
    modalItemText: { fontSize: 16 },
});