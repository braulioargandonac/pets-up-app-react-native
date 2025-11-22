import { Alert, ActionSheetIOS, Linking, Platform } from 'react-native';

export const openMapApp = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
        if (supported) Linking.openURL(url);
        else Alert.alert('Error', 'No se pudo abrir la aplicación de mapas.');
    });
};

export const showNavigationOptions = (lat: number, lon: number, name: string) => {
    const label = encodeURIComponent(name);

    const options = [
        { text: 'Cancelar', style: 'cancel' as const, onPress: () => { } },
        {
            text: 'Google Maps',
            onPress: () => openMapApp(`http://maps.google.com/maps?daddr=${lat},${lon}&q=${label}`)
        },
        {
            text: 'Waze',
            onPress: () => openMapApp(`https://waze.com/ul?ll=${lat},${lon}&navigate=yes`)
        },
        ...(Platform.OS === 'ios' ? [{
            text: 'Apple Maps',
            onPress: () => openMapApp(`http://maps.apple.com/?daddr=${lat},${lon}&dirflg=d&q=${label}`)
        }] : [])
    ];

    if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: options.map(o => o.text),
                cancelButtonIndex: 0,
                title: `Ir a ${name}`,
            },
            (buttonIndex) => {
                options[buttonIndex]?.onPress?.();
            }
        );
    } else {
        Alert.alert(
            `Ir a ${name}`,
            'Elige una aplicación:',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Waze', onPress: () => openMapApp(`https://waze.com/ul?ll=${lat},${lon}&navigate=yes`) },
                { text: 'Google Maps', onPress: () => openMapApp(`http://maps.google.com/maps?daddr=${lat},${lon}`) },
            ]
        );
    }
};