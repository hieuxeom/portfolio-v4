/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#163286',
        50: '#F7F8FE',
        100: '#D6DEF8',
        200: '#94AAED',
        300: '#5276E3',
        400: '#214BC8',
        500: '#163286',
        600: '#122A70',
        700: '#0F225A',
        800: '#0B1944',
        900: '#08112E',
        950: '#060D23',
        foreground: "#f2f1ef"
      },
      secondary: {
        DEFAULT: '#426BC6',
        50: '#CFD9F1',
        100: '#BFCDEC',
        200: '#A0B5E2',
        300: '#819CD9',
        400: '#6184CF',
        500: '#426BC6',
        600: '#3357A8',
        700: '#284584',
        800: '#1D3261',
        900: '#13203E',
        950: '#0D172C',
        foreground: "#f2f1ef",
      },
      danger: {
        DEFAULT: '#CC2936',
        50: '#F1BBC0',
        100: '#EEAAB0',
        200: '#E78890',
        300: '#E06670',
        400: '#D94450',
        500: '#CC2936',
        600: '#A2202B',
        700: '#771820',
        800: '#4D0F14',
        900: '#220709',
        950: '#0D0303',
        foreground: "#f2f1ef",
      },
      warning: {
        DEFAULT: '#FFCA3A',
        50: '#FFF5DB',
        100: '#FFF0C9',
        200: '#FFE7A5',
        300: '#FFDD81',
        400: '#FFD45E',
        500: '#FFCA3A',
        600: '#FFBB02',
        700: '#C99300',
        800: '#916A00',
        900: '#594100',
        950: '#3D2C00',
        foreground: "#f2f1ef",
      },
      success: {
        DEFAULT: '#22C55E',
        50: '#AEF1C6',
        100: '#9CEEBA',
        200: '#79E8A2',
        300: '#57E28A',
        400: '#34DC72',
        500: '#22C55E',
        600: '#1B9E4B',
        700: '#147739',
        800: '#0E5026',
        900: '#072813',
        950: '#04150A',
        foreground: "#f2f1ef",
      },
      dark: {
        DEFAULT: '#292929',
        50: '#9C9C9C',
        100: '#8F8F8F',
        200: '#767676',
        300: '#5C5C5C',
        400: '#434343',
        500: '#292929',
        600: '#212121',
        700: '#1A1A1A',
        800: '#121212',
        900: '#0A0A0A',
        950: '#070707',
        foreground: "#f2f1ef",
      },
      default: {
        DEFAULT: '#292929',
        50: '#9C9C9C',
        100: '#8F8F8F',
        200: '#767676',
        300: '#5C5C5C',
        400: '#434343',
        500: '#292929',
        600: '#212121',
        700: '#1A1A1A',
        800: '#121212',
        900: '#0A0A0A',
        950: '#070707',
        foreground: "#f2f1ef",
      },
      light: {
        DEFAULT: "#f2f1ef",
      }
    },

    extend: {
      backgroundImage: {
        'client-gradient': 'linear-gradient(180deg, rgba(214,222,248,1) 0%, rgba(82,118,227,1) 46%, rgba(22,50,134,1) 78%, rgba(15,34,90,1) 100%)',
      },
      maxWidth: {
        "8xl": "1440px"
      }
    },
  },
  plugins: [],
}