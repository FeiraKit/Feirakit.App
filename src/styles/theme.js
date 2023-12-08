import { extendTheme } from 'native-base'

export const THEME = extendTheme({
  colors: {
    blue: {
      900: '#056cf3',
      850: 'rgba(5, 108, 243, 0.3)',
      800: '#4b94f2',
      700: '#0088a7',
      600: '#038c8c',
      500: '#6fbfbf',
    },
    purple: {
      700: '#6d6fb5',
      600: '#9d5c9c',
      500: '#b64b72',
    },
    green: {
      700: '#00875F',
      500: '#00B37E',
      300: '#04D361',
    },
    gray: {
      900: '#0d0d0d',
      500: '#585858',
      450: '#848484',
      400: '#A4A4A4',
      350: '#a4a4a4b3',
      300: '#BDBDBD',
      250: '#dededeff',
      200: '#f2f2f2',
      120: 'rgba(230, 230, 230, 0.93)',
      100: 'rgba(230, 230, 230, .9)',
    },
    white: '#FFFFFF',
  },
  fonts: {
    heading: 'Montserrat_700Bold',
    body: 'Montserrat_400Regular',
  },
  fontSizes: {
    xs: 8,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56,
  },
})
