// constants/Colors.ts

const tintColor = '#9d87df';
const lightGray = '#999';
const white = '#FFFFFF';
const black = '#000000';

const colors = {
  primary: tintColor,
  
  // Colores Funcionales (para confirmar, cancelar, etc.)
  success: '#34C759', // Verde iOS (Confirmar)
  danger: '#FF3B30',  // Rojo iOS (Cancelar / Error / Eliminar)
  warning: '#FF9500', // Naranja iOS (Advertencia)

  // Escala de Grises (Neutrales)
  grey100: '#F4F4F5', // Fondo muy claro (para cards)
  grey200: '#E4E4E7', // Bordes / Divisores
  grey300: '#A1A1AA', // Texto inactivo / placeholders
  grey400: '#71717A', // Texto secundario
  grey500: '#27272A', // Texto principal

  white: white,
  black: black,
};

export default {
  // Tema Claro (Light Mode)
  light: {
    text: colors.grey500,
    textSecondary: colors.grey400,
    background: colors.white,
    backgroundMuted: colors.grey100,
    tint: colors.primary,
    tabIconDefault: colors.grey300,
    tabIconSelected: colors.primary,
    border: colors.grey200,
  },
  
  // Tema Oscuro (Dark Mode)
  dark: {
    text: colors.white,
    textSecondary: colors.grey300,
    background: '#1C1C1E',
    backgroundMuted: '#2C2C2E',
    tint: colors.primary,
    tabIconDefault: colors.grey300,
    tabIconSelected: colors.primary,
    border: '#3A3A3C',
  },

  functional: {
    success: colors.success,
    danger: colors.danger,
    warning: colors.warning,
  },
  
  primary: colors.primary,
  white: colors.white,
  black: colors.black,
  inactive: lightGray,
};