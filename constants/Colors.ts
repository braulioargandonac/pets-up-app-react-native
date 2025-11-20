const tintColor = '#9d87df';
const lightGray = '#999';
const white = '#ffffffff';
const backgroundLight = "#f8f8f8"
const black = '#000000';
const mint = '#61C9A8';
const peach = '#ffb38dff';
const brown = '#66635b'

const colors = {
  primary: tintColor,
  peach: peach,
  mint: mint,
  brown: brown,
  
  // Colores Funcionales
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',

  // Escala de Grises
  grey100: '#F4F4F5',
  grey200: '#E4E4E7',
  grey300: '#A1A1AA',
  grey400: '#71717A',
  grey500: '#27272A',

  backgroundLight: backgroundLight,
  white: white,
  black: black,
};

export default {
  // Tema Claro (Light Mode)
  light: {
    text: colors.grey500,
    textSecondary: colors.grey400,
    background: colors.backgroundLight,
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

  extras: {
    mint: colors.mint,
    peach: colors.peach,
    brown: colors.brown,
  },
  
  primary: colors.primary,
  white: colors.white,
  black: colors.black,
  inactive: lightGray,
};